// /home/js/terminal.js
document.addEventListener("DOMContentLoaded", () => {
    const outputDiv = document.getElementById("output");
    const commandInput = document.getElementById("command-input");

    // State login terminal
    let isLoggedIn = false;
    let authStep = "user"; // "user", "pass", atau "active"
    let tempUser = "";

    const commands = {
        help: () => renderHelp(),
        ls: () => renderLs(),
        bio: () => window.getBioOutput ? window.getBioOutput() : "[ERROR]: bio module not loaded.",
        1: () => window.getBioOutput ? window.getBioOutput() : "[ERROR]: bio module not loaded.",
        skills: () => window.getSkillsOutput ? window.getSkillsOutput() : "[ERROR]: skills module not loaded.",
        2: () => window.getSkillsOutput ? window.getSkillsOutput() : "[ERROR]: skills module not loaded.",
        experience: () => window.getExperienceOutput ? window.getExperienceOutput() : "[ERROR]: experience module not loaded.",
        3: () => window.getExperienceOutput ? window.getExperienceOutput() : "[ERROR]: experience module not loaded.",
        projects: () => window.getProjectsOutput ? window.getProjectsOutput() : "[ERROR]: projects module not loaded.",
        project: () => window.getProjectsOutput ? window.getProjectsOutput() : "[ERROR]: projects module not loaded.",
        4: () => window.getProjectsOutput ? window.getProjectsOutput() : "[ERROR]: projects module not loaded.",
        contact: () => window.getContactOutput ? window.getContactOutput() : "[ERROR]: contact module not loaded.",
        5: () => window.getContactOutput ? window.getContactOutput() : "[ERROR]: contact module not loaded.",
        
        media: () => window.getMediaListOutput ? window.getMediaListOutput() : "[ERROR]: media module not loaded.",
        6: () => window.getMediaListOutput ? window.getMediaListOutput() : "[ERROR]: media module not loaded.",
        video: () => handleMediaCommand("video"),
        photo: () => handleMediaCommand("photo"),
        audio: () => handleMediaCommand("audio"),
        pdf: () => handleMediaCommand("pdf"),
        links: () => handleMediaCommand("links"),

        clear: () => { outputDiv.innerHTML = ""; return ""; },
        logout: () => {
            isLoggedIn = false;
            authStep = "user";
            tempUser = "";
            document.querySelector(".prompt").textContent = "login:";
            return "\n\x1b[1;33m[LOGOUT]: Sesi diakhiri. Silakan login kembali.\x1b[0m\nUser: ";
        }
    };

    function renderHelp() {
        return `
\x1b[1;32mSYSTEM COMMANDS & UTILITIES:\x1b[0m

  \x1b[1;36mls\x1b[0m             : Menampilkan isi folder & penomoran
  \x1b[1;36mmedia\x1b[0m          : External asset vault (video, photo, audio, pdf, links)
  \x1b[1;36mcat [file/no]\x1b[0m  : Membuka file atau media (cth: 'cat bio', 'cat video', atau 'cat 1')
  \x1b[1;36mclear\x1b[0m          : Membersihkan layar terminal
  \x1b[1;31mlogout\x1b[0m         : Keluar dari sesi user aktif

\x1b[90mTip: Gunakan shortcut langsung misal ketik 'video', 'photo', 'audio', 'pdf', 'links'.\x1b[0m
`;
    }

    function renderLs() {
        return `
\x1b[1;32mINDEX  FILENAME     DESCRIPTION\x1b[0m
----------------------------------------------------------------------
 [1]   bio          System ident, core DNA & offscreen habits
 [2]   skills       Tech stack, infrastructure & capabilities
 [3]   experience   Career trajectory & heavy industry battle scars
 [4]   projects     Notable platforms, archives & automated pipelines
 [5]   contact      Secure comms & direct transmission gateway
 [6]   media        External asset vault (video, photo, audio, pdf, links)
----------------------------------------------------------------------
`;
    }

    function handleMediaCommand(type) {
        if (window.getMediaElement) {
            outputDiv.innerHTML += ansiToHtml(`\n\x1b[1;33m[MOUNTING]:\x1b[0m Reading asset sector -> \x1b[1;36m${type}\x1b[0m\n`);
            const el = window.getMediaElement(type);
            if (el) outputDiv.appendChild(el);
            outputDiv.scrollTop = outputDiv.scrollHeight;
            return "";
        }
        return "\x1b[1;31m[ERROR]: Media module missing.\x1b[0m\n";
    }

    function ansiToHtml(text) {
        if (!text) return "";
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\x1b\[1;32m/g, '<span class="ansi-green-bold">')
            .replace(/\x1b\[1;36m/g, '<span class="ansi-cyan-bold">')
            .replace(/\x1b\[1;33m/g, '<span class="ansi-yellow-bold">')
            .replace(/\x1b\[1;31m/g, '<span class="ansi-red-bold">')
            .replace(/\x1b\[1;37m/g, '<span class="ansi-white-bold">')
            .replace(/\x1b\[90m/g, '<span class="ansi-gray">')
            .replace(/\x1b\[0;37m/g, '<span class="ansi-white">')
            .replace(/\x1b\[32m/g, '<span class="ansi-green">')
            .replace(/\x1b\[0m/g, '</span>');
    }

    function printBanner() {
        const banner = `
\x1b[1;36mHost:\x1b[0m bangzaki.hub (x86_64)   \x1b[1;36mClient IP:\x1b[0m 158.140.173.118
\x1b[1;36mUptime:\x1b[0m 214 days, 6 hours     \x1b[1;36mCPU Load:\x1b[0m 1.2% (4 Cores)
\x1b[1;36mRAM Usage:\x1b[0m 1.4GB / 8.0GB       \x1b[1;36mDisk Storage:\x1b[0m 42.8GB / 250GB
----------------------------------------------------------------------
Silakan login untuk mengakses server:
User: \x1b[1;32mguest\x1b[0m - pass: \x1b[1;32mguest123\x1b[0m
`;
        outputDiv.innerHTML += ansiToHtml(banner);
        document.querySelector(".prompt").textContent = "user:";
    }

    async function processCommand(rawInput) {
        const trimmed = rawInput.trim();

        // Handle Login Flow jika belum login
        if (!isLoggedIn) {
            if (authStep === "user") {
                outputDiv.innerHTML += `\n<span class="prompt-echo">user:</span> ${escapeHtml(trimmed)}\n`;
                if (trimmed === "guest") {
                    tempUser = trimmed;
                    authStep = "pass";
                    document.querySelector(".prompt").textContent = "pass:";
                } else {
                    outputDiv.innerHTML += ansiToHtml(`\x1b[1;31m[AUTH ERROR]: User tidak ditemukan. Gunakan 'guest'.\x1b[0m\n\nUser: `);
                }
            } else if (authStep === "pass") {
                // Sembunyikan password saat di-echo di layar
                outputDiv.innerHTML += `\n<span class="prompt-echo">pass:</span> *****\n`;
                if (tempUser === "guest" && trimmed === "guest123") {
                    isLoggedIn = true;
                    authStep = "active";
                    document.querySelector(".prompt").textContent = "guest@bangzaki.hub:~#";
                    const successMsg = `
\x1b[1;32mAccess granted! Selamat datang di bangzaki.hub.\x1b[0m
Ketik \x1b[1;36mhelp\x1b[0m untuk panduan perintah.
`;
                    outputDiv.innerHTML += ansiToHtml(successMsg);
                } else {
                    outputDiv.innerHTML += ansiToHtml(`\x1b[1;31m[AUTH ERROR]: Password salah. Coba lagi.\x1b[0m\n\nUser: `);
                    authStep = "user";
                    tempUser = "";
                    document.querySelector(".prompt").textContent = "user:";
                }
            }
            outputDiv.scrollTop = outputDiv.scrollHeight;
            return;
        }

        // Kalau sudah login, jalankan command normal
        if (!trimmed) return;
        outputDiv.innerHTML += `\n<span class="prompt-echo">guest@bangzaki.hub:~#</span> ${escapeHtml(trimmed)}\n`;

        const parts = trimmed.split(" ");
        let cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (cmd === "cat" && args.length > 0) {
            cmd = args[0].toLowerCase();
        }

        if (commands[cmd]) {
            const res = commands[cmd]();
            if (res) outputDiv.innerHTML += ansiToHtml(res);
        } else {
            outputDiv.innerHTML += ansiToHtml(`\x1b[1;31m[ERROR]: command not found: ${trimmed}. Type 'help' for instructions.\x1b[0m\n`);
        }

        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    function escapeHtml(string) {
        return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    commandInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            const val = commandInput.value;
            commandInput.value = "";
            await processCommand(val);
        }
    });       

    document.addEventListener("click", () => {
        commandInput.focus();
    });

    printBanner();
    commandInput.focus();
});