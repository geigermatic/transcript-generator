# Local Transcript Summarizer

Privacy-first Electron app that summarizes transcripts and supports grounded Q&A using local Ollama models. All processing stays on your machine.

## Features (MVP)
- Import: .txt/.md/.srt/.vtt/.docx (converted locally to text)
- Summarize: strict JSON extraction per chunk → merged → final markdown
- Glossary & Examples: improve terminology and style via local CRUD
- Chat: answer questions grounded on the transcript only
- Copy summary to clipboard
- Privacy: CSP + request guard blocks non-local hosts

## Agent (in-progress)
- Hybrid retrieval (BM25-like + embeddings) for better Q&A
- Paragraph indexing + embeddings (`nomic-embed-text`)
- Learning loop: store A/B preferences and corrections; update style guide

## Docs
- Architecture: `docs/ARCHITECTURE.md`
- Eval harness: `eval/README.md`

## Prereqs
- Node 18+
- Ollama installed and running locally
- Pull models:
  - `ollama pull llama3.1:8b-instruct-q4_K_M`
  - (Agent) `ollama pull nomic-embed-text`

## Run (web mode for testing)
```
bash ./run-web.sh
```
Open `http://127.0.0.1:3000`.

## Run (Electron dev)
```
cd app
npm install
npm run dev
```

## Build (macOS)
```
cd app
npm run build
```
Find the app in `app/release/<version>/`.

## Evaluation (baseline)
```
# Drop files into eval/inbox/
cd app
npm run eval:bootstrap
npm run eval:baseline -- --verbose
```
Results: `eval/baseline.json` (JSON validity/coverage, QA EM/F1, timings)

## Security
Electron main enforces CSP and a local-only network guard. See `docs/ARCHITECTURE.md`.

## Roadmap
- Integrate agent retrieval into summarization
- A/B picker and preference learning
- “Learn this” corrections UI
- macOS app polish (icon, codesign), README setup
