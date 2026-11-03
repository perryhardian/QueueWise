$ErrorActionPreference = 'Stop'
$tools = 'C:\QueueWiseTools'
$project = $PSScriptRoot
$env:PATH = "$tools\node-v22.23.4-win-x64;$tools\flutter\bin;$env:PATH"
$pg = "$tools\postgresql\pgsql\bin\pg_ctl.exe"
& $pg status -D "$tools\pgdata" *> $null
if ($LASTEXITCODE -ne 0) {
    & $pg start -D "$tools\pgdata" -l "$tools\postgresql.log" -w
    if ($LASTEXITCODE -ne 0) { throw 'PostgreSQL could not start.' }
}
try { $null = Invoke-RestMethod 'http://127.0.0.1:3000/api/health' -TimeoutSec 2 }
catch {
    Start-Process -FilePath "$tools\node-v22.23.4-win-x64\node.exe" -ArgumentList 'dist/src/main.js' -WorkingDirectory "$project\backend" -WindowStyle Hidden -RedirectStandardOutput "$tools\backend.log" -RedirectStandardError "$tools\backend-error.log" | Out-Null
}
try { $null = Invoke-WebRequest 'http://127.0.0.1:8080' -UseBasicParsing -TimeoutSec 2 }
catch {
    Start-Process -FilePath $env:ComSpec -ArgumentList '/c C:\QueueWiseTools\flutter\bin\flutter.bat run -d web-server --web-hostname 127.0.0.1 --web-port 8080 --dart-define-from-file=.env' -WorkingDirectory "$project\mobile" -WindowStyle Hidden -RedirectStandardOutput "$tools\flutter.log" -RedirectStandardError "$tools\flutter-error.log" | Out-Null
}
Write-Output 'QueueWise is starting at http://127.0.0.1:8080. Logs: C:\QueueWiseTools'
