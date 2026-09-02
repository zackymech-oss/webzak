// /home/js/terminal.js
document.addEventListener("DOMContentLoaded", () => {
    const outputDiv = document.getElementById("output");
    const commandInput = document.getElementById("command-input");

    // Terminal authentication state
    let isLoggedIn = false;
    let authStep = "user"; // "user", "pass", or "active"
    let tempUser = "";

    // Anti-Cheat & Punishment System variables
    let spamCounter = 0;
    let lastCommandTime = Date.now();
    let strikeCount = 0;

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

        // Traps & Pranks
        sudo: (args) => handleSudoCommand(args),
        "sudo su": () => handleSudoCommand(["su"]),
        rm: (args) => handleRmCommand(args),
        hacker: () => handleHackerCommand(),
        hack: () => handleHackerCommand(),
        su: () => handleSuCommand(),
        reboot: () => handleRebootCommand(),
        shutdown: () => handleRebootCommand(),
        "cat /etc/passwd": () => handlePasswdCommand(),
        nano: () => handleEditorCommand("nano"),
        vim: () => handleEditorCommand("vim"),

        // Extra Snooping & Boredom Commands
        history: () => "\n" + Array.from({length: 15}, () => `   sudo rm -rf /\n   cat /etc/shadow\n   curl cheat.sh/excuses\n   exit`).join("") + "\n[INFO]: History is full of your garbage commands. Get a hobby.\n",
        whoami: () => "\n\x1b[1;33mguest@jobless-loser-pc\x1b[00m (Translation: A lazy bum with zero life goals).\n",
        uptime: () => "\n 13:55:11 up 214 days,  6:12,  1 user,  load average: 0.00, 0.01, 0.05\n[INFO]: This server has stayed up longer than any relationship you'll ever have.\n",
        date: () => "\nWed Sep  2 13:55:11 WIB 2026\n[INFO]: Time is ticking away while you sit here doing absolutely nothing. Pathetic.\n",
        uname: () => "\nLinux bangzaki-hub 6.8.0-custom-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux\n",
        free: () => "\n             total        used        free      shared  buff/cache   available\nMem:          8192MB      1420MB      6100MB        12MB       672MB      6500MB\n[INFO]: RAM is in way better shape than your pathetic lifestyle.\n",
        df: () => "\nFilesystem     1K-blocks      Used Available Use% Mounted on\n/dev/nvme0n1p2 262144000  44850120 217293880  18% /\n[INFO]: Plenty of disk space left to store all your life regrets.\n",
        ps: () => "\n  PID TTY          TIME CMD\n 1337 tty1     00:00:00 bash\n 4209 tty1     00:02:14 staring_at_screen_blankly\n 8888 tty1     00:05:00 questioning_life_choices\n",
        top: () => "\nTasks: 3 total, 1 running, 2 sleeping. CPU: 0.1% usr. Mem: 17% used.\n[ERROR]: You are not root. You cannot kill your crushing boredom using top.\n",
        netstat: () => "\nActive Internet connections (w/ servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State       \ntcp        0      0 127.0.0.1:80            127.0.0.1:54321         ESTABLISHED \n[INFO]: Connection active. Nobody is texting you. Go away.\n",
        ping: (args) => `\nPING ${args && args.length ? args[0] : "8.8.8.8"} (8.8.8.8) 56(84) bytes of data.\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=13.8 ms\n[INFO]: Ping successful. Too bad your life connection is permanently timed out.\n`,
        curl: () => "\ncurl: (6) Could not resolve host: nobodycares.com. Stop trying to fetch useless crap.\n",
        wget: () => "\n--2026-09-02 13:55:11--  (try) => Failed: Connection rejected by the entire universe.\n",
        python: () => "\nPython 3.12.3 (main, Apr  9 2024, 08:09:18) [GCC 13.2.0] on linux\nType \"help()\", \"copyright()\" or \"exit()\" to escape your miserable existence.\n",
        node: () => "\nWelcome to Node.js v22.2.0.\nType \".exit\" because you don't even know how to write a loop.\n",
        lsusb: () => "\nBus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub\nBus 002 Device 004: ID 046d:c077 Logitech, Inc. M105 Mouse (Used strictly for lazy scrolling)\n",
        lspci: () => "\n00:02.0 VGA compatible controller: Intel Corporation Iris Plus Graphics (G1)\n",
        env: () => "\nUSER=guest\nHOME=/home/guest\nSHELL=/bin/bash\nMOTIVE=Pure, unadulterated laziness\n",
        alias: () => "\nalias rm='rm -i (just kidding, it deletes your remaining dignity)'\nalias cls='clear'\nalias work='go_touch_grass'\n",

        clear: () => { outputDiv.innerHTML = ""; return ""; },
        logout: () => {
            isLoggedIn = false;
            authStep = "user";
            tempUser = "";
            document.querySelector(".prompt").textContent = "login:";
            return "\n\x1b[1;33m[LOGOUT]: Session terminated. Piss off.\x1b[00m\nUser: ";
        }
    };

    function renderHelp() {
        return `
\x1b[1;32mSYSTEM COMMANDS & UTILITIES:\x1b[00m

  \x1b[1;36mls\x1b[00m             : Display directory contents & indexing numbers
  \x1b[1;36mmedia\x1b[00m           : External asset vault (video, photo, audio, pdf, links)
  \x1b[1;36mcat [file/no]\x1b[00m   : Open file or media (e.g., 'cat bio', 'cat video', or 'cat 1')
  \x1b[1;36mclear\x1b[00m           : Clear terminal screen
  \x1b[1;31mlogout\x1b[00m          : Terminate active user session

\x1b[90mTip: Stop whining, quit being lazy, and type 'video', 'photo', 'audio', 'pdf', or 'links'.\x1b[00m
`;
    }

    function renderLs() {
        return `
\x1b[1;32mINDEX  FILENAME     DESCRIPTION\x1b[00m
----------------------------------------------------------------------
  [1]   bio         System ident, core DNA & offscreen habits
  [2]   skills      Tech stack, infrastructure & capabilities
  [3]   experience  Career trajectory & heavy industry battle scars
  [4]   projects    Notable platforms, archives & automated pipelines
  [5]   contact     Secure comms & direct transmission gateway
  [6]   media       External asset vault (video, photo, audio, pdf, links)
----------------------------------------------------------------------
`;
    }

    function handleMediaCommand(type) {
        if (window.getMediaElement) {
            const el = window.getMediaElement(type);
            if (el) {
                const container = document.createElement("div");
                container.className = "terminal-media-container";

                const header = document.createElement("div");
                header.className = "media-window-header";
                header.innerHTML = `<span>MEDIA BUFFER // ${type.toUpperCase()}</span><span class="close-media" onclick="this.closest('.terminal-media-container').remove()">[X CLOSE]</span>`;

                const body = document.createElement("div");
                body.className = "media-body";
                body.appendChild(el);

                container.appendChild(header);
                container.appendChild(body);

                const outputArea = document.getElementById("output");
                if (outputArea) {
                    outputArea.appendChild(container);
                    outputArea.scrollTop = outputArea.scrollHeight;
                }

                return "\x1b[1;32m[OK]: Fine, media attached. Stop being so needy.\x1b[00m\n";
            }
        }
        return "\x1b[1;31m[ERROR]: Media target not found. Open your lazy eyes.\x1b[00m\n";
    }

    // Punishment Logic Functions
    function checkPunishment(cmd) {
        const now = Date.now();
        if (now - lastCommandTime < 400) {
            spamCounter++;
        } else {
            spamCounter = 0;
        }
        lastCommandTime = now;

        if (spamCounter > 4) {
            triggerForceClose("BOT MODE DETECTED: Are you a machine or just a hyperactive idiot? Go take a nap.");
            return true;
        }

        if (cmd.startsWith("sudo") || cmd.startsWith("rm") || cmd.startsWith("hack")) {
            strikeCount++;
            if (strikeCount >= 3) {
                triggerPopup("WARNING: CALM DOWN, CLOWN!", "You've tried pulling the exact same dumb stunt 3 times. Use your brain instead of spamming garbage.");
                strikeCount = 0;
                return true;
            }
        }
        return false;
    }

    function triggerPopup(title, message) {
        const existing = document.getElementById("terminal-popup-modal");
        if (existing) existing.remove();

        const modal = document.createElement("div");
        modal.id = "terminal-popup-modal";
        modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);display:flex;justify-content:center;align-items:center;z-index:9999;";
        modal.innerHTML = `
            <div style="background:#111;border:2px solid #ff3333;padding:25px;width:400px;color:#fff;font-family:monospace;box-shadow:0 0 20px rgba(255,0,0,0.5);">
                <h3 style="color:#ff3333;margin-top:0;">[!] ${title}</h3>
                <p style="color:#ccc;font-size:14px;">${message}</p>
                <button onclick="window.location.href='https://www.google.com/search?q=clown+face+meme'" style="background:#ff3333;color:#fff;border:none;padding:8px 15px;cursor:pointer;font-weight:bold;width:100%;">CLOSE (I GIVE UP)</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function triggerForceClose(reason) {
        outputDiv.innerHTML += `\n\x1b[1;31m[CRITICAL]: ${reason}\x1b[00m\n`;
        commandInput.disabled = true;
        
        setTimeout(() => {
            document.body.innerHTML = `
                <div style="background:#000;color:#ff3333;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:monospace;text-align:center;padding:20px;">
                    <h1 style="font-size:3rem;margin-bottom:10px;">SYSTEM LOCKED</h1>
                    <p style="color:#fff;font-size:1.2rem;">${reason}</p>
                    <p style="color:#666;margin-top:20px;">Refreshing session in 3 seconds because you can't behave...</p>
                </div>
            `;
        }, 1000);

        setTimeout(() => {
            window.location.reload();
        }, 4000);
    }

    // Trap Handlers (Lazy & Rude English)
    function handleSudoCommand(args) {
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[0;33m[*] Authenticating your pathetic existence...\x1b[00m\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 600);
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[1;31m[CRITICAL ERROR]: Unauthorized. You ain't root, buddy.\x1b[00m\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 1300);
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[1;32m\n[!] LAZINESS DETECTED: Congrats, you're officially a jobless bum typing sudo like a clown. Go touch grass.\x1b[00m\n\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 2000);
        return "\n\x1b[1;31m[!] ROOT PRIVILEGES DENIED FOR: " + (args ? args.join(" ") : "root") + "\x1b[00m";
    }

    function handleRmCommand(args) {
        const target = args && args.length > 0 ? args.join(" ") : "everything";
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[0;33m[SYS] Nuking nothing because you lack any actual power...\x1b[00m\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 500);
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[1;31m[PANIC] Your last remaining brain cells just crashed.\x1b[00m\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 1200);
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[1;32m\n[LOL] Relax, nothing broke. But seriously, trying to delete stuff? The ultimate waste of oxygen award goes to you.\x1b[00m\n\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 2000);
        return "\n\x1b[1;31m[WARNING] Recursive delete failed on: " + target + "\x1b[00m";
    }

    function handleHackerCommand() {
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[0;32mBypassing imaginary firewall... Staring blankly at screen like a zombie...\x1b[00m\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 500);
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[1;33m[SUCCESS] Downloaded a grand total of zero useful bytes.\x1b[00m\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 1200);
        setTimeout(() => { outputDiv.innerHTML += ansiToHtml("\x1b[1;35m\n[!] ACHIEVEMENT UNLOCKED: 'Delusional Script Kiddie'. Stop watching trash hacker movies and go do your laundry.\x1b[00m\n\n"); outputDiv.scrollTop = outputDiv.scrollHeight; }, 1800);
        return "\n\x1b[1;36m[ACCESS] Initializing Hollywood-tier cringe sequence...\x1b[00m";
    }

    function handleSuCommand() {
        return "\n\x1b[1;31mPassword? LOL, keep dreaming. There's only one password here and it's called 'get a job'. Try again, clown.\x1b[00m\n";
    }

    function handleRebootCommand() {
        return "\n\x1b[0;33m[SYSTEM] Shutdown sequence initiated... Just kidding, the server is too lazy to die. Unlike your social life.\x1b[00m\n";
    }

    function handlePasswdCommand() {
        return `
root:x:0:0:root:/root:/bin/bash
bangzaki:x:1000:1000:Server Overlord & Professional Sufferer,,,
guest:x:666:666:Lazy bum typing random cat commands:/home/guest:/bin/false
`;
    }

    function handleEditorCommand(editor) {
        return `\n\x1b[1;31m[ERROR] ${editor} not found. Or maybe your fingers are just too clumsy. Use Notepad or go to sleep.\x1b[00m\n`;
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
            .replace(/\x1b\[00m/g, '</span>')
            .replace(/\x1b\[0m/g, '</span>');
    }

    function printBanner() {
        const banner = `
\x1b[1;36mHost:\x1b[00m bangzaki.hub (x86_64-pc-linux-gnu)   \x1b[1;36mClient IP:\x1b[00m 158.140.173.118
\x1b[1;36mUptime:\x1b[00m 214 days, 6 hours     \x1b[1;36mCPU Load:\x1b[00m 1.2% (4 Cores)
\x1b[1;36mRAM Usage:\x1b[00m 1.4GB / 8.0GB       \x1b[1;36mDisk Storage:\x1b[00m 42.8GB / 250GB
----------------------------------------------------------------------
 \x1b[1;33mSTATUS:\x1b[00m Systems nominal, stop wasting my time.
 \x1b[1;33mINFO:\x1b[00m Type \x1b[1;32mhelp\x1b[00m if you're too blind to read.
 \x1b[1;31mNOTE:\x1b[00m What are you even doing here? Is your life 
         that dead empty, or do you just love staring at 
         blinking text because nobody texts you back?
----------------------------------------------------------------------
Wanna try? Use this:
User: \x1b[1;32mguest\x1b[00m - pass: \x1b[1;32mguest123\x1b[00m
`;
        outputDiv.innerHTML += ansiToHtml(banner);
        document.querySelector(".prompt").textContent = "user:";
    }

    async function processCommand(rawInput) {
        const trimmed = rawInput.trim();

        if (!isLoggedIn) {
            if (authStep === "user") {
                outputDiv.innerHTML += `\n<span class="prompt-echo">user:</span> ${escapeHtml(trimmed)}\n`;
                if (trimmed === "guest") {
                    tempUser = trimmed;
                    authStep = "pass";
                    document.querySelector(".prompt").textContent = "pass:";
                } else {
                    outputDiv.innerHTML += ansiToHtml(`\x1b[1;31m[AUTH ERROR]: Who even are you? Type 'guest'.\x1b[00m\n\nUser: `);
                }
            } else if (authStep === "pass") {
                outputDiv.innerHTML += `\n<span class="prompt-echo">pass:</span> *****\n`;
                if (tempUser === "guest" && trimmed === "guest123") {
                    isLoggedIn = true;
                    authStep = "active";
                    document.querySelector(".prompt").textContent = "guest@bangzaki.hub:~#";
                    const successMsg = `
\x1b[1;32mAccess granted. Try not to break anything, lazy bones.\x1b[00m
`;
                    outputDiv.innerHTML += ansiToHtml(successMsg);
                } else {
                    outputDiv.innerHTML += ansiToHtml(`\x1b[1;31m[AUTH ERROR]: Wrong password. Try using your brain for once.\x1b[00m\n\nUser: `);
                    authStep = "user";
                    tempUser = "";
                    document.querySelector(".prompt").textContent = "user:";
                }
            }
            outputDiv.scrollTop = outputDiv.scrollHeight;
            return;
        }

        if (!trimmed) return;

        // Cek sistem hukuman sebelum command diproses
        if (checkPunishment(trimmed)) return;

        outputDiv.innerHTML += `\n<span class="prompt-echo">guest@bangzaki.hub:~#</span> ${escapeHtml(trimmed)}\n`;

        const parts = trimmed.split(" ");
        let cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (cmd === "cat" && args.length > 0) {
            cmd = args[0].toLowerCase();
            const subArgs = args.slice(1);
            if (commands[cmd]) {
                const res = typeof commands[cmd] === "function" ? commands[cmd](subArgs) : commands[cmd];
                if (res) outputDiv.innerHTML += ansiToHtml(res);
            } else {
                outputDiv.innerHTML += ansiToHtml(`\x1b[1;31m[ERROR]: file not found: ${cmd}. Learn how to spell.\x1b[00m\n`);
            }
        } else if (commands[cmd]) {
            const res = typeof commands[cmd] === "function" ? commands[cmd](args) : commands[cmd];
            if (res) outputDiv.innerHTML += ansiToHtml(res);
        } else {
            outputDiv.innerHTML += ansiToHtml(`\x1b[1;31m[ERROR]: command not found: ${trimmed}. Type 'help' if you're completely clueless.\x1b[00m\n`);
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