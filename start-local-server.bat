@echo off
title ICP Career Evaluation - Local Server
chcp 65001 >nul
cls

echo ========================================================
echo        ICP Career Evaluation - Local Server Launcher
echo ========================================================
echo.

cd /d "%~dp0"

:: Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call npm install
    echo.
)

:: Check if dist folder exists, if not build it
if not exist "dist" (
    echo [INFO] Building production bundle for the first time...
    call npm run build
    echo.
)

:: Get Local IP Address
echo [INFO] Finding your Local IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address" /c:"IP Address"') do (
    set "LOCAL_IP=%%a"
    goto :ip_found
)

:ip_found
set LOCAL_IP=%LOCAL_IP: =%

echo --------------------------------------------------------
echo  Local access (Computer):  http://localhost:5173
if not "%LOCAL_IP%"=="" (
    echo  LAN access (Mobile/WiFi): http://%LOCAL_IP%:5173
)
echo --------------------------------------------------------
echo.
echo [TIP] อุปกรณ์อื่น (มือถือ/แท็บเล็ต/คอมเครื่องอื่น) 
if not "%LOCAL_IP%"=="" (
    echo       ที่ต่อ Wi-Fi เดียวกันสามารถเข้าผ่าน:
    echo       http://%LOCAL_IP%:5173
)
echo.
echo กด Ctrl+C ในหน้าต่างนี้เพื่อหยุดการทำงานของเซิร์ฟเวอร์
echo ========================================================
echo.

:: Automatically open in browser
start http://localhost:5173

:: Start Vite Preview Server with host enabled
call npm run preview -- --host 0.0.0.0 --port 5173

pause
