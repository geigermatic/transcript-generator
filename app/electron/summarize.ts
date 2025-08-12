import { getTranscript, listGlossary, listExamples, upsertSummary } from './persistence/db'
import ollama from 'ollama'

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

export async function runSummarization(input: { transcriptId: string; model?: string }, hooks?: { onProgress?: (value: number) => void }) {
  const { transcriptId, model } = input
  const transcript = getTranscript(transcriptId)
  if (!transcript) throw new Error('Transcript not found')

  // Fetch glossary and examples to include in prompts (limit sizes to avoid ctx truncation)
  const glossaryAll = listGlossary()
  const examplesAll = listExamples()
  const glossary = glossaryAll.slice(0, 20)
  const examples = examplesAll.slice(0, 2).map(e => ({ ...e, excerpt: e.excerpt.slice(0, 1000) }))

  const chosenModel = model ?? 'llama3.1:8b-instruct-q4_K_M'

  const encodedLengthFn = await resolveTokenCounter(chosenModel)
  const chunks = chunkByToken(transcript.text, 1200, encodedLengthFn)

  // Per-chunk JSON extraction
  const perChunkResults: SchemaType[] = []
  const total = chunks.length
  let index = 0
  for (const chunk of chunks) {
    index += 1
    // Log to terminal (Electron main process)
    console.log(`[summarize] chunk ${index}/${total} starting (${Math.min(chunk.length, 80)} chars preview: ${chunk.slice(0, 80).replace(/\n/g, ' ')}...)`)
    const sys = 'You are an offline summarizer. Output STRICT JSON only that matches the given JSON Schema.'
    const user = [
      'Verified glossary (authoritative terms and definitions):',
      JSON.stringify(glossary),
      '',
      'Few-shot examples (may guide style):',
      JSON.stringify(examples),
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
    const res = await ollama.chat({
      model: chosenModel,
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user },
      ],
      // @ts-ignore
      format: 'json',
      stream: false,
      options: { temperature: 0.2 },
    })
    try {
      const content = res.message?.content ?? '{}'
      const parsed = JSON.parse(content) as SchemaType
      perChunkResults.push(parsed)
      console.log(`[summarize] chunk ${index}/${total} parsed OK: keys=${Object.keys(parsed).join(',')}`)
    } catch {
      perChunkResults.push({ key_takeaways: [], topics: [] })
      console.warn(`[summarize] chunk ${index}/${total} parse failed; added empty result`)
    }
    hooks?.onProgress?.(Math.round((index / total) * 80))
  }

  const merged = mergeSchemaResults(perChunkResults)

  // Final markdown summary
  const sys2 = 'You are a precise technical editor.'
  const user2 = [
    'Using the merged facts below (JSON), write a clear, concise markdown summary (3–7 bullets for key takeaways, short intro, optional notes for cautions/contraindications if present). No hallucinations.',
    'Facts JSON:',
    JSON.stringify(merged),
  ].join('\n')
  hooks?.onProgress?.(90)
  const res2 = await ollama.chat({ model: chosenModel, messages: [
    { role: 'system', content: sys2 },
    { role: 'user', content: user2 },
  ], stream: false, options: { temperature: 0.2 } })
  const markdown = res2.message.content

  const summaryId = upsertSummary(transcriptId, merged, markdown)
  hooks?.onProgress?.(100)
  return { summaryId, merged, markdown }
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

async function resolveTokenCounter(_model: string) {
  // If Ollama exposes tokenizer info, we could query it. For now, approximate by characters.
  // 1 token ~= 4 chars heuristic for LLaMA-class models
  return async (text: string) => Math.ceil(text.length / 4)
}

function chunkByToken(text: string, targetTokens: number, _countTokens: (t: string) => Promise<number>): string[] {
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


