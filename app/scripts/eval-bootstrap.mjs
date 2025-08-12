import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ollama from 'ollama'
import mammoth from 'mammoth'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const EVAL_DIR = path.join(REPO_ROOT, 'eval')
const TRANSCRIPTS_DIR = path.join(EVAL_DIR, 'transcripts')
const INBOX_DIR = path.join(EVAL_DIR, 'inbox')
const QA_FILE = path.join(EVAL_DIR, 'qa.jsonl')

const MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b-instruct-q4_K_M'

async function ensureDirs() {
  await fsp.mkdir(TRANSCRIPTS_DIR, { recursive: true })
  await fsp.mkdir(INBOX_DIR, { recursive: true })
}

async function convertToText(inputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  const buf = await fsp.readFile(inputPath)
  if (ext === '.txt' || ext === '.md') return buf.toString('utf8')
  if (ext === '.docx') {
    const res = await mammoth.extractRawText({ buffer: buf })
    return res.value
  }
  if (ext === '.vtt') {
    return buf.toString('utf8')
      .split('\n')
      .filter((line) => !/^WEBVTT/.test(line) && !/\d{2}:\d{2}:\d{2}\.\d{3}/.test(line) && line.trim() !== '')
      .join('\n')
  }
  if (ext === '.srt') {
    return buf.toString('utf8')
      .split(/\r?\n/)
      .filter((line) => {
        const t = line.trim()
        if (!t) return false
        if (/^\d+$/.test(t)) return false
        if (/-->/.test(t)) return false
        return true
      })
      .join('\n')
  }
  // Fallback
  return buf.toString('utf8')
}

async function writeTranscript(text, origName) {
  const base = path.basename(origName)
  const id = base.replace(/\.(docx|vtt|srt)$/i, '.txt')
  const outPath = path.join(TRANSCRIPTS_DIR, id)
  await fsp.writeFile(outPath, text, 'utf8')
  return id
}

async function generateQA(transcriptId, text, num = 5) {
  const sys = 'You are a QA generator.'
  async function askJson(windowText, k, temperature = 0.2) {
    const user = [
      'Based on the transcript below, generate concise Q&A pairs that a student might ask and that can be answered from the text. Output STRICT JSON array of objects with fields: question (string), answer (string). Do not include any other text.',
      `Return exactly ${k} items.`,
      'Transcript:',
      windowText,
    ].join('\n')
    const res = await ollama.chat({ model: MODEL, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, format: 'json', options: { temperature } })
    try {
      const content = res.message?.content ?? '[]'
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed)) return parsed
      if (parsed && Array.isArray(parsed.items)) return parsed.items
      if (parsed && Array.isArray(parsed.qa)) return parsed.qa
      if (parsed && Array.isArray(parsed.pairs)) return parsed.pairs
      return []
    } catch {
      return []
    }
  }
  async function askLines(windowText, k, temperature = 0.2) {
    const user = [
      'Generate Q&A pairs that can be answered strictly from this transcript. Use the format:',
      'Q: <question>\nA: <answer>\n',
      `Return exactly ${k} pairs. No extra text.`,
      'Transcript:',
      windowText,
    ].join('\n')
    const res = await ollama.chat({ model: MODEL, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, options: { temperature } })
    const content = res.message?.content ?? ''
    const pairs = []
    const regex = /Q:\s*(.+?)\s*A:\s*(.+?)(?:\n\n|$)/gs
    let m
    while ((m = regex.exec(content)) && pairs.length < k) {
      const q = m[1]?.trim()
      const a = m[2]?.trim()
      if (q && a) pairs.push({ question: q, answer: a })
    }
    return pairs
  }

  function uniqueByQuestion(arr) {
    const seen = new Set()
    const out = []
    for (const it of arr) {
      const qn = (it.question || '').toLowerCase().trim()
      if (!qn || seen.has(qn)) continue
      seen.add(qn)
      out.push(it)
    }
    return out
  }

  // Attempt full-text JSON then lines
  let collected = []
  const full = text.slice(0, 16000)
  collected = uniqueByQuestion([...(await askJson(full, num, 0.2)), ...(await askLines(full, num, 0.2))])

  // Windowed fallback if needed: start/middle/end
  if (collected.length < num) {
    const N = text.length
    const win = Math.min(8000, Math.ceil(N / 3))
    const starts = [0, Math.max(0, Math.floor(N / 2) - Math.floor(win / 2)), Math.max(0, N - win)]
    for (const s of starts) {
      if (collected.length >= num) break
      const windowText = text.slice(s, s + win)
      const need = num - collected.length
      const add = uniqueByQuestion([...(await askJson(windowText, need, 0.25)), ...(await askLines(windowText, need, 0.3))])
      collected = uniqueByQuestion([...collected, ...add])
    }
  }

  if (collected.length === 0) {
    console.warn(`No QA generated for ${transcriptId}; continuing without QA entries.`)
    return
  }
  const lines = collected.slice(0, num).map(it => JSON.stringify({ transcript_id: transcriptId, question: it.question, answer: it.answer }))
  await fsp.appendFile(QA_FILE, lines.join('\n') + '\n', 'utf8')
}

async function run() {
  const args = process.argv.slice(2)
  const useInbox = args.length === 0 || args.includes('--inbox')
  await ensureDirs()
  let files = []
  if (useInbox) {
    const all = fs.existsSync(INBOX_DIR) ? await fsp.readdir(INBOX_DIR) : []
    files = all
      .filter(f => /\.(txt|md|docx|srt|vtt)$/i.test(f))
      .slice(0, 50)
      .map(f => path.join(INBOX_DIR, f))
    if (files.length === 0) {
      console.log(`No files found in ${INBOX_DIR}. Drop transcripts there and re-run: npm run eval:bootstrap`)
      return
    }
  } else {
    files = args
  }
  for (const p of files) {
    const abs = path.resolve(p)
    if (!fs.existsSync(abs)) { console.warn(`Skip missing: ${abs}`); continue }
    try {
      const text = await convertToText(abs)
      const id = await writeTranscript(text, abs)
      await generateQA(id, text)
      console.log(`Bootstrapped transcript ${id} and appended QA pairs to ${QA_FILE}`)
    } catch (e) {
      console.warn(`Failed to process ${abs}:`, e?.message || e)
    }
  }
}

run().catch((e) => { console.error('Bootstrap failed:', e); process.exit(1) })


