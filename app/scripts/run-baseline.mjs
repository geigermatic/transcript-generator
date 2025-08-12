import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import ollama from 'ollama'

const REPO_ROOT = path.resolve(__dirname, '..', '..')
const EVAL_DIR = path.join(REPO_ROOT, 'eval')
const TRANSCRIPTS_DIR = path.join(EVAL_DIR, 'transcripts')
const QA_FILE = path.join(EVAL_DIR, 'qa.jsonl')
const OUTPUT_FILE = path.join(EVAL_DIR, 'baseline.json')

const MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b-instruct-q4_K_M'

const SchemaJson = {
  type: 'object',
  properties: {
    class_title: { type: 'string' },
    date_or_series: { type: 'string' },
    audience: { type: 'string' },
    learning_objectives: { type: 'array', items: { type: 'string' } },
    key_takeaways: { type: 'array', items: { type: 'string' } },
    topics: { type: 'array', items: { type: 'string' } },
    action_items: { type: 'array', items: { type: 'string' } },
    notable_quotes: { type: 'array', items: { type: 'string' } },
    open_questions: { type: 'array', items: { type: 'string' } },
    timestamp_refs: { type: 'array', items: { type: 'string' } },
  },
  required: ['key_takeaways', 'topics'],
}

function splitParagraphs(text) {
  return text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
}

function chunkByToken(text, targetTokens = 1200) {
  const chunks = []
  const paragraphs = splitParagraphs(text)
  let current = []
  let count = 0
  for (const p of paragraphs) {
    const approx = Math.ceil(p.length / 4)
    if (count + approx > targetTokens && current.length > 0) {
      chunks.push(current.join('\n\n'))
      current = []
      count = 0
    }
    current.push(p)
    count += approx
  }
  if (current.length) chunks.push(current.join('\n\n'))
  return chunks
}

async function extractJsonPerChunk(text) {
  const chunks = chunkByToken(text)
  const perChunk = []
  const diagnostics = []
  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i]
    const sys = 'You are an offline summarizer. Output STRICT JSON only that matches the given JSON Schema.'
    const user = [
      'Verified glossary (authoritative terms and definitions):',
      '[]',
      '',
      'Few-shot examples (may guide style):',
      '[]',
      '',
      'Transcript chunk:',
      `<<<${chunk}>>>`,
      '',
      'Task:',
      '- Fill every possible field in the schema based only on the chunk.',
      '- If unknown, use "" or [].',
      'JSON Schema:',
      JSON.stringify(SchemaJson),
    ].join('\n')
    const res = await ollama.chat({ model: MODEL, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, format: 'json', options: { temperature: 0.2 } })
    try {
      const content = res.message?.content ?? '{}'
      const parsed = JSON.parse(content)
      perChunk.push(parsed)
      diagnostics.push({ chunk: i+1, ok: true, keys: Object.keys(parsed) })
    } catch (e) {
      perChunk.push({ key_takeaways: [], topics: [] })
      diagnostics.push({ chunk: i+1, ok: false, error: String(e).slice(0, 160) })
    }
  }
  return { perChunk, diagnostics }
}

function mergeSchemaResults(results) {
  const out = { key_takeaways: [], topics: [] }
  const push = (arr, v) => { if (v && typeof v === 'string') { const t = v.trim(); if (t && !arr.includes(t)) arr.push(t) } }
  const pushMany = (arr, values) => { if (Array.isArray(values)) for (const v of values) push(arr, v) }
  for (const r of results) {
    if (r.class_title) out.class_title = r.class_title
    if (r.date_or_series) out.date_or_series = r.date_or_series
    if (r.audience) out.audience = r.audience
    out.learning_objectives = out.learning_objectives || []
    out.action_items = out.action_items || []
    out.notable_quotes = out.notable_quotes || []
    out.open_questions = out.open_questions || []
    out.timestamp_refs = out.timestamp_refs || []
    pushMany(out.learning_objectives, r.learning_objectives)
    pushMany(out.key_takeaways, r.key_takeaways)
    pushMany(out.topics, r.topics)
    pushMany(out.action_items, r.action_items)
    pushMany(out.notable_quotes, r.notable_quotes)
    pushMany(out.open_questions, r.open_questions)
    pushMany(out.timestamp_refs, r.timestamp_refs)
  }
  return out
}

async function finalProse(merged) {
  const sys = 'You are a precise technical editor.'
  const user = [
    'Using the merged facts below (JSON), write a clear, concise markdown summary (3–7 bullets for key takeaways, short intro, optional notes for cautions/contraindications if present). No hallucinations.',
    'Facts JSON:',
    JSON.stringify(merged),
  ].join('\n')
  const res = await ollama.chat({ model: MODEL, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, options: { temperature: 0.2 } })
  return res.message?.content ?? ''
}

