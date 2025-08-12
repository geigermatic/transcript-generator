import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import ollama from 'ollama'
import mammoth from 'mammoth'

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
  const user = [
    'Based on the transcript below, generate concise Q&A pairs that a student might ask and that can be answered from the text. Output STRICT JSON array of objects with fields: question (string), answer (string). Do not include any other text.',
    `Return exactly ${num} items.`,
    'Transcript:',
    text.slice(0, 12000),
  ].join('\n')
  const res = await ollama.chat({ model: MODEL, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, format: 'json', options: { temperature: 0.2 } })
  let items = []
  try {
    items = JSON.parse(res.message?.content ?? '[]')
  } catch { items = [] }
  const lines = items.slice(0, num).map(it => JSON.stringify({ transcript_id: transcriptId, question: it.question, answer: it.answer }))
  if (lines.length) await fsp.appendFile(QA_FILE, lines.join('\n') + '\n', 'utf8')
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


