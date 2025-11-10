# Start Backend Server
Write-Host "Starting FinSentiment Pro..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Check if Python is installed
Write-Host "Checking Python installation..." -ForegroundColor Yellow
python --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python not found. Please install Python 3.8+." -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js not found. Please install Node.js 18+." -ForegroundColor Red
    exit 1
}

# Install Python dependencies if needed
Write-Host ""
Write-Host "Checking backend dependencies..." -ForegroundColor Yellow
if (!(Test-Path "backend\venv")) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Cyan
    python -m venv backend\venv
    
    Write-Host "Installing Python dependencies..." -ForegroundColor Cyan
    & backend\venv\Scripts\Activate.ps1
    pip install -r backend\requirements.txt
    deactivate
}

# Install npm dependencies if needed
Write-Host ""
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "Starting servers..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Start backend in background
Write-Host "Starting Backend Server (Port 5000)..." -ForegroundColor Cyan
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    & backend\venv\Scripts\Activate.ps1
    cd backend
    python app.py
}

# Wait for backend to start
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start frontend
Write-Host "Starting Frontend Server (Port 3000)..." -ForegroundColor Cyan
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "FinSentiment Pro is running!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

try {
    npm run dev
} finally {
    # Cleanup
    Write-Host ""
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    Stop-Job $backendJob
    Remove-Job $backendJob
    Write-Host "Servers stopped." -ForegroundColor Green
}
