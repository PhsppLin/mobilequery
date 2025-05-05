@echo off
cd /d D:\GitHub\mobilequery

for /f %%i in ('powershell -Command "Get-Date -Format yyyy-MM-dd_HH-mm"') do set datetime=%%i

echo Uploading... (datetime: %datetime%)

git add mobilequery_data.json
git commit -m "更新資料庫 %datetime%"
git push origin master

pause
