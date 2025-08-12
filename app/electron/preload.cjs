const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  ingest: {
    openFilePicker: () => ipcRenderer.invoke('ingest.openFilePicker'),
    fromDrop: (filePath) => ipcRenderer.invoke('ingest.fromDrop', filePath),
  },
  summarize: {
    run: (params) => ipcRenderer.invoke('summarize.run', params),
    onProgress: (cb) => {
      const listener = (_e, value) => cb(value)
      ipcRenderer.on('summarize.progress', listener)
      return () => ipcRenderer.off('summarize.progress', listener)
    },
  },
  glossary: {
    list: () => ipcRenderer.invoke('glossary.list'),
    upsert: (entry) => ipcRenderer.invoke('glossary.upsert', entry),
    remove: (term) => ipcRenderer.invoke('glossary.remove', term),
  },
  examples: {
    list: () => ipcRenderer.invoke('examples.list'),
    upsert: (example) => ipcRenderer.invoke('examples.upsert', example),
    remove: (id) => ipcRenderer.invoke('examples.remove', id),
  },
  privacy: {
    status: () => ipcRenderer.invoke('privacy.status'),
  },
  clipboard: {
    copy: (text) => ipcRenderer.invoke('clipboard.copy', text),
  },
  settings: {
    get: (key) => ipcRenderer.invoke('settings.get', key),
    set: (key, value) => ipcRenderer.invoke('settings.set', { key, value }),
  },
  chat: {
    ask: (params) => ipcRenderer.invoke('chat.ask', params),
  },
})


