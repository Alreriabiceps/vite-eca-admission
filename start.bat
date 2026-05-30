@echo off
setlocal
set "ROOT=%~dp0"
set "NODE_OPTIONS=--dns-result-order=ipv4first"

if not exist "%ROOT%backend\node_modules\" (
    echo Installing backend dependencies...
    cd /d "%ROOT%backend"
    call npm install
)

if not exist "%ROOT%frontend\node_modules\" (
    echo Installing frontend dependencies...
    cd /d "%ROOT%frontend"
    call npm install
)

echo Starting backend...
start "SAM Backend" cmd /k "cd /d %ROOT%backend && set NODE_OPTIONS=--dns-result-order=ipv4first && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting frontend...
start "SAM Frontend" cmd /k "cd /d %ROOT%frontend && npm run dev"

echo.
echo SAM is starting in two terminal windows.
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo.
echo Close both windows to stop the app.
