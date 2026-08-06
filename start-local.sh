#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
if command -v node >/dev/null 2>&1; then
  node scripts/serve-preview.mjs
elif command -v python3 >/dev/null 2>&1; then
  echo "Node tidak ditemukan; memakai Python static server."
  cd preview-static && python3 -m http.server 4321 --bind 127.0.0.1
else
  echo "Install Node.js 22.12+ atau Python 3 terlebih dahulu."
  exit 1
fi
