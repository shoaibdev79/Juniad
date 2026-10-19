$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host ">>> [1/6] Initializing Git repository..." -ForegroundColor Cyan
git init

Write-Host ">>> [2/6] Configuring Git username and email..." -ForegroundColor Cyan
git config user.name "walihaidrees0987-cloud"
git config user.email "walihaidrees0987@gmail.com"

Write-Host ">>> [3/6] Adding all project files..." -ForegroundColor Cyan
git add .

Write-Host ">>> [4/6] Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit - Ahsan Wedding Invitation"

Write-Host ">>> [5/6] Renaming branch to main..." -ForegroundColor Cyan
git branch -M main

Write-Host ">>> [6/6] Connecting remote repository..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/walihaidrees0987-cloud/ahsan-weddings-invitation.git

Write-Host "`n>>> Pushing code to GitHub..." -ForegroundColor Green
Write-Host "Agar browser window pop up ho to 'Sign in with your browser' par click kar dena.`n" -ForegroundColor Yellow

git push -u origin main --force

Write-Host "`n>>> Done! Code successfully pushed to GitHub." -ForegroundColor Green
Read-Host "Press Enter to exit"
