import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('api', {
  ingest: {
    openFilePicker: () => ipcRenderer.invoke('ingest.openFilePicker') as Promise<string[]>,
    fromDrop: (filePath: string) => ipcRenderer.invoke('ingest.fromDrop', filePath) as Promise<string>,
  },
  summarize: {
    run: (params: { transcriptId: string; model?: string }) => ipcRenderer.invoke('summarize.run', params) as Promise<{ summaryId: string; merged: any; markdown: string }>,
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
})
