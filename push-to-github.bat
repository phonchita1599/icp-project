@echo off
title Push ICP Project to GitHub
chcp 65001 >nul
cls

echo ========================================================
echo        กำลังส่งโค้ดโปรเจกต์ ICP ขึ้น GitHub
echo        Repository: https://github.com/phonchita1599/icp-project
echo ========================================================
echo.

set "GIT_EXE=%USERPROFILE%\.mingit\cmd\git.exe"
if not exist "%GIT_EXE%" (
    set "GIT_EXE=git"
)

cd /d "%~dp0icp-project-app" 2>nul || cd /d "%~dp0"

echo [1/3] ตรวจสอบความพร้อมของไฟล์...
"%GIT_EXE%" add .
"%GIT_EXE%" commit -m "Update ICP Career Evaluation project" 2>nul

echo [2/3] เชื่อมต่อกับ GitHub Repository...
"%GIT_EXE%" branch -M main
"%GIT_EXE%" remote remove origin 2>nul
"%GIT_EXE%" remote add origin https://github.com/phonchita1599/icp-project.git

echo [3/3] กำลัง Push ขึ้น branch main...
echo.
echo ********************************************************
echo  หมายเหตุ: หากหน้าต่างถาม Username / Password
echo  - Username: phonchita1599
echo  - Password: ให้ใส่ Personal Access Token (PAT) ของคุณ
echo ********************************************************
echo.

"%GIT_EXE%" push -u origin main

echo.
echo ========================================================
if %ERRORLEVEL% equ 0 (
    echo [สำเร็จ] ส่งโค้ดขึ้น GitHub เรียบร้อยแล้ว!
    echo ตรวจสอบได้ที่: https://github.com/phonchita1599/icp-project
) else (
    echo [คำแนะนำ] หากติดปัญหาเรื่องรหัสผ่าน (Password):
    echo แนะนำให้ใช้ GitHub Token หรือใช้โปรแกรม GitHub Desktop
)
echo ========================================================
echo.
pause
