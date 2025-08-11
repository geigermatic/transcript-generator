import { useRef, useState } from 'react'
import './App.css'

type SummarizeResult = { summaryId: string; merged: any; markdown: string }

function App() {
  const [transcriptIds, setTranscriptIds] = useState<string[]>([])
  const [activeTranscriptId, setActiveTranscriptId] = useState<string | null>(null)
  const [result, setResult] = useState<SummarizeResult | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [progress, setProgress] = useState(0)
  const dropRef = useRef<HTMLDivElement>(null)

  const onPickFiles = async () => {
    const ids = await window.api.ingest.openFilePicker()
    setTranscriptIds((prev) => [...ids, ...prev])
    if (ids[0]) setActiveTranscriptId(ids[0])
  }

  const onDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (!f) return
    const id = await window.api.ingest.fromDrop(f.path)
    setTranscriptIds((prev) => [id, ...prev])
    setActiveTranscriptId(id)
  }

  const onSummarize = async () => {
    if (!activeTranscriptId) return
    setIsSummarizing(true)
    setProgress(0)
    const off = window.api.summarize.onProgress((v) => setProgress(v))
    try {
      const res = await window.api.summarize.run({ transcriptId: activeTranscriptId })
      setResult(res)
    } finally {
      off()
      setIsSummarizing(false)
      setTimeout(() => setProgress(0), 800)
    }
  }

  return (
    <div className="container">
      <header className="glass header">
        <h1>Local Transcript Summarizer</h1>
        <button className="primary" onClick={onPickFiles}>Import Transcript</button>
      </header>

      <main className="grid">
        <div className="glass panel" onDragOver={(e) => e.preventDefault()} onDrop={onDrop} ref={dropRef}>
          <h2>Drop transcript here</h2>
          <ul className="list">
            {transcriptIds.map((id) => (
              <li key={id} className={id === activeTranscriptId ? 'active' : ''} onClick={() => setActiveTranscriptId(id)}>
                {id}
              </li>
            ))}
          </ul>
          <button className="primary" disabled={!activeTranscriptId || isSummarizing} onClick={onSummarize}>Summarize</button>
          {isSummarizing && (
            <div className="progress"><div className="bar" style={{ width: `${progress}%` }} /></div>
          )}
        </div>

        <div className="glass panel">
          <h2>Summary</h2>
          {result ? (
            <>
              <pre className="json-view">{JSON.stringify(result.merged, null, 2)}</pre>
              <div className="markdown" dangerouslySetInnerHTML={{ __html: result.markdown.replace(/\n/g, '<br/>') }} />
            </>
          ) : (
            <p>No summary yet.</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
