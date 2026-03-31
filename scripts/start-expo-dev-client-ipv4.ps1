$ErrorActionPreference = 'Stop'

# Force Node to prefer IPv4 results first. This often prevents Metro from binding only to ::1 on Windows.
$env:NODE_OPTIONS = '--dns-result-order=ipv4first'

$projectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "Starting Expo (dev-client) with NODE_OPTIONS=$env:NODE_OPTIONS"
Write-Host "Working directory: $projectRoot"
Write-Host "Command: npx expo start --dev-client --host localhost --port 8081"

Start-Process -FilePath 'cmd.exe' -WorkingDirectory $projectRoot -ArgumentList @(
  '/k',
  'npx expo start --dev-client --host localhost --port 8081'
)
