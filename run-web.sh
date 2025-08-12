#!/usr/bin/env bash
set -euo pipefail

# Resolve repo/app directories regardless of where this script is invoked from
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/app"
MODEL="${MODEL:-llama3.1:8b-instruct-q4_K_M}"
EMBED_MODEL="${EMBED_MODEL:-nomic-embed-text}"
PORT="${PORT:-3000}"

echo "[run-web] Checking Ollama on http://127.0.0.1:11434 ..."
if ! curl -sf http://127.0.0.1:11434/ >/dev/null 2>&1; then
  echo "[run-web] Starting Ollama... logs: /tmp/ollama.log"
  nohup ollama serve >/tmp/ollama.log 2>&1 &
  for i in {1..60}; do
    if curl -sf http://127.0.0.1:11434/ >/dev/null 2>&1; then break; fi
    sleep 1
  done
fi

echo "[run-web] Ensuring model '$MODEL' is available..."
if ! ollama show "$MODEL" >/dev/null 2>&1; then
  ollama pull "$MODEL"
fi

echo "[run-web] Ensuring embed model '$EMBED_MODEL' is available (for agent)..."
if ! ollama show "$EMBED_MODEL" >/dev/null 2>&1; then
  ollama pull "$EMBED_MODEL"
fi

echo "[run-web] Preparing web app at $APP_DIR ..."
cd "$APP_DIR"
if [ ! -d node_modules ]; then
  echo "[run-web] Installing dependencies..."
  npm install
fi

echo "[run-web] Building web bundle (vite build)..."
npx vite build

echo "[run-web] Serving at http://127.0.0.1:$PORT"
(sleep 1 && open "http://127.0.0.1:$PORT") >/dev/null 2>&1 || true
exec npx vite preview --host 127.0.0.1 --port "$PORT"


