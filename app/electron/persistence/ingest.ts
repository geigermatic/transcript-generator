import path from 'node:path'
import fs from 'node:fs/promises'
import { insertTranscript, computeSha256 } from './db'
import mammoth from 'mammoth'
// Avoid subtitle typings issues by doing a simple SRT text extraction

export async function ingestFileToText(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase()
  const filename = path.basename(filePath)
  const buf = await fs.readFile(filePath)

  let text = ''
  if (ext === '.txt' || ext === '.md') {
    text = buf.toString('utf8')
  } else if (ext === '.docx') {
    const result = await mammoth.extractRawText({ buffer: buf as any } as any)
    text = result.value
  } else if (ext === '.vtt') {
    // WebVTT is close to SRT but we can do light parsing by stripping cues
    text = buf.toString('utf8')
      .split('\n')
      .filter((line) => !/^\d{2}:\d{2}:\d{2}\.\d{3}/.test(line) && !/^WEBVTT/.test(line) && line.trim() !== '')
      .join('\n')
  } else if (ext === '.srt') {
    const s = buf.toString('utf8')
    const lines = s.split(/\r?\n/)
    text = lines
      .filter((line) => {
        const trimmed = line.trim()
        if (!trimmed) return false
        if (/^\d+$/.test(trimmed)) return false
        if (/-->/.test(trimmed)) return false
        return true
      })
      .join('\n')
  } else {
    // Fallback: treat as text
    text = buf.toString('utf8')
  }

  const sha256 = computeSha256(buf)
  return insertTranscript(filename, text, sha256)
}


