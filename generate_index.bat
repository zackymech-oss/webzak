@echo off
setlocal enabledelayedexpansion

set "OUTPUT=js\files.js"

echo const fileSystem = { > %OUTPUT%

set "FIRST_DIR=1"

for /d %%D in (home\*) do (
    if "!FIRST_DIR!"=="0" echo , >> %OUTPUT%
    set "FIRST_DIR=0"
    
    set "DIRNAME=%%~nxD"
    echo   "!DIRNAME!": [ >> %OUTPUT%
    
    set "FIRST_FILE=1"
    for %%F in ("%%D\*.*") do (
        if "!FIRST_FILE!"=="0" echo , >> %OUTPUT%
        set "FIRST_FILE=0"
        echo     "%%~nxF" >> %OUTPUT%
    )
    echo   ] >> %OUTPUT%
)

echo }; >> %OUTPUT%
echo. >> %OUTPUT%
echo const fileData = {}; >> %OUTPUT%

:: Parsing file .url dan .txt untuk ekstrak URL
for /r home %%F in (*.url *.txt) do (
    for /f "usebackq tokens=1* delims==" %%A in ("%%F") do (
        set "LINE=%%A"
        set "VAL=%%B"
        if /i "!LINE!"=="URL" (
            echo fileData["%%~nxF"] = "!VAL!"; >> %OUTPUT%
        )
    )
    
    :: Jika file .txt berisi link langsung (tanpa prefix URL=)
    for /f "usebackq delims=" %%L in ("%%F") do (
        set "TXT_LINE=%%L"
        if "!TXT_LINE:~0,4!"=="http" (
            echo fileData["%%~nxF"] = "!TXT_LINE!"; >> %OUTPUT%
        )
    )
)

echo.
echo =======================================================
echo BERHASIL! File js/files.js lah kembali normal.
echo =======================================================
pause