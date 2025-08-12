import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './webApiShim'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Optional: main-process notification (guarded in case not exposed)
try {
  // @ts-ignore
  window.ipcRenderer?.on?.('main-process-message', (_event: any, message: any) => {
    console.log(message)
  })
} catch {}
