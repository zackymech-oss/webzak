let currentUser = null;
let currentPath = [];
const USERS = { "guest": "guest123" };

function printOutput(text) {
    const outputDiv = document.getElementById("output");
    const line = document.createElement("div");
    line.className = "output-line";
    line.innerHTML = text;
    outputDiv.appendChild(line);
    
    const terminalBody = document.getElementById("terminal-body");
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function setPrompt(html) {
    document.getElementById("prompt").innerHTML = html;
}

function updatePrompt() {
    if (!currentUser) {
        setPrompt("login: ");
    } else {
        const pathStr = currentPath.length === 0 ? "~" : "~/" + currentPath.join("/");
        setPrompt(`<span style="color:#34d399; font-weight:600;">${currentUser}@bangzaki.hub</span>:<span style="color:#818cf8; font-weight:600;">${pathStr}</span>$ `);
    }
}

function getCurrentDirectoryData() {
    if (typeof fileSystem === "undefined") return null;
    let current = fileSystem;
    for (let folder of currentPath) {
        if (current[folder]) {
            current = current[folder];
        } else {
            return null;
        }
    }
    return current;
}

function processInput(input) {
    const trimmed = input.trim();
    
    // Tampilkan perintah yang diketik ke terminal
    const promptText = document.getElementById("prompt").innerText;
    printOutput(`<span>${promptText}${input}</span>`);

    if (!currentUser) {
        handleLogin(trimmed);
        return;
    }

    if (trimmed === "") return;

    // Parsing Command & Arguments
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    executeCommand(cmd, args, trimmed);
}

function handleLogin(input) {
    if (!input) return;
    const parts = input.split(/\s+/);
    const user = parts[0];
    const pass = parts[1];

    if (USERS[user] && USERS[user] === pass) {
        currentUser = user;
        
        // Simpan ke sessionStorage (otomatis ilang pas tab ditutup)
        sessionStorage.setItem('auth_session', 'true');

        printOutput(`<span class="success">Access granted! Selamat datang di bangzaki.hub.</span>`);
        printOutput(`Ketik '<span class="system">help</span>' untuk panduan perintah.\n`);
        updatePrompt();
    } else {
        printOutput(`<span class="error">Access denied: Format login salah.</span>`);
        printOutput(`Ketik: <span class="success">guest guest123</span> (pake spasi) lalu Enter.`);
    }
}

function openFileReal(inputArg) {
    if (currentPath.length === 0) {
        printOutput(`<span class="error">Pilih folder terlebih dahulu (cd [folder]).</span>`);
        return;
    }

    const currentData = getCurrentDirectoryData();
    if (!Array.isArray(currentData) || currentData.length === 0) {
        printOutput(`<span class="error">Folder ini kosong.</span>`);
        return;
    }

    let targetFile = null;

    // 1. Cek jika inputArg berupa NOMOR (contoh: 'cat 1')
    const fileIndex = parseInt(inputArg, 10);
    if (!isNaN(fileIndex) && fileIndex > 0 && fileIndex <= currentData.length) {
        targetFile = currentData[fileIndex - 1];
    }

    // 2. Cek jika inputArg match NAMA LENGKAP atau TANPA EKSTENSI
    if (!targetFile) {
        targetFile = currentData.find(f => {
            const fileNameLower = f.toLowerCase();
            const inputLower = inputArg.toLowerCase();
            const lastDotIndex = f.lastIndexOf('.');
            const nameWithoutExt = lastDotIndex !== -1 ? f.substring(0, lastDotIndex).toLowerCase() : fileNameLower;
            
            return fileNameLower === inputLower || nameWithoutExt === inputLower;
        });
    }

    // Jika file tidak ditemukan
    if (!targetFile) {
        printOutput(`<span class="error">cat: file '${inputArg}' tidak ditemukan. Ketik 'ls' untuk melihat daftar file/nomor.</span>`);
        return;
    }

    // --- PROSES MEMBUKA FILE YANG MATCH ---
    const folder = currentPath[0];
    const filePath = `home/${folder}/${targetFile}`;
    const ext = targetFile.split('.').pop().toLowerCase();

    // 1. Gambar
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
        printOutput(`Membuka gambar <b>${targetFile}</b>...`);
        printOutput(`<div style="margin: 10px 0;"><img src="${filePath}" style="max-width: 100%; max-height: 350px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);"></div>`);
    }
    // 2. Video
    else if (['mp4', 'webm', 'ogg'].includes(ext)) {
        printOutput(`Memutar video <b>${targetFile}</b>...`);
        printOutput(`<div style="margin: 10px 0;"><video controls style="max-width: 100%; max-height: 300px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);"><source src="${filePath}"></video></div>`);
    }
    // 3. Audio
    else if (['mp3', 'wav'].includes(ext)) {
        printOutput(`Memutar audio <b>${targetFile}</b>...`);
        printOutput(`<div style="margin: 10px 0;"><audio controls style="width: 100%; max-width: 400px;"><source src="${filePath}"></audio></div>`);
    }
    // 4. PDF
    else if (ext === 'pdf') {
        printOutput(`<span class="success">Membuka PDF '${targetFile}' di Tab Baru...</span>`);
        window.open(filePath, '_blank');
    }
    // 5. File Link / Text (.url / .txt)
    else if (['url', 'txt'].includes(ext)) {
        const linkData = typeof fileData !== "undefined" ? fileData[targetFile] : null;
        
        if (linkData && (linkData.startsWith("http://") || linkData.startsWith("https://"))) {
            printOutput(`<span class="success">Membuka link '${linkData}' di Tab Baru...</span>`);
            window.open(linkData.trim(), '_blank');
        } else if (linkData) {
            printOutput(`<div style="margin: 5px 0; color: #e2e8f0;">${linkData}</div>`);
        } else {
            printOutput(`<span class="error">Gagal membaca isi file.</span>`);
        }
    }
    else {
        printOutput(`<span class="error">Format file tidak terdukung.</span>`);
    }
}

