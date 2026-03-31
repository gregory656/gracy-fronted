$ErrorActionPreference = 'Stop'

$package = 'com.stevescion.Gracy'
$url = 'exp+gracy://expo-development-client/?url=http%3A%2F%2F127.0.0.1%3A8081'

Write-Host "Clearing logcat..."
adb logcat -c | Out-Null

Write-Host "Force-stopping $package..."
adb shell am force-stop $package | Out-Null

Start-Sleep -Milliseconds 700

Write-Host "Launching dev-client deep link..."
adb shell am start -a android.intent.action.VIEW -d $url | Out-Null

Write-Host "Waiting 10s for connection/bundling..."
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "=== Filtered logcat ==="
adb logcat -v time -d |
  Select-String -Pattern 'DevLauncher|DevMenu|ReactNativeJS|packager|Metro|localhost:8081|127.0.0.1:8081|8081/message|EXPO' |
  Select-Object -Last 250 |
  ForEach-Object { $_.Line }
