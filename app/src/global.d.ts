export {}

declare global {
  interface Window {
    api: {
      ingest: {
        openFilePicker: () => Promise<string[]>
        fromDrop: (filePath: string) => Promise<string>
      }
      summarize: {
        run: (params: { transcriptId: string; model?: string }) => Promise<{ summaryId: string; merged: any; markdown: string }>
        onProgress: (cb: (value: number) => void) => () => void
      }
      glossary: {
        list: () => Promise<any>
        upsert: (entry: any) => Promise<any>
        remove: (term: string) => Promise<any>
      }
      examples: {
        list: () => Promise<any>
        upsert: (example: any) => Promise<any>
        remove: (id: string) => Promise<any>
      }
      privacy: {
        status: () => Promise<{ allowedHosts: string[]; blockedRequests: number }>
      }
      clipboard: {
        copy: (text: string) => Promise<boolean>
      }
      settings: {
        get: (key: string) => Promise<string | undefined>
        set: (key: string, value: string) => Promise<boolean>
      }
      chat: {
        ask: (params: { transcriptId: string; message: string; model?: string }) => Promise<{ answer: string }>
      }
      agent: {
        index: (params: { transcriptId: string; model?: string }) => Promise<{ ok: boolean; paragraphs: number }>
        chat: (params: { transcriptId: string; message: string; model?: string; embedModel?: string }) => Promise<{ answer: string; retrieved: Array<{ idx: number; score: number }> }>
      }
      ab: {
        submit: (payload: { transcriptId: string; candidateA: string; candidateB: string; winner: 0 | 1; reason?: string }) => Promise<boolean>
      }
    }
  }
}


