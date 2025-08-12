# Local Transcript Summarizer – Architecture

## Overview
A privacy-first desktop app (Electron + React + TypeScript) that summarizes teaching transcripts and supports grounded Q&A entirely offline with Ollama. No data leaves the machine.

## Components
- Electron Main: security, IPC, DB (better-sqlite3), Ollama calls
- Renderer (React): ingestion UI, summarization, glossary/examples, chat, agent toggle
- Eval harness (Node): baseline metrics for summarize & Q&A

## Data model (SQLite)
- transcripts(id, filename, created_at, sha256, text)
- summaries(id, transcript_id, json, markdown, created_at)
- glossary(term, definition, aliases, updated_at)
- examples(id, excerpt, target_json, notes, created_at)
- settings(key, value)
- embeddings_agent(id, kind, ref_id, vector)
- agent_paragraphs(id, transcript_id, idx, text)
- style_guides(id, name, instructions_md, author, updated_at)
- preferences(id, transcript_id, candidate_a, candidate_b, winner, reason, created_at)

## Security
- contextIsolation: true, nodeIntegration: false, sandbox in prod
- CSP blocks all non-local hosts; allowlist `127.0.0.1:11434`
- Request guard counts and blocks external attempts

## Summarization flow
1) Ingest file (.txt/.md/.srt/.vtt/.docx → text)
2) Chunk (~1200 tokens heuristic); per-chunk JSON extraction (strict schema) via Ollama
3) Merge JSON; final markdown summary with style guidance (extensible)
4) Progress events → UI

## Chat flow (two modes)
- Simple (default): keyword retrieval over paragraphs (top-5) → answer with guardrail
- Agent (toggle): hybrid retrieval (BM25-like + embeddings via `nomic-embed-text`) → answer with guardrail and show retrieved scores

## Agent modules
- Indexer: split paragraphs; embed with Ollama embeddings; store vectors
- Retriever: hybrid score = 0.4*bm25 + 0.6*cosine
- Learning loop (WIP): save corrections and A/B preferences; update style guide; few-shot similar cases

## Eval harness
- `eval/inbox/` drop files; bootstrap converts and auto-generates QA pairs
- Baseline runner summarizes & answers QAs; writes `eval/baseline.json`
- Metrics: JSON validity/coverage, QA EM/F1, timings

## Scripts
- `npm run eval:bootstrap`: convert files in `eval/inbox/` and generate QA
- `npm run eval:baseline`: run baseline with logs (add `--verbose`)

## Models
- LLM: `llama3.1:8b-instruct-q4_K_M` (configurable)
- Embeddings (agent): `nomic-embed-text`

## Next steps
- Agent: integrate retrieval into summarization; background index progress UI
- Learning: “Learn this” corrections; apply in prompts; store preferences reasons into style guide
- A/B: generate two candidates; picker UI; persist winner and reason
- Packaging: polish macOS build, app icon, README setup
