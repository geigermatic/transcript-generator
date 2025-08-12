// Keep this file as ESM build for production; dev uses preload.cjs
import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('api', {
  env: { web: false, supportedExtensions: ['.txt', '.md', '.srt', '.vtt', '.docx'] },
  ingest: {
    openFilePicker: () => ipcRenderer.invoke('ingest.openFilePicker') as Promise<string[]>,
    fromDrop: (filePath: string) => ipcRenderer.invoke('ingest.fromDrop', filePath) as Promise<string>,
  },
  summarize: {
    run: (params: { transcriptId: string; model?: string }) => ipcRenderer.invoke('summarize.run', params) as Promise<{ summaryId: string; merged: any; markdown: string }>,
    onProgress: (cb: (value: number) => void) => {
      const listener = (_e: any, value: number) => cb(value)
      ipcRenderer.on('summarize.progress', listener)
      return () => ipcRenderer.off('summarize.progress', listener)
    },
    onStatus: (cb: (payload: { transcriptId: string; text: string }) => void) => {
      const listener = (_e: any, payload: any) => cb(payload)
      ipcRenderer.on('summarize.status', listener)
      return () => ipcRenderer.off('summarize.status', listener)
    },
  },
  glossary: {
    list: () => ipcRenderer.invoke('glossary.list'),
    upsert: (entry: any) => ipcRenderer.invoke('glossary.upsert', entry),
    remove: (term: string) => ipcRenderer.invoke('glossary.remove', term),
  },
  examples: {
    list: () => ipcRenderer.invoke('examples.list'),
    upsert: (example: any) => ipcRenderer.invoke('examples.upsert', example),
    remove: (id: string) => ipcRenderer.invoke('examples.remove', id),
  },
  privacy: {
    status: () => ipcRenderer.invoke('privacy.status') as Promise<{ allowedHosts: string[]; blockedRequests: number }>,
  },
  clipboard: {
    copy: (text: string) => ipcRenderer.invoke('clipboard.copy', text) as Promise<boolean>,
  },
  settings: {
    get: (key: string) => ipcRenderer.invoke('settings.get', key) as Promise<string | undefined>,
    set: (key: string, value: string) => ipcRenderer.invoke('settings.set', { key, value }) as Promise<boolean>,
  },
  chat: {
    ask: (params: { transcriptId: string; message: string; model?: string }) => ipcRenderer.invoke('chat.ask', params) as Promise<{ answer: string }>,
  },
  agent: {
    index: (params: { transcriptId: string; model?: string }) => ipcRenderer.invoke('agent.index', params) as Promise<{ ok: boolean; paragraphs: number }>,
    onIndexProgress: (cb: (e: { transcriptId: string; done: number; total: number }) => void) => {
      const listener = (_e: any, payload: any) => cb(payload)
      ipcRenderer.on('agent.index.progress', listener)
      return () => ipcRenderer.off('agent.index.progress', listener)
    },
    chat: (params: { transcriptId: string; message: string; model?: string; embedModel?: string }) => ipcRenderer.invoke('agent.chat', params) as Promise<{ answer: string; retrieved: Array<{ idx: number; score: number }> }>,
  },
  ab: {
    submit: (payload: { transcriptId: string; candidateA: string; candidateB: string; winner: 0 | 1; reason?: string }) => ipcRenderer.invoke('ab.submit', payload) as Promise<boolean>,
  }
})
