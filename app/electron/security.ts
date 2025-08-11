import { app, BrowserWindow, session } from 'electron'

let blockedRequestCount = 0

export function getBlockedRequestCount(): number {
  return blockedRequestCount
}

export function setupSecurity(win: BrowserWindow, devServerUrl?: string): void {
  const defaultSession = session.defaultSession

  const allowedOrigins = new Set<string>()
  // Always allow file/app schemes
  // Allow Ollama local endpoint
  allowedOrigins.add('http://127.0.0.1:11434')
  if (devServerUrl) {
    try {
      const u = new URL(devServerUrl)
      allowedOrigins.add(`${u.protocol}//${u.host}`)
    } catch {}
  }

  // Block all external requests except explicitly allowed
  defaultSession.webRequest.onBeforeRequest((details, callback) => {
    const { url, resourceType } = details

    // Allow data URIs
    if (url.startsWith('data:')) return callback({ cancel: false })
    // Allow file protocol
    if (url.startsWith('file:')) return callback({ cancel: false })
    // Allow app protocol (when packaged)
    if (url.startsWith('app:')) return callback({ cancel: false })
    // Allow devtools in development
    if (url.startsWith('devtools:')) return callback({ cancel: false })

    // Allow Vite HMR ws in dev
    if (devServerUrl && (url.startsWith('ws:') || url.startsWith('wss:'))) {
      try {
        const u = new URL(url)
        const dev = new URL(devServerUrl)
        if (u.host === dev.host) return callback({ cancel: false })
      } catch {}
    }

    try {
      const u = new URL(url)
      const origin = `${u.protocol}//${u.host}`
      if (allowedOrigins.has(origin)) {
        return callback({ cancel: false })
      }
    } catch {}

    blockedRequestCount += 1
    return callback({ cancel: true })
  })

  // Harden permissions
  defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false)
  })

  // Content Security Policy
  if (!devServerUrl) {
  defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const cspParts = [
      "default-src 'self' data: file: app:",
      "img-src 'self' data: file: app: blob:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "worker-src 'self' blob:",
      "connect-src 'self' http://127.0.0.1:11434",
    ]
    cspParts.push("script-src 'self'")

    const csp = cspParts.join('; ')
    const headers = {
      ...details.responseHeaders,
      'Content-Security-Policy': [csp],
    }
    callback({ responseHeaders: headers })
  })
  }

  // Further BrowserWindow settings are enforced in main when creating the window
}

export function getAllowedHosts(devServerUrl?: string): string[] {
  const hosts = ['file:', 'app:', 'http://127.0.0.1:11434']
  if (devServerUrl) {
    try {
      const u = new URL(devServerUrl)
      hosts.push(`${u.protocol}//${u.host}`)
    } catch {}
  }
  return hosts
}


