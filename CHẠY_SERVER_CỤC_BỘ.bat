@echo off
chcp 65001 >nul
title CODE LEGACY - Local Web Server (Port 3000)
echo ===================================================================
echo               CODE LEGACY: FROM ZERO TO LEGEND
echo     Đang khởi chạy Local HTTP Server tại http://localhost:3000 ...
echo ===================================================================
start http://localhost:3000
python -m http.server 3000
