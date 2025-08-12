// @ts-ignore - no official types in our setup
import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'
import { app } from 'electron'
import crypto from 'node:crypto'

let dbInstance: Database.Database | null = null

export type TranscriptRow = {
  id: string
  filename: string
  created_at: string
  sha256: string
  text: string
}

export type SummaryRow = {
  id: string
  transcript_id: string
  json: string
  markdown: string
  created_at: string
}

export function db(): Database.Database {
  if (dbInstance) return dbInstance
  const userDataDir = app.getPath('userData')
  const dbPath = path.join(userDataDir, 'data.sqlite3')
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  dbInstance = new Database(dbPath)
  dbInstance.pragma('journal_mode = WAL')
  initSchema(dbInstance)
  return dbInstance
}

function initSchema(d: Database.Database): void {
  d.exec(`
    CREATE TABLE IF NOT EXISTS transcripts (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      sha256 TEXT NOT NULL,
      text TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS summaries (
      id TEXT PRIMARY KEY,
      transcript_id TEXT NOT NULL,
      json TEXT NOT NULL,
      markdown TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS glossary (
      term TEXT PRIMARY KEY,
      definition TEXT NOT NULL,
      aliases TEXT DEFAULT '',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS examples (
      id TEXT PRIMARY KEY,
      excerpt TEXT NOT NULL,
      target_json TEXT NOT NULL,
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS embeddings (
      id TEXT PRIMARY KEY,
      kind TEXT CHECK(kind IN ('term','example')) NOT NULL,
      ref_id TEXT NOT NULL,
      vector BLOB NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `)
}

export function randomId(): string {
  return crypto.randomUUID()
}

export function computeSha256(content: string | Buffer): string {
  const h = crypto.createHash('sha256')
  h.update(content)
  return h.digest('hex')
}

export function insertTranscript(filename: string, text: string, sha256?: string): string {
  const id = randomId()
  const digest = sha256 ?? computeSha256(text)
  const stmt = db().prepare(
    'INSERT INTO transcripts(id, filename, sha256, text) VALUES (?, ?, ?, ?)' 
  )
  stmt.run(id, filename, digest, text)
  return id
}

export function getTranscript(id: string): TranscriptRow | undefined {
  const row = db().prepare('SELECT * FROM transcripts WHERE id = ?').get(id) as TranscriptRow | undefined
  return row
}

export function listTranscripts(): Array<Pick<TranscriptRow, 'id' | 'filename' | 'created_at'>> {
  const rows = db().prepare('SELECT id, filename, created_at FROM transcripts ORDER BY created_at DESC').all() as any[]
  return rows
}

export function upsertSummary(transcriptId: string, json: any, markdown: string): string {
  const id = randomId()
  const stmt = db().prepare(
    'INSERT INTO summaries(id, transcript_id, json, markdown) VALUES (?, ?, ?, ?)'
  )
  stmt.run(id, transcriptId, JSON.stringify(json), markdown)
  return id
}

export function getLatestSummary(transcriptId: string): SummaryRow | undefined {
  const row = db().prepare(
    'SELECT * FROM summaries WHERE transcript_id = ? ORDER BY created_at DESC LIMIT 1'
  ).get(transcriptId) as SummaryRow | undefined
  return row
}

export type GlossaryEntry = { term: string; definition: string; aliases?: string[] }

export function listGlossary(): GlossaryEntry[] {
  const rows = db().prepare('SELECT term, definition, aliases FROM glossary ORDER BY term ASC').all() as any[]
  return rows.map(r => ({
    term: r.term,
    definition: r.definition,
    aliases: r.aliases ? String(r.aliases).split(',').map((s: string) => s.trim()).filter(Boolean) : [],
  }))
}

export function upsertGlossary(entry: GlossaryEntry): void {
  const aliasesCsv = (entry.aliases ?? []).join(',')
  db().prepare(`INSERT INTO glossary(term, definition, aliases, updated_at)
    VALUES (@term, @definition, @aliases, CURRENT_TIMESTAMP)
    ON CONFLICT(term) DO UPDATE SET definition=excluded.definition, aliases=excluded.aliases, updated_at=CURRENT_TIMESTAMP
  `).run({ term: entry.term, definition: entry.definition, aliases: aliasesCsv })
}

export function removeGlossary(term: string): void {
  db().prepare('DELETE FROM glossary WHERE term = ?').run(term)
}

export type ExampleEntry = { id?: string; excerpt: string; target_json: any; notes?: string }

export function listExamples(): ExampleEntry[] {
  const rows = db().prepare('SELECT id, excerpt, target_json, notes FROM examples ORDER BY created_at DESC').all() as any[]
  return rows.map(r => ({ id: r.id, excerpt: r.excerpt, target_json: JSON.parse(r.target_json), notes: r.notes }))
}

export function upsertExample(entry: ExampleEntry): string {
  const id = entry.id ?? randomId()
  db().prepare('INSERT INTO examples(id, excerpt, target_json, notes) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET excerpt=excluded.excerpt, target_json=excluded.target_json, notes=excluded.notes')
    .run(id, entry.excerpt, JSON.stringify(entry.target_json), entry.notes ?? '')
  return id
}

export function removeExample(id: string): void {
  db().prepare('DELETE FROM examples WHERE id = ?').run(id)
}

export function getSetting(key: string): string | undefined {
  const row = db().prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined
  return row?.value
}

export function setSetting(key: string, value: string): void {
  db().prepare('INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value')
    .run(key, value)
}


