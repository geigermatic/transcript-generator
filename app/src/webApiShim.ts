// Dev-only web shim for running the renderer over HTTP without Electron
// It provides a window.api compatible surface backed by localStorage and direct Ollama HTTP calls.

type SchemaType = {
  class_title?: string
  date_or_series?: string
  audience?: string
  learning_objectives?: string[]
  key_takeaways: string[]
  topics: string[]
  action_items?: string[]
  notable_quotes?: string[]
  open_questions?: string[]
  timestamp_refs?: string[]
}

function randomId(): string {
  if (crypto?.randomUUID) return crypto.randomUUID()
  return Math.random().toString(36).slice(2)
}

function getLS<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}

function setLS<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

async function chunkByToken(text: string, targetTokens: number): Promise<string[]> {
  const chunks: string[] = []
  const paragraphs = text.split(/\n{2,}/)
  let current: string[] = []
  let currentCount = 0
  for (const p of paragraphs) {
    const approxTokens = Math.ceil(p.length / 4)
    if (currentCount + approxTokens > targetTokens && current.length > 0) {
      chunks.push(current.join('\n\n'))
      current = []
      currentCount = 0
    }
    current.push(p)
    currentCount += approxTokens
  }
  if (current.length > 0) chunks.push(current.join('\n\n'))
  return chunks
}

async function ollamaChat(model: string, messages: Array<{ role: string; content: string }>, options?: any): Promise<string> {
  const res = await fetch('http://127.0.0.1:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: false, options: options ?? { temperature: 0.2 } }),
  })
  if (!res.ok) throw new Error(`ollama http error ${res.status}`)
  const data = await res.json()
  return data?.message?.content ?? ''
}

function mergeSchemaResults(results: SchemaType[]): SchemaType {
  const out: SchemaType = { key_takeaways: [], topics: [] }
  const pushUnique = (arr: string[], value?: string) => {
    if (!value) return
    const v = value.trim()
    if (!v) return
    if (!arr.includes(v)) arr.push(v)
  }
  const pushUniqueMany = (arr: string[], values?: string[]) => {
    if (!values) return
    for (const v of values) pushUnique(arr, v)
  }
  for (const r of results) {
    if (r.class_title) out.class_title = r.class_title
    if (r.date_or_series) out.date_or_series = r.date_or_series
    if (r.audience) out.audience = r.audience
    pushUniqueMany(out.learning_objectives ?? (out.learning_objectives = []), r.learning_objectives)
    pushUniqueMany(out.key_takeaways, r.key_takeaways)
    pushUniqueMany(out.topics, r.topics)
    pushUniqueMany(out.action_items ?? (out.action_items = []), r.action_items)
    pushUniqueMany(out.notable_quotes ?? (out.notable_quotes = []), r.notable_quotes)
    pushUniqueMany(out.open_questions ?? (out.open_questions = []), r.open_questions)
    pushUniqueMany(out.timestamp_refs ?? (out.timestamp_refs = []), r.timestamp_refs)
  }
  return out
}

