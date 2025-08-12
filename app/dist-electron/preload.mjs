"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  env: { web: false, supportedExtensions: [".txt", ".md", ".srt", ".vtt", ".docx"] },
  ingest: {
    openFilePicker: () => electron.ipcRenderer.invoke("ingest.openFilePicker"),
    fromDrop: (filePath) => electron.ipcRenderer.invoke("ingest.fromDrop", filePath)
  },
  summarize: {
    run: (params) => electron.ipcRenderer.invoke("summarize.run", params),
    onProgress: (cb) => {
      const listener = (_e, value) => cb(value);
      electron.ipcRenderer.on("summarize.progress", listener);
      return () => electron.ipcRenderer.off("summarize.progress", listener);
    },
    onStatus: (cb) => {
      const listener = (_e, payload) => cb(payload);
      electron.ipcRenderer.on("summarize.status", listener);
      return () => electron.ipcRenderer.off("summarize.status", listener);
    }
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
  },
  settings: {
    get: (key) => electron.ipcRenderer.invoke("settings.get", key),
    set: (key, value) => electron.ipcRenderer.invoke("settings.set", { key, value })
  },
  chat: {
    ask: (params) => electron.ipcRenderer.invoke("chat.ask", params)
  },
  agent: {
    index: (params) => electron.ipcRenderer.invoke("agent.index", params),
    onIndexProgress: (cb) => {
      const listener = (_e, payload) => cb(payload);
      electron.ipcRenderer.on("agent.index.progress", listener);
      return () => electron.ipcRenderer.off("agent.index.progress", listener);
    },
    chat: (params) => electron.ipcRenderer.invoke("agent.chat", params),
    diagnostics: (params) => electron.ipcRenderer.invoke("agent.diagnostics", params)
  },
  ab: {
    submit: (payload) => electron.ipcRenderer.invoke("ab.submit", payload)
  }
});
