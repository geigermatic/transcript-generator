import { useEffect, useRef, useState } from 'react'
import './App.css'

type SummarizeResult = { summaryId: string; merged: any; markdown: string }

function App() {
  const [transcriptIds, setTranscriptIds] = useState<string[]>([])
  const [activeTranscriptId, setActiveTranscriptId] = useState<string | null>(null)
  const [result, setResult] = useState<SummarizeResult | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [model, setModel] = useState('llama3.1:8b-instruct-q4_K_M')
  const [glossary, setGlossary] = useState<Array<{ term: string; definition: string; aliases?: string[] }>>([])
  const [newTerm, setNewTerm] = useState('')
  const [newDef, setNewDef] = useState('')
  const [examples, setExamples] = useState<Array<{ id?: string; excerpt: string; target_json: any; notes?: string }>>([])
  const [newExcerpt, setNewExcerpt] = useState('')
  const [newTargetJson, setNewTargetJson] = useState('')
  const [privacy, setPrivacy] = useState<{ allowedHosts: string[]; blockedRequests: number } | null>(null)
  const [chatInput, setChatInput] = useState('')
  const [chatAnswer, setChatAnswer] = useState('')
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    refreshGlossary()
    refreshExamples()
    refreshPrivacy()
    // Load saved model
    window.api.settings.get('default_model').then((saved) => {
      if (saved && typeof saved === 'string') setModel(saved)
    })
  }, [])

  // Persist model when changed
  useEffect(() => {
    if (model && model.trim()) {
      window.api.settings.set('default_model', model.trim())
    }
  }, [model])

  const refreshGlossary = async () => {
    const list = await window.api.glossary.list()
    setGlossary(list)
  }
  const refreshExamples = async () => {
    const list = await window.api.examples.list()
    setExamples(list)
  }
  const refreshPrivacy = async () => {
    const s = await window.api.privacy.status()
    setPrivacy(s)
  }

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
      const res = await window.api.summarize.run({ transcriptId: activeTranscriptId, model })
      setResult(res)
    } finally {
      off()
      setIsSummarizing(false)
      setTimeout(() => setProgress(0), 800)
    }
  }

  const onAddGlossary = async () => {
    const term = newTerm.trim()
    const definition = newDef.trim()
    if (!term || !definition) return
    await window.api.glossary.upsert({ term, definition })
    setNewTerm('')
    setNewDef('')
    refreshGlossary()
  }

  const onRemoveGlossary = async (term: string) => {
    await window.api.glossary.remove(term)
    refreshGlossary()
  }

  const onAddExample = async () => {
    const excerpt = newExcerpt.trim()
    if (!excerpt) return
    let parsed: any = {}
    if (newTargetJson.trim()) {
      try { parsed = JSON.parse(newTargetJson) } catch { /* ignore */ }
    }
    await window.api.examples.upsert({ excerpt, target_json: parsed, notes: '' })
    setNewExcerpt('')
    setNewTargetJson('')
    refreshExamples()
  }

  const onRemoveExample = async (id?: string) => {
    if (!id) return
    await window.api.examples.remove(id)
    refreshExamples()
  }

  const onCopyMarkdown = async () => {
    if (!result) return
    await window.api.clipboard.copy(result.markdown)
  }

  return (
    <div className="container">
      <header className="glass header">
        <h1>Local Transcript Summarizer</h1>
        <div className="row">
          <label className="lbl">Model</label>
          <input className="input" value={model} onChange={(e) => setModel(e.target.value)} placeholder="llama3.1:8b-instruct-q4_K_M" />
          <button className="primary" onClick={onPickFiles}>Import Transcript</button>
        </div>
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

          <div className="section">
            <h3>Privacy</h3>
            {privacy ? (
              <>
                <div className="small">Allowed hosts:</div>
                <ul className="mini">
                  {privacy.allowedHosts.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <div className="small">Blocked requests: {privacy.blockedRequests}</div>
              </>
            ) : <div className="small">Loading…</div>}
          </div>
        </div>

        <div className="glass panel">
          <h2>Summary</h2>
          {result ? (
            <>
              <pre className="json-view">{JSON.stringify(result.merged, null, 2)}</pre>
              <div className="controls"><button onClick={onCopyMarkdown}>Copy Markdown</button></div>
              <div className="markdown" dangerouslySetInnerHTML={{ __html: result.markdown.replace(/\n/g, '<br/>') }} />
            </>
          ) : (
            <p>No summary yet.</p>
          )}
        </div>
      </main>

      <section className="grid-2">
        <div className="glass panel">
          <h2>Glossary</h2>
          <div className="row">
            <input className="input" placeholder="Term" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} />
            <input className="input" placeholder="Definition" value={newDef} onChange={(e) => setNewDef(e.target.value)} />
            <button onClick={onAddGlossary}>Add</button>
          </div>
          <ul className="list">
            {glossary.map((g) => (
              <li key={g.term} className="row-between">
                <span><strong>{g.term}</strong>: {g.definition}</span>
                <button onClick={() => onRemoveGlossary(g.term)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass panel">
          <h2>Examples</h2>
          <div className="col">
            <textarea className="input" placeholder="Excerpt" value={newExcerpt} onChange={(e) => setNewExcerpt(e.target.value)} />
            <textarea className="input" placeholder="Target JSON (optional)" value={newTargetJson} onChange={(e) => setNewTargetJson(e.target.value)} />
            <button onClick={onAddExample}>Add</button>
          </div>
          <ul className="list">
            {examples.map((ex) => (
              <li key={ex.id} className="row-between">
                <span className="small">{ex.excerpt.slice(0, 80)}{ex.excerpt.length > 80 ? '…' : ''}</span>
                <button onClick={() => onRemoveExample(ex.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass panel">
          <h2>Chat</h2>
          <div className="row">
            <input className="input" style={{ flex: 1 }} placeholder="Ask a question about the transcript" value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
            <button disabled={!activeTranscriptId || !chatInput.trim()} onClick={async () => {
              if (!activeTranscriptId) return
              const res = await window.api.chat.ask({ transcriptId: activeTranscriptId, message: chatInput, model })
              setChatAnswer(res.answer)
            }}>Ask</button>
          </div>
          <div className="markdown" style={{ whiteSpace: 'pre-wrap' }}>{chatAnswer}</div>
        </div>
      </section>
    </div>
  )
}

export default App
