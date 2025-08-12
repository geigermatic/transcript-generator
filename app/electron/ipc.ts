import { BrowserWindow, dialog, ipcMain, clipboard } from 'electron'
import { z } from 'zod'
import ollama from 'ollama'
import { listGlossary, upsertGlossary, removeGlossary, listExamples, upsertExample, removeExample, getSetting, setSetting, getTranscript, insertPreference, upsertDefaultStyleGuideAppend } from './persistence/db'
import { ingestFileToText } from './persistence/ingest'
import { runSummarization } from './summarize'
import { getAllowedHosts, getBlockedRequestCount } from './security'

let ipcRegistered = false
export function registerIpcHandlers(getWin: () => BrowserWindow | null) {
  if (ipcRegistered) return
  ipcRegistered = true
  ipcMain.handle('ingest.openFilePicker', async () => {
    const win = getWin()
    if (!win) return null
    const result = await dialog.showOpenDialog(win, {
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Transcripts', extensions: ['txt', 'md', 'vtt', 'srt', 'docx'] },
      ],
    })
    if (result.canceled || result.filePaths.length === 0) return []
    const ingestedIds: string[] = []
    for (const filePath of result.filePaths) {
      const id = await ingestFileToText(filePath)
      ingestedIds.push(id)
    }
    return ingestedIds
  })

  ipcMain.handle('ingest.fromDrop', async (_e, filePath: string) => {
    return ingestFileToText(filePath)
  })

  ipcMain.handle('summarize.run', async (_e, input: { transcriptId: string; model?: string }) => {
    const schema = z.object({ transcriptId: z.string().min(1), model: z.string().optional() })
    const { transcriptId, model } = schema.parse(input)
    const win = getWin()
    const onProgress = (value: number) => {
      win?.webContents.send('summarize.progress', value)
    }
    const onStatus = (text: string) => {
      win?.webContents.send('summarize.status', { transcriptId, text })
    }
    return runSummarization({ transcriptId, model }, { onProgress, onStatus })
  })

  ipcMain.handle('privacy.status', async () => {
    return {
      allowedHosts: getAllowedHosts(process.env.VITE_DEV_SERVER_URL),
      blockedRequests: getBlockedRequestCount(),
    }
  })

  ipcMain.handle('clipboard.copy', async (_e, text: string) => {
    clipboard.writeText(text)
    return true
  })

  // Placeholder for glossary/examples CRUD, to be implemented in MVP steps
  ipcMain.handle('glossary.list', async () => {
    return listGlossary()
  })
  ipcMain.handle('glossary.upsert', async (_e, entry: { term: string; definition: string; aliases?: string[] }) => {
    upsertGlossary(entry)
    return true
  })
  ipcMain.handle('glossary.remove', async (_e, term: string) => {
    removeGlossary(term)
    return true
  })

  ipcMain.handle('examples.list', async () => {
    return listExamples()
  })
  ipcMain.handle('examples.upsert', async (_e, example: { id?: string; excerpt: string; target_json: any; notes?: string }) => {
    return upsertExample(example)
  })
  ipcMain.handle('examples.remove', async (_e, id: string) => {
    removeExample(id)
    return true
  })

  // Settings
  ipcMain.handle('settings.get', async (_e, key: string) => {
    return getSetting(key)
  })
  ipcMain.handle('settings.set', async (_e, payload: { key: string; value: string }) => {
    setSetting(payload.key, payload.value)
    return true
  })

  // A/B preference submission (quality mode)
  ipcMain.handle('ab.submit', async (_e, payload: { transcriptId: string; candidateA: string; candidateB: string; winner: 0 | 1; reason?: string }) => {
    insertPreference({ transcript_id: payload.transcriptId, candidate_a: payload.candidateA, candidate_b: payload.candidateB, winner: payload.winner, reason: payload.reason })
    if (payload.reason && payload.reason.trim()) {
      upsertDefaultStyleGuideAppend(payload.reason.trim())
    }
    return true
  })

  // Chat (grounded on transcript only)
  ipcMain.handle('chat.ask', async (_e, input: { transcriptId: string; message: string; model?: string }) => {
    const schema = z.object({ transcriptId: z.string(), message: z.string().min(1), model: z.string().optional() })
    const { transcriptId, message, model } = schema.parse(input)
    const t = getTranscript(transcriptId)
    if (!t) return { answer: '' }
    const chosenModel = model ?? 'llama3.1:8b-instruct-q4_K_M'
    const sys = 'You are a helpful assistant. Answer strictly and only based on the provided transcript excerpts. If the answer is not contained, reply: "I do not know based on the transcript."'

    // Naive retrieval: split transcript into paragraphs and score overlap with the question
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
    console.log(`[chat] question: ${message}`)
    console.log(`[chat] top paragraph scores:`, scored.slice(0, 5).map(s => ({ idx: s.idx, score: s.score, preview: s.p.slice(0, 60).replace(/\n/g, ' ') })))

    const user = [
      'Relevant transcript excerpts (do not infer beyond these):',
      ...top.map((t, i) => `Excerpt ${i+1}:\n${t}`),
      '',
      `Question: ${message}`,
    ].join('\n')

    const res = await ollama.chat({ model: chosenModel, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, options: { temperature: 0.1 } })
    return { answer: res.message.content }
  })

  // Agent indexing (paragraphs + embeddings)
  ipcMain.handle('agent.index', async (_e, input: { transcriptId: string; model?: string }) => {
    const schema = z.object({ transcriptId: z.string(), model: z.string().optional() })
    const { transcriptId, model } = schema.parse(input)
    const t = getTranscript(transcriptId)
    if (!t) return { ok: false }
    const { splitParagraphs, embedParagraphs } = await import('./agent/indexer')
    const paras = await splitParagraphs(transcriptId, t.text)
    let done = 0
    await embedParagraphs(transcriptId, paras, model || 'nomic-embed-text', (d, total) => {
      done = d
      const win = getWin()
      win?.webContents.send('agent.index.progress', { transcriptId, done, total })
    })
    return { ok: true, paragraphs: paras.length }
  })

  // Agent hybrid chat (BM25 + embeddings)
  ipcMain.handle('agent.chat', async (_e, input: { transcriptId: string; message: string; model?: string, embedModel?: string }) => {
    const schema = z.object({ transcriptId: z.string(), message: z.string().min(1), model: z.string().optional(), embedModel: z.string().optional() })
    const { transcriptId, message, model, embedModel } = schema.parse(input)
    const t = getTranscript(transcriptId)
    if (!t) return { answer: '' }
    const chosenModel = model ?? 'llama3.1:8b-instruct-q4_K_M'
    const { hybridRetrieve } = await import('./agent/indexer')
    let embedVec: number[] | undefined
    try {
      const er = await ollama.embed({ model: embedModel || 'nomic-embed-text', input: message }) as any
      embedVec = (er?.embeddings?.[0] || er?.embedding) as number[]
    } catch {}
    const topRows = hybridRetrieve(transcriptId, message, 5, embedVec)
    const excerpts = topRows.map(r => r.text.slice(0, 1200))
    const sys = 'Answer strictly and only based on the provided transcript excerpts. If the answer is not contained, reply: "I do not know based on the transcript."'
    const user = ['Relevant transcript excerpts (do not infer beyond these):', ...excerpts.map((t, i) => `Excerpt ${i+1}:\n${t}`), '', `Question: ${message}`].join('\n')
    const res = await ollama.chat({ model: chosenModel, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, options: { temperature: 0.1 } })
    return { answer: res.message.content, retrieved: topRows.map(r => ({ idx: r.idx, score: r.score })) }
  })

  // Agent diagnostics
  ipcMain.handle('agent.diagnostics', async (_e, input: { transcriptId: string }) => {
    const schema = z.object({ transcriptId: z.string() })
    const { transcriptId } = schema.parse(input)
    const countParas = db().prepare('SELECT COUNT(*) as c FROM agent_paragraphs WHERE transcript_id = ?').get(transcriptId) as any
    const countEmb = db().prepare('SELECT COUNT(*) as c FROM embeddings_agent WHERE kind = "paragraph" AND ref_id IN (SELECT id FROM agent_paragraphs WHERE transcript_id = ?)').get(transcriptId) as any
    return { paragraphs: Number(countParas?.c || 0), embeddings: Number(countEmb?.c || 0) }
  })
}


