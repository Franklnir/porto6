@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (
  node scripts\serve-preview.mjs
  goto :eof
)
where py >nul 2>nul
if %errorlevel%==0 (
  cd preview-static
  py -m http.server 4321 --bind 127.0.0.1
  goto :eof
)
echo Install Node.js 22.12+ terlebih dahulu.
pause