// Install shim only if Electron preload did not populate window.api
if (typeof window !== 'undefined' && !(window as any).api) {
  const transcripts: Array<{ id: string; filename: string; text: string }> = getLS('web.transcripts', [])
  const saveTranscripts = () => setLS('web.transcripts', transcripts)
  const glossary = getLS<Array<{ term: string; definition: string; aliases?: string[] }>>('web.glossary', [])
  const saveGlossary = () => setLS('web.glossary', glossary)
  const examples = getLS<Array<{ id: string; excerpt: string; target_json: any; notes?: string }>>('web.examples', [])
  const saveExamples = () => setLS('web.examples', examples)

  let progressListeners: Array<(n: number) => void> = []
  let statusListeners: Array<(p: { transcriptId: string; text: string }) => void> = []
  let agentProgressListeners: Array<(p: { transcriptId: string; done: number; total: number }) => void> = []
  const emitProgress = (n: number) => progressListeners.forEach((cb) => cb(n))
  const emitStatus = (p: { transcriptId: string; text: string }) => statusListeners.forEach((cb) => cb(p))

  ;(window as any).api = {
    env: { web: true, supportedExtensions: ['.txt', '.md', '.srt', '.vtt'] },
    ingest: {
      openFilePicker: async () => {
        return new Promise<string[]>((resolve) => {
          const input = document.createElement('input')
          input.type = 'file'
          input.multiple = true
          input.accept = '.txt,.md,.vtt,.srt'
          input.onchange = async () => {
            const files = Array.from(input.files || [])
            const ids: string[] = []
            for (const f of files) {
              const lower = f.name.toLowerCase()
              if (lower.endsWith('.docx') || lower.endsWith('.doc')) {
                alert('In web mode, .docx/.doc is not supported. Please export as .txt or .md, or use the desktop app.')
                continue
              }
              const buf = await f.arrayBuffer()
              let text = ''
              text = new TextDecoder().decode(new Uint8Array(buf))
              // Heuristic: if the file looks binary/ZIP (PK header), block it
              if (text.startsWith('PK\u0003\u0004')) {
                alert(`The file "${f.name}" appears to be binary (.docx or zip). Please provide plain text (.txt/.md/.srt/.vtt) or use the desktop app for .docx.`)
                continue
              }
              const id = randomId()
              transcripts.unshift({ id, filename: f.name, text })
              ids.push(id)
            }
            saveTranscripts()
            resolve(ids)
          }
          input.click()
        })
      },
      fromDrop: async (_filePath: string) => {
        throw new Error('Drag-and-drop path not supported in web mode; use Import Transcript')
      },
    },
    summarize: {
      onProgress: (cb: (value: number) => void) => {
        progressListeners.push(cb)
        return () => { progressListeners = progressListeners.filter((f) => f !== cb) }
      },
      onStatus: (cb: (payload: { transcriptId: string; text: string }) => void) => {
        statusListeners.push(cb)
        return () => { statusListeners = statusListeners.filter((f) => f !== cb) }
      },
      run: async ({ transcriptId, model }: { transcriptId: string; model?: string }) => {
        const t = transcripts.find((x) => x.id === transcriptId)
        if (!t) throw new Error('Transcript not found')
        const chosenModel = model || (localStorage.getItem('default_model') || 'llama3.1:8b-instruct-q4_K_M')
        emitStatus({ transcriptId, text: `Model: ${chosenModel}` })
        const chunks = await chunkByToken(t.text, 1200)
        emitStatus({ transcriptId, text: `Chunking transcript into ${chunks.length} segment(s) ~1200 tokens each` })
        const perChunk: SchemaType[] = []
        const gl = glossary
        const ex = examples
        let index = 0
        for (const chunk of chunks) {
          emitStatus({ transcriptId, text: `Extracting JSON from chunk ${index + 1}/${chunks.length}` })
          index += 1
          console.log(`[web summarize] chunk ${index}/${chunks.length} starting (${Math.min(chunk.length, 80)} chars): ${chunk.slice(0, 80).replace(/\n/g, ' ')}...`)
          const sys = 'You are an offline summarizer. Output STRICT JSON only that matches the given JSON Schema.'
          const user = [
            'Verified glossary (authoritative terms and definitions):',
            JSON.stringify(gl),
            '',
            'Few-shot examples (may guide style):',
            JSON.stringify(ex),
            '',
            'Transcript chunk:',
            `<<<${chunk}>>>`,
            '',
            'Task:',
            '- Fill every possible field in the schema based only on the chunk.',
            '- If unknown, use "" or [].',
            'JSON Schema:',
            JSON.stringify({
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
            }),
          ].join('\n')
          try {
            const content = await ollamaChat(chosenModel, [ { role: 'system', content: sys }, { role: 'user', content: user } ], { temperature: 0.2 })
            const parsed = JSON.parse(content) as SchemaType
            perChunk.push(parsed)
            console.log(`[web summarize] chunk ${index}/${chunks.length} parsed OK: keys=${Object.keys(parsed).join(',')}`)
          } catch {
            perChunk.push({ key_takeaways: [], topics: [] })
            console.warn(`[web summarize] chunk ${index}/${chunks.length} parse failed; using empty result`)
          }
          emitProgress(Math.round((index / chunks.length) * 80))
        }
        const merged = mergeSchemaResults(perChunk)
        emitStatus({ transcriptId, text: 'Generating final markdown summary from merged facts' })
        // Simple agent grounding: use top keyword excerpts (no embeddings in web shim here)
        const stop = new Set(['the','a','an','and','or','of','to','in','on','for','with','as','is','are','was','were','be','by','that','this','it','at','from','we','you','they','he','she'])
        const tokenize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).filter(w => !stop.has(w))
        const qTokens = new Set(tokenize('summary facts key takeaways topics action items'))
        const paras = t.text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
        const scored = paras.map((p, idx) => { const pTokens = new Set(tokenize(p)); let bm=0; for (const tok of qTokens) if (pTokens.has(tok)) bm+=1; return { idx, p, bm } }).sort((a,b)=>b.bm-a.bm)
        const agentExcerpts = scored.slice(0,5).map(s=>s.p.slice(0,1200))
        emitProgress(90)
        const sys2 = 'You are a precise technical editor.'
        const user2 = [
          'Using the merged facts below (JSON), write a clear, concise markdown summary (3–7 bullets for key takeaways, short intro, optional notes for cautions/contraindications if present). No hallucinations.',
          (agentExcerpts.length ? ['Grounding excerpts (do not invent beyond these):', ...agentExcerpts].join('\n') : ''),
          'Facts JSON:',
          JSON.stringify(merged),
        ].filter(Boolean).join('\n')
        const markdown = await ollamaChat(chosenModel, [ { role: 'system', content: sys2 }, { role: 'user', content: user2 } ], { temperature: 0.2 })
        emitProgress(100)
        return { summaryId: randomId(), merged, markdown }
      },
    },
    glossary: {
      list: async () => glossary,
      upsert: async (entry: any) => { const i = glossary.findIndex((g) => g.term === entry.term); if (i >= 0) glossary[i] = entry; else glossary.push(entry); saveGlossary(); return true },
      remove: async (term: string) => { const i = glossary.findIndex((g) => g.term === term); if (i >= 0) glossary.splice(i, 1); saveGlossary(); return true },
    },
    examples: {
      list: async () => examples,
      upsert: async (ex: any) => { if (!ex.id) ex.id = randomId(); const i = examples.findIndex((e) => e.id === ex.id); if (i >= 0) examples[i] = ex; else examples.unshift(ex); saveExamples(); return ex.id },
      remove: async (id: string) => { const i = examples.findIndex((e) => e.id === id); if (i >= 0) examples.splice(i, 1); saveExamples(); return true },
    },
    privacy: {
      status: async () => ({ allowedHosts: ['http://127.0.0.1:11434', window.location.origin], blockedRequests: 0 }),
    },
    clipboard: {
      copy: async (text: string) => { try { await navigator.clipboard.writeText(text); return true } catch { return false } },
    },
    settings: {
      get: async (key: string) => localStorage.getItem(key) || undefined,
      set: async (key: string, value: string) => { localStorage.setItem(key, value); return true },
    },
    chat: {
      ask: async ({ transcriptId, message, model }: { transcriptId: string; message: string; model?: string }) => {
        const t = transcripts.find((x) => x.id === transcriptId)
        if (!t) return { answer: '' }
        const chosenModel = model || (localStorage.getItem('default_model') || 'llama3.1:8b-instruct-q4_K_M')
        const sys = 'You are a helpful assistant. Answer strictly and only based on the provided transcript excerpts. If the answer is not contained, reply: "I do not know based on the transcript."'

        // Naive retrieval over paragraphs
        const stop = new Set(['the','a','an','and','or','of','to','in','on','for','with','as','is','are','was','were','be','by','that','this','it','at','from','we','you','they','he','she'])
        const tokenize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).filter(w => !stop.has(w))
        const qTokens = new Set(tokenize(message))
        const paragraphs = t.text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
        const scored = paragraphs.map((p, idx) => {
          const pTokens = new Set(tokenize(p))
          let score = 0
          for (const tok of qTokens) if (pTokens.has(tok)) score += 1
          return { idx, p, score }
        })
        scored.sort((a, b) => b.score - a.score)
        const top = scored.slice(0, 5).map(s => s.p.slice(0, 1200))
        console.log('[web chat] question:', message)
        console.log('[web chat] top paragraph scores:', scored.slice(0, 5).map(s => ({ idx: s.idx, score: s.score, preview: s.p.slice(0, 60).replace(/\n/g, ' ') })))

        const user = [
          'Relevant transcript excerpts (do not infer beyond these):',
          ...top.map((t, i) => `Excerpt ${i+1}:\n${t}`),
          '',
          `Question: ${message}`,
        ].join('\n')

        const answer = await ollamaChat(chosenModel, [ { role: 'system', content: sys }, { role: 'user', content: user } ], { temperature: 0.1 })
        return { answer }
      },
    },
    agent: {
      index: async ({ transcriptId, model }: { transcriptId: string; model?: string }) => {
        const t = transcripts.find((x) => x.id === transcriptId)
        if (!t) return { ok: false, paragraphs: 0 }
        const paras = t.text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
        const embedModel = model || 'nomic-embed-text'
        const vectors: number[][] = []
        const batchSize = 16
        for (let i = 0; i < paras.length; i += batchSize) {
          const batch = paras.slice(i, i + batchSize)
          try {
            const res = await fetch('http://127.0.0.1:11434/api/embeddings', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ model: embedModel, input: batch })
            })
            if (res.ok) {
              const data = await res.json() as any
              const embs = (data?.embeddings || data?.data || []) as number[][]
              for (const v of embs) vectors.push(v)
            }
          } catch {}
          agentProgressListeners.forEach(cb => cb({ transcriptId, done: Math.min(i + batch.length, paras.length), total: paras.length }))
        }
        // persist in localStorage
        setLS(`agent.paragraphs.${transcriptId}` as any, paras as any)
        setLS(`agent.embeddings.${transcriptId}` as any, vectors as any)
        return { ok: true, paragraphs: paras.length }
      },
      onIndexProgress: (cb: (e: { transcriptId: string; done: number; total: number }) => void) => {
        agentProgressListeners.push(cb)
        return () => { agentProgressListeners = agentProgressListeners.filter(f => f !== cb) }
      },
      chat: async ({ transcriptId, message, model, embedModel }: { transcriptId: string; message: string; model?: string; embedModel?: string }) => {
        const paras: string[] = getLS(`agent.paragraphs.${transcriptId}` as any, []) as any
        const embs: number[][] = getLS(`agent.embeddings.${transcriptId}` as any, []) as any
        const stop = new Set(['the','a','an','and','or','of','to','in','on','for','with','as','is','are','was','were','be','by','that','this','it','at','from','we','you','they','he','she'])
        const tokenize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).filter(w => !stop.has(w))
        const qTokens = new Set(tokenize(message))
        let qv: number[] | undefined
        try {
          const res = await fetch('http://127.0.0.1:11434/api/embeddings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: embedModel || 'nomic-embed-text', input: message }) })
          if (res.ok) { const data = await res.json() as any; qv = (data?.embeddings?.[0] || data?.data?.[0] || []) as number[] }
        } catch {}
        const cosine = (a: number[], b: number[]) => {
          let dot = 0, na = 0, nb = 0
          for (let i = 0; i < Math.min(a.length, b.length); i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i] }
          return (na && nb) ? dot / (Math.sqrt(na)*Math.sqrt(nb)) : 0
        }
        const scored = paras.map((p, idx) => {
          const pTokens = new Set(tokenize(p))
          let bm = 0; for (const tok of qTokens) if (pTokens.has(tok)) bm += 1
          let sim = 0
          if (qv && embs[idx]) sim = cosine(qv, embs[idx])
          const score = 0.5*bm + 0.5*sim
          return { idx, text: p, score }
        }).sort((a,b) => b.score - a.score)
        const top = scored.slice(0, 5).map(s => s.text.slice(0, 1200))
        const sys = 'Answer strictly and only based on the provided transcript excerpts. If the answer is not contained, reply: "I do not know based on the transcript."'
        const user = ['Relevant transcript excerpts (do not infer beyond these):', ...top.map((t, i) => `Excerpt ${i+1}:\n${t}`), '', `Question: ${message}`].join('\n')
        const chosenModel = model || (localStorage.getItem('default_model') || 'llama3.1:8b-instruct-q4_K_M')
        const answer = await ollamaChat(chosenModel, [ { role: 'system', content: sys }, { role: 'user', content: user } ], { temperature: 0.1 })
        return { answer, retrieved: scored.slice(0, 5).map(s => ({ idx: s.idx, score: s.score })) }
      }
    },
  }
}