function executeCommand(cmd, args, fullInput) {
    const currentData = getCurrentDirectoryData();

    switch (cmd) {
        case "help":
            printOutput(`
<span class="system" style="font-weight:bold;">SYSTEM COMMANDS & UTILITIES:</span>

<span style="color:#64748b; font-size:12px;">-- ACTIVE COMMANDS (AVAILABLE) --</span>
<span style="color:#38bdf8; font-weight:bold;">  ls</span>           : Menampilkan isi folder & penomoran file
<span style="color:#38bdf8; font-weight:bold;">  cd [dir]</span>     : Masuk/keluar folder ('cd link' / 'cd ..')
<span style="color:#38bdf8; font-weight:bold;">  cat [file/no]</span>: Membuka media/link (bisa nama, tanpa ekstensi, atau nomor file)
<span style="color:#38bdf8; font-weight:bold;">  pwd</span>          : Menampilkan posisi direktori aktif
<span style="color:#38bdf8; font-weight:bold;">  clear</span>        : Membersihkan layar terminal
<span style="color:#38bdf8; font-weight:bold;">  logout</span>       : Keluar dari sesi user aktif

<span style="color:#64748b; font-size:12px;">-- SYSTEM RESTRICTED (REQUIRES ROOT / ELEVATED PRIVILEGES) --</span>
<span style="color:#64748b;">  systemctl</span>    : Status layanan & daemon background
<span style="color:#64748b;">  docker</span>       : Monitoring container instance
<span style="color:#64748b;">  top / htop</span>   : Monitoring penggunaan CPU & RAM real-time
<span style="color:#64748b;">  netstat</span>      : Analisis koneksi jaringan & port aktif
<span style="color:#64748b;">  ping [host]</span>  : Cek responsivitas latensi server
<span style="color:#64748b;">  chmod / chown</span>: Konfigurasi hak akses direktori & file
<span style="color:#64748b;">  df</span>           : Penggunaan ruang penyimpanan disk system
<span style="color:#64748b;">  uptime</span>       : Durasi berjalan dan beban sistem
`);
            break;

        case "ls":
            if (currentPath.length === 0) {
                let dirs = Object.keys(currentData || {});
                if (dirs.length === 0) {
                    printOutput("Server kosong. Jalankan update_dir.bat dulu.");
                } else {
                    printOutput(dirs.map(d => `<span class="directory">[DIR] ${d}/</span>`).join("   "));
                }
            } else {
                if (Array.isArray(currentData) && currentData.length > 0) {
                    const formattedFiles = currentData.map((f, index) => {
                        return `<span style="color:#64748b;">[${index + 1}]</span> <span class="file">${f}</span>`;
                    });
                    printOutput(formattedFiles.join("   "));
                } else {
                    printOutput("Folder kosong.");
                }
            }
            break;

        case "cd":
            if (args.length === 0 || args[0] === "~") {
                currentPath = [];
            } else if (args[0] === "..") {
                if (currentPath.length > 0) currentPath.pop();
            } else {
                const target = args[0].replace(/\/$/, "");
                if (currentPath.length === 0) {
                    if (currentData && currentData[target]) {
                        currentPath.push(target);
                    } else {
                        printOutput(`<span class="error">cd: folder '${target}' tidak ditemukan.</span>`);
                    }
                } else {
                    printOutput(`<span class="error">cd: direktori bertingkat belum didukung. Ketik 'cd ..' terlebih dahulu.</span>`);
                }
            }
            updatePrompt();
            break;

        case "cat":
            if (args.length === 0) {
                printOutput(`<span class="error">Gunakan: cat [nama_file / no_file] (Contoh: 'cat 1' atau 'cat cv')</span>`);
            } else {
                openFileReal(args[0]);
            }
            break;

        case "pwd":
            printOutput(`/home/guest${currentPath.length ? '/' + currentPath.join('/') : ''}`);
            break;

        case "clear":
            document.getElementById("output").innerHTML = "";
            break;

        case "logout":
            currentUser = null;
            currentPath = [];
            document.getElementById("output").innerHTML = "";
            printOutput(`<span class="system">Logged out successfully.</span>\n`);
            updatePrompt();
            break;

        // --- HANDLER COMMAND DUMMY / RESTRICTED ---
        case "systemctl":
        case "docker":
        case "top":
        case "htop":
        case "chmod":
        case "chown":
            printOutput(`<span class="error">Access denied: User '${currentUser}' does not have root privileges to execute sys-admin commands.</span>`);
            break;

        case "netstat":
        case "df":
        case "uptime":
            printOutput(`<span class="error">Operation restricted: Container sandbox environment active.</span>`);
            break;

        case "ping":
            if (args.length === 0) {
                printOutput(`<span class="error">Usage: ping [hostname/ip]</span>`);
            } else {
                const host = args[0];
                printOutput(`PING ${host} (127.0.0.1) 56(84) bytes of data.`);
                printOutput(`64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.035 ms`);
                printOutput(`64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms`);
                printOutput(`<span class="system">--- ${host} ping statistics ---</span>`);
                printOutput(`2 packets transmitted, 2 received, 0% packet loss, time 1002ms`);
            }
            break;

        case "tab_key":
            autoComplete();
            break;

        default:
            printOutput(`<span class="error">Command '${cmd}' not found. Ketik 'help' untuk daftar perintah.</span>`);
            break;
    }
}

function sendQuickCmd(type) {
    if (type === 'LS') {
        processInput('ls');
    } else if (type === 'CLEAR') {
        processInput('clear');
    } else if (type === 'TAB') {
        autoComplete();
    }
}

function autoComplete() {
    const cliInput = document.getElementById("cli-input");
    const val = cliInput.value;
    const parts = val.split(/\s+/);
    const currentData = getCurrentDirectoryData();

    if (parts.length === 1) {
        const cmds = ["ls", "cd", "cat", "pwd", "clear", "logout", "help", "ping", "systemctl", "docker"];
        const match = cmds.find(c => c.startsWith(parts[0]));
        if (match) cliInput.value = match + " ";
    } else if (parts.length === 2 && (parts[0] === "cd" || parts[0] === "cat")) {
        let options = [];
        if (currentPath.length === 0) {
            options = Object.keys(currentData || {});
        } else {
            options = Array.isArray(currentData) ? currentData : [];
        }
        const match = options.find(o => o.startsWith(parts[1]));
        if (match) cliInput.value = `${parts[0]} ${match}`;
    }
}
