@echo off
set "PATH=%ProgramFiles%\Git\cmd;%ProgramFiles%\Git\bin;%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

cd /d "c:\Users\Mega Computer\Downloads\ahsan-wedding-invitation-main\ahsan-wedding-invitation-main"

echo [1/6] Initializing git...
git init

echo [2/6] Setting git config...
git config user.name "walihaidrees0987-cloud"
git config user.email "walihaidrees0987@gmail.com"

echo [3/6] Staging files...
git add .

echo [4/6] Committing files...
git commit -m "Initial commit - Ahsan Wedding Invitation"

echo [5/6] Setting main branch...
git branch -M main

echo [6/6] Configuring remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/walihaidrees0987-cloud/ahsan-weddings-invitation.git

echo.
echo ==============================================
echo Pushing code to GitHub...
echo (Agar browser window pop up ho to login kar lena)
echo ==============================================
git push -u origin main --force

echo.
echo Done!
pause
