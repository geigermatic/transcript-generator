"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  ingest: {
    openFilePicker: () => electron.ipcRenderer.invoke("ingest.openFilePicker"),
    fromDrop: (filePath) => electron.ipcRenderer.invoke("ingest.fromDrop", filePath)
  },
  summarize: {
    run: (params) => electron.ipcRenderer.invoke("summarize.run", params)
  },
  glossary: {
    list: () => electron.ipcRenderer.invoke("glossary.list"),
    upsert: (entry) => electron.ipcRenderer.invoke("glossary.upsert", entry),
    remove: (term) => electron.ipcRenderer.invoke("glossary.remove", term)
  },
  examples: {
    list: () => electron.ipcRenderer.invoke("examples.list"),
    upsert: (example) => electron.ipcRenderer.invoke("examples.upsert", example),
    remove: (id) => electron.ipcRenderer.invoke("examples.remove", id)
  },
  privacy: {
    status: () => electron.ipcRenderer.invoke("privacy.status")
  },
  clipboard: {
    copy: (text) => electron.ipcRenderer.invoke("clipboard.copy", text)
  }
});
