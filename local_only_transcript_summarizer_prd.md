# Local-Only Electron Transcript Summarizer — Product Requirements Document (PRD)

## Overview
This project is a **local-only Electron application** built with **TypeScript, React, and Node** that summarizes teaching transcripts using a local **Ollama** model. The application prioritizes privacy, ensuring no data leaves the user's machine. All processing is performed locally.

## Goals
- Allow the user to drop or select transcript files.
- Provide an **optional chat interface** for Q&A or refining summaries.
- Include a **glossary editor** for domain-specific terms.
- Enable copying of generated summaries.
- Support **training via examples** of ideal outputs (few-shot learning, no cloud fine-tuning).
- Work **completely offline** with a locally running Ollama instance.

## Tech Stack
- **Electron** (desktop wrapper)
- **Vite** + **React** (renderer)
- **TypeScript** (type safety)
- **better-sqlite3** (local DB storage)
- **Ollama** for LLM inference
- **Zustand** for front-end state management
- **Zod** for input validation

## Security
- Electron main/renderer separation with:
  - `contextIsolation: true`
  - `sandbox: true`
  - `nodeIntegration: false`
- Strict Content Security Policy (CSP) blocking remote scripts and requests, allowing only:
  - `file://` and `app://` resources
  - `http://127.0.0.1:11434` (Ollama)
- IPC API with strict type checking and validation.
- No telemetry or analytics.

## Features

### Transcript Ingestion
- Drop zone and file picker for `.txt`, `.md`, `.vtt`, `.srt`, `.docx`.
- Convert all formats to plain text locally.

### Summarization
- Chunk long transcripts into 3–4k token segments.
- Apply JSON schema for structured output.
- Merge JSON results across chunks.
- Generate a final markdown summary from merged data.
- Incorporate glossary entries and few-shot examples into prompts.

### Glossary
- CRUD interface for domain terms and definitions.
- Stored locally in SQLite.
- Used to improve model terminology accuracy.

### Examples Trainer
- CRUD interface for transcript excerpts with ideal JSON outputs.
- Used as few-shot examples during summarization.

### Chat Interface (Optional)
- Q&A over the loaded transcript using local model.
- Retrieve top chunks for grounding answers.

### Copy Summary
- Button to copy markdown summary to clipboard.

### Verify Privacy Panel
- Show CSP status, network guard status, and allowed hosts.
- Count and display blocked network attempts.

## Data Model (SQLite)
Tables:
- `transcripts(id TEXT PK, filename TEXT, created_at DATETIME, sha256 TEXT, text TEXT)`
- `summaries(id TEXT PK, transcript_id TEXT, json TEXT, markdown TEXT, created_at DATETIME)`
- `glossary(term TEXT PK, definition TEXT, aliases TEXT, updated_at DATETIME)`
- `examples(id TEXT PK, excerpt TEXT, target_json TEXT, notes TEXT, created_at DATETIME)`
- `embeddings(id TEXT PK, kind TEXT CHECK(kind IN ('term','example')), ref_id TEXT, vector BLOB)`

## IPC API
Renderer → Main:
- `ingest.openFilePicker()`
- `ingest.fromDrop(filePath)`
- `summarize.run({transcriptId})`
- `chat.ask({transcriptId, message})`
- `glossary.list()`
- `glossary.upsert(entry)`
- `glossary.remove(term)`
- `examples.list()`
- `examples.upsert(example)`
- `examples.remove(id)`
- `privacy.status()`
- `clipboard.copy(text)`

## JSON Schema
```json
{
  "type": "object",
  "properties": {
    "class_title": { "type": "string" },
    "date_or_series": { "type": "string" },
    "audience": { "type": "string" },
    "learning_objectives": { "type": "array", "items": { "type": "string" } },
    "key_takeaways": { "type": "array", "items": { "type": "string" } },
    "topics": { "type": "array", "items": { "type": "string" } },
    "action_items": { "type": "array", "items": { "type": "string" } },
    "notable_quotes": { "type": "array", "items": { "type": "string" } },
    "open_questions": { "type": "array", "items": { "type": "string" } },
    "timestamp_refs": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["key_takeaways", "topics"]
}
```

## Prompt Templates

**Per-Chunk Extraction (JSON Only):**
```
System: You are an offline summarizer. Output STRICT JSON only that matches the given JSON Schema.
User:
Verified glossary (authoritative terms and definitions):
{{GLOSSARY_JSON}}

Transcript chunk:
<<<{{CHUNK}}>>>

Task:
- Fill every possible field in the schema based only on the chunk.
- If unknown, use "" or [].
JSON Schema:
{{SCHEMA_JSON}}
```

**Final Prose Summary (Markdown):**
```
System: You are a precise technical editor.
User:
Using the merged facts below (JSON), write a clear, concise markdown summary (3–7 bullets for key takeaways, short intro, optional notes for cautions/contraindications if present). No hallucinations.
Facts JSON:
{{MERGED_JSON}}
```

## Acceptance Criteria
- Import a transcript, run summarization, and display JSON + markdown.
- Add glossary entries to improve terminology accuracy.
- Add examples to influence summary style.
- Chat grounded on transcript only.
- Copy markdown summary to clipboard.
- Operates offline with Ollama running locally.
- Network guard blocks all non-localhost requests.

## Packaging & Deployment
- Build scripts for macOS, Windows, Linux.
- Document prerequisites: Ollama install and model pull (`ollama pull llama3.1:8b-instruct-q4_K_M`).
- README with install, run, and build instructions.
