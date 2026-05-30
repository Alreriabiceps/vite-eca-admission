$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

# Helps with some MongoDB Atlas DNS issues on Windows
$env:NODE_OPTIONS = "--dns-result-order=ipv4first"

function Test-NodeModules {
    param([string]$Path)
    return Test-Path (Join-Path $Path "node_modules")
}

$backendDir = Join-Path $root "backend"
$frontendDir = Join-Path $root "frontend"

if (-not (Test-NodeModules $backendDir)) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location $backendDir
    npm install
    Pop-Location
}

if (-not (Test-NodeModules $frontendDir)) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location $frontendDir
    npm install
    Pop-Location
}

Write-Host "Starting backend (http://localhost:5000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "`$env:NODE_OPTIONS='--dns-result-order=ipv4first'; Set-Location '$backendDir'; npm run dev"
)

Start-Sleep -Seconds 2

Write-Host "Starting frontend (http://localhost:5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$frontendDir'; npm run dev"
)

Write-Host ""
Write-Host "SAM is starting in two terminal windows." -ForegroundColor Green
Write-Host "  Backend:  http://localhost:5000"
Write-Host "  Frontend: http://localhost:5173"
Write-Host ""
Write-Host "Close both windows to stop the app."
