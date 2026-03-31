$ErrorActionPreference = 'Stop'

Write-Host "=== Listeners on 8081/19000-19002 ==="
$ports = @(8081, 19000, 19001, 19002)

foreach ($p in $ports) {
  $conns = Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue
  if (-not $conns) {
    Write-Host "No listener on port $p"
    continue
  }

  $conns |
    Sort-Object LocalAddress |
    Select-Object LocalAddress, LocalPort, OwningProcess |
    Format-Table -AutoSize
}

Write-Host ""
Write-Host "=== netstat -ano | find ':8081' ==="
netstat -ano | Select-String ":8081" | ForEach-Object { $_.Line }
