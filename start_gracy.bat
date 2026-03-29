@echo off
echo Starting Gracy Backend...
start "Gracy Backend" cmd /k "cd /d C:\Users\Administrator\gracy-api &amp;&amp; echo Running Prisma generate... &amp;&amp; npx prisma generate &amp;&amp; echo Starting NestJS dev server... &amp;&amp; npm run start:dev"

echo Starting Gracy Frontend...
timeout /t 3 /nobreak >nul
start "Gracy Frontend" cmd /k "cd /d C:\Users\Administrator\Gracy &amp;&amp; echo Building and running Expo Android... &amp;&amp; npx expo run:android"

echo Gracy services launched! Check the new terminal windows.

