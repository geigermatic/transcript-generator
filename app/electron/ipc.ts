import { BrowserWindow, dialog, ipcMain, clipboard } from 'electron'
import fs from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'
import { ollama } from 'ollama'
import { db } from './persistence/db'
import { ingestFileToText } from './persistence/ingest'
import { runSummarization } from './summarize'
import { getAllowedHosts, getBlockedRequestCount } from './security'

export function registerIpcHandlers(getWin: () => BrowserWindow | null) {
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
    return runSummarization({ transcriptId, model })
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
}