function jsonValidityAndCoverage(obj) {
  const required = ['key_takeaways', 'topics']
  let valid = true
  for (const k of required) {
    if (!obj[k] || !Array.isArray(obj[k])) valid = false
  }
  const fields = ['class_title','date_or_series','audience','learning_objectives','key_takeaways','topics','action_items','notable_quotes','open_questions','timestamp_refs']
  let filled = 0
  for (const f of fields) {
    const v = obj[f]
    if (typeof v === 'string' && v.trim()) filled += 1
    else if (Array.isArray(v) && v.length > 0) filled += 1
  }
  const coverage = filled / fields.length
  return { valid, coverage }
}

function normalize(text) {
  return (text || '').toString().toLowerCase().replace(/\s+/g, ' ').trim()
}

function f1(pred, gold) {
  const p = normalize(pred).split(' ').filter(Boolean)
  const g = normalize(gold).split(' ').filter(Boolean)
  const setP = new Map()
  for (const w of p) setP.set(w, (setP.get(w) || 0) + 1)
  let overlap = 0
  for (const w of g) {
    const c = setP.get(w) || 0
    if (c > 0) { overlap += 1; setP.set(w, c - 1) }
  }
  const precision = p.length ? overlap / p.length : 0
  const recall = g.length ? overlap / g.length : 0
  return (precision + recall) ? (2 * precision * recall) / (precision + recall) : 0
}

async function run() {
  const files = fs.existsSync(TRANSCRIPTS_DIR) ? (await fsp.readdir(TRANSCRIPTS_DIR)).filter(f => f.endsWith('.txt') || f.endsWith('.md')) : []
  const qa = fs.existsSync(QA_FILE) ? (await fsp.readFile(QA_FILE, 'utf8')).split(/\n/).filter(Boolean).map(line => JSON.parse(line)) : []
  const results = { model: MODEL, transcripts: [] }

  for (const file of files) {
    const transcriptId = path.basename(file)
    const text = await fsp.readFile(path.join(TRANSCRIPTS_DIR, file), 'utf8')
    const t0 = Date.now()
    const { perChunk, diagnostics } = await extractJsonPerChunk(text)
    const merged = mergeSchemaResults(perChunk)
    const prose = await finalProse(merged)
    const t1 = Date.now()
    const val = jsonValidityAndCoverage(merged)
    const numValidChunks = diagnostics.filter(d => d.ok).length
    const summary = {
      transcriptId,
      timeMs: t1 - t0,
      chunks: perChunk.length,
      validChunks: numValidChunks,
      diagnostics,
      json: merged,
      prose,
      jsonValid: val.valid,
      coverage: Number(val.coverage.toFixed(3)),
    }

    // Q&A eval
    const qas = qa.filter(q => q.transcript_id === transcriptId)
    const paragraphs = splitParagraphs(text)
    const stop = new Set(['the','a','an','and','or','of','to','in','on','for','with','as','is','are','was','were','be','by','that','this','it','at','from','we','you','they','he','she'])
    const tokenize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).filter(w => !stop.has(w))
    const ask = async (question) => {
      const qTokens = new Set(tokenize(question))
      const scored = paragraphs.map((p, idx) => {
        const pTokens = new Set(tokenize(p))
        let score = 0
        for (const tok of qTokens) if (pTokens.has(tok)) score += 1
        return { idx, p, score }
      }).sort((a,b) => b.score - a.score)
      const top = scored.slice(0, 5).map(s => s.p.slice(0, 1200))
      const sys = 'Answer strictly and only based on the provided transcript excerpts. If the answer is not contained, reply: "I do not know based on the transcript."'
      const user = ['Relevant transcript excerpts (do not infer beyond these):', ...top.map((t, i) => `Excerpt ${i+1}:\n${t}`), '', `Question: ${question}`].join('\n')
      const res = await ollama.chat({ model: MODEL, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, options: { temperature: 0.1 } })
      return res.message?.content ?? ''
    }
    const qaOut = []
    for (const item of qas) {
      const tQ = Date.now()
      const pred = await ask(item.question)
      const tA = Date.now()
      const em = normalize(pred) === normalize(item.answer)
      const f1s = f1(pred, item.answer)
      qaOut.push({ question: item.question, gold: item.answer, pred, timeMs: tA - tQ, EM: em, F1: Number(f1s.toFixed(3)), unanswerable: !!item.unanswerable })
    }
    summary.qa = qaOut
    results.transcripts.push(summary)
  }

  await fsp.mkdir(EVAL_DIR, { recursive: true })
  await fsp.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf8')
  console.log(`Baseline written to ${OUTPUT_FILE}`)
}

run().catch((e) => {
  console.error('Baseline runner failed:', e)
  process.exit(1)
})


