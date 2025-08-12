import { BrowserWindow, dialog, ipcMain, clipboard } from 'electron'
import { z } from 'zod'
import ollama from 'ollama'
import { listGlossary, upsertGlossary, removeGlossary, listExamples, upsertExample, removeExample, getSetting, setSetting, getTranscript } from './persistence/db'
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
    return runSummarization({ transcriptId, model }, { onProgress })
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

  // Chat (grounded on transcript only)
  ipcMain.handle('chat.ask', async (_e, input: { transcriptId: string; message: string; model?: string }) => {
    const schema = z.object({ transcriptId: z.string(), message: z.string().min(1), model: z.string().optional() })
    const { transcriptId, message, model } = schema.parse(input)
    const t = getTranscript(transcriptId)
    if (!t) return { answer: '' }
    const chosenModel = model ?? 'llama3.1:8b-instruct-q4_K_M'
    const sys = 'You are a helpful assistant. You must answer strictly and only based on the provided transcript text. If unknown, say you do not know.'
    const user = `Transcript:\n<<<${t.text.slice(0, 12000)}>>>\n\nQuestion: ${message}`
    const res = await ollama.chat({ model: chosenModel, messages: [ { role: 'system', content: sys }, { role: 'user', content: user } ], stream: false, options: { temperature: 0.2 } })
    return { answer: res.message.content }
  })
}


