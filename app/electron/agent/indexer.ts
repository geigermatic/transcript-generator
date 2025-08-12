import ollama from 'ollama'
import { db, randomId } from '../persistence/db'

export async function splitParagraphs(transcriptId: string, text: string): Promise<string[]> {
  const paragraphs = text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
  const insert = db().prepare('INSERT INTO agent_paragraphs(id, transcript_id, idx, text) VALUES (?, ?, ?, ?)')
  const del = db().prepare('DELETE FROM agent_paragraphs WHERE transcript_id = ?')
  del.run(transcriptId)
  paragraphs.forEach((p, i) => insert.run(randomId(), transcriptId, i, p))
  return paragraphs
}

export async function embedParagraphs(transcriptId: string, paragraphs: string[], model = 'nomic-embed-text', onProgress?: (done: number, total: number) => void) {
  const del = db().prepare("DELETE FROM embeddings_agent WHERE kind = 'paragraph' AND ref_id IN (SELECT id FROM agent_paragraphs WHERE transcript_id = ?)")
  del.run(transcriptId)
  const select = db().prepare('SELECT id, text FROM agent_paragraphs WHERE transcript_id = ? ORDER BY idx ASC')
  const rows = select.all(transcriptId) as Array<{ id: string; text: string }>
  let i = 0
  for (const row of rows) {
    const res = await ollama.embed({ model, input: row.text }) as any
    const vec = (res?.embeddings?.[0] || res?.embedding || []) as number[]
    db().prepare('INSERT INTO embeddings_agent(id, kind, ref_id, vector) VALUES (?, ?, ?, ?)').run(randomId(), 'paragraph', row.id, Buffer.from(new Float32Array(vec).buffer))
    i += 1
    onProgress?.(i, rows.length)
  }
}

export function cosineSim(a: Float32Array, b: Float32Array): number {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i] }
  return (na && nb) ? dot / (Math.sqrt(na)*Math.sqrt(nb)) : 0
}

export function hybridRetrieve(transcriptId: string, query: string, k = 10, embedVec?: number[]) {
  const stop = new Set(['the','a','an','and','or','of','to','in','on','for','with','as','is','are','was','were','be','by','that','this','it','at','from','we','you','they','he','she'])
  const tokenize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).filter(w => !stop.has(w))
  const qTokens = new Set(tokenize(query))
  const rows = db().prepare('SELECT p.id, p.idx, p.text, e.vector FROM agent_paragraphs p LEFT JOIN embeddings_agent e ON e.ref_id = p.id WHERE p.transcript_id = ? AND (e.kind IS NULL OR e.kind = \"paragraph\") ORDER BY p.idx ASC').all(transcriptId) as Array<{ id: string; idx: number; text: string; vector?: Buffer }>
  const qv = embedVec ? new Float32Array(new Float32Array(embedVec as unknown as number[])) : undefined
  const qLower = query.toLowerCase()
  const altPhrase = qLower.replace(/[-_]/g, ' ')
  const scored = rows.map(r => {
    const pTokens = new Set(tokenize(r.text))
    let bm = 0; for (const tok of qTokens) if (pTokens.has(tok)) bm += 1
    let sim = 0
    if (r.vector && qv) {
      const pv = new Float32Array(r.vector.buffer, r.vector.byteOffset, r.vector.length/4)
      sim = cosineSim(pv, qv)
    }
    const pl = r.text.toLowerCase()
    const phraseBonus = (pl.includes(qLower) || pl.includes(altPhrase)) ? 5 : 0
    const score = 0.6*bm + 0.4*sim + phraseBonus
    return { ...r, score }
  })
  scored.sort((a,b) => b.score - a.score)
  return scored.slice(0, k)
}


