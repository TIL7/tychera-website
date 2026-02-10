# Local Deployment Script for TYCHERA Website
# Use this if GitHub Actions fails or for rapid testing.

Write-Host "🚀 Starting Local Deployment..." -ForegroundColor Cyan

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..."
    npm install -g vercel
}

# Login (if needed)
# You will be prompted to log in via browser if not authenticated
# vercel login

# Deploy to Production
Write-Host "📦 Building and Deploying to Production..." -ForegroundColor Yellow
# Note: You might be prompted to link the project if this is the first time.
# Use the VERCEL_ORG_ID and VERCEL_PROJECT_ID from your secrets if asked,
# or let Vercel detect it if you are logged in as 'tychera'.

vercel deploy --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment Successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Deployment Failed." -ForegroundColor Red
}
