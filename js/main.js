document.addEventListener("DOMContentLoaded", async () => {
    const cliInput = document.getElementById("cli-input");
    const terminalBody = document.getElementById("terminal-body");

    // Ambil IP User Otomatis
    let userIP = "127.0.0.1";
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        userIP = data.ip;
    } catch (e) {
        userIP = "192.168.1.100";
    }

    const welcomeBanner = `
<div class="ascii-banner">
 ██╗██╗██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
 ██║██║██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
 ██║██║██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
 ╚═╝╚═╝╚═╝██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
 ██╗██╗██╗███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚═╝╚═╝╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
</div>
<div class="sys-info">
    <div class="sys-item"><span class="sys-label">Host:</span> <span class="sys-val">bangzaki.hub (x86_64)</span></div>
    <div class="sys-item"><span class="sys-label">Client IP:</span> <span class="sys-val">${userIP}</span></div>
    <div class="sys-item"><span class="sys-label">Uptime:</span> <span class="sys-val">214 days, 6 hours</span></div>
    <div class="sys-item"><span class="sys-label">CPU Load:</span> <span class="sys-val">1.2% (4 Cores)</span></div>
    <div class="sys-item"><span class="sys-label">RAM Usage:</span> <span class="sys-val">1.4GB / 8.0GB</span></div>
    <div class="sys-item"><span class="sys-label">Disk Storage:</span> <span class="sys-val">42.8GB / 250GB</span></div>
</div>
------------------------------------------------------------------
Silakan login untuk mengakses server:
User: <span class="success">guest</span> - pass: <span class="success">guest123</span>
`;

    printOutput(welcomeBanner);

    terminalBody.addEventListener("click", () => {
        cliInput.focus();
    });

    cliInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const val = cliInput.value;
            cliInput.value = "";
            processInput(val);
        }
    });
});