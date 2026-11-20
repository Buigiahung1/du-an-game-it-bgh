@echo off
chcp 65001 >nul
title CODE LEGACY - Khởi động game
echo ===================================================================
echo               CODE LEGACY: FROM ZERO TO LEGEND
echo        Đang mở game trực tiếp trên trình duyệt của bạn...
echo ===================================================================
start "" "%~dp0index.html"
echo.
echo Game đã mở! Chúc bạn có trải nghiệm tuyệt vời.
timeout /t 3 >nul

