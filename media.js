// /home/media.js
const mediaVault = {
    "video": {
        type: "youtube",
        title: "EMERGENCY SANITY DRAIN // 10-HOUR LOOP",
        url: "https://www.youtube.com/embed/j5a0jTc9S10"
    },
    "photo": {
        type: "image",
        title: "HIGH-RES EXISTENTIAL CRISIS SCHEMATIC",
        url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1"
    },
    "audio": {
        type: "mp3",
        title: "MAXIMUM BRAINROT SOUNDWAVE // 24-7 DUMB",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    "document": {
        type: "pdf",
        title: "SURAT IJIN TIDAK GABUT // TAPI BOHONG (PDF)",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    "pdf": {
        type: "pdf",
        title: "SURAT IJIN TIDAK GABUT // TAPI BOHONG (PDF)",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    "links": {
        type: "weblinks",
        title: "EXTERNAL NETWORKS & REPOSITORIES",
        items: [
            { name: "GitHub", url: "https://github.com", desc: "Where you look for inspiration and steal people's code." },
            { name: "Stack Overflow", url: "https://stackoverflow.com", desc: "The holy grail for code monkeys when things blow up." },
            { name: "Arch Linux Wiki", url: "https://wiki.archlinux.org", desc: "The absolute source of truth for hardcore sysadmins." },
            { name: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "Sanest web documentation without the corporate fluff." },
            { name: "Cloudflare", url: "https://www.cloudflare.com", desc: "Keeping your server safe from script-kiddie DDoS attacks." },
            { name: "Pointer Pointer", url: "https://pointerpointer.com", desc: "Wasting your life watching random people point at your cursor." },
            { name: "The Useless Web", url: "https://theuselessweb.com", desc: "Random teleportation to the most pointless corners of the internet." },
            { name: "Bouncing DVD Logo", url: "https://bouncingdvdlogo.com", desc: "Staring blindly waiting for the DVD logo to hit the exact corner." },
            { name: "Cat Bounce", url: "https://cat-bounce.com", desc: "Bouncing digital cats around because why the hell not." },
            { name: "He Man Sing", url: "https://hemanspansand.com", desc: "Looping legendary meme songs until your phone battery dies." }
        ]
    }
};

function renderMediaList() {
    let output = `\n\x1b[1;32m╔══════════════════════════════════════════════════════════════════════╗\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[1;36mEXTERNAL MEDIA VAULT & ASSET STREAMING GATEWAY                     \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[0;37mAccess media assets directly via 'cat <filename>' command             \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m╚══════════════════════════════════════════════════════════════════════╝\x1b[0m\n\n`;

    output += `\x1b[1;33m >> AVAILABLE ASSETS:\x1b[0m\n`;
    output += `    \x1b[1;37m[01]\x1b[0m \x1b[1;36mvideo\x1b[0m     : ${mediaVault.video.title}\n`;
    output += `    \x1b[1;37m[02]\x1b[0m \x1b[1;36mphoto\x1b[0m     : ${mediaVault.photo.title}\n`;
    output += `    \x1b[1;37m[03]\x1b[0m \x1b[1;37maudio\x1b[0m     : ${mediaVault.audio.title}\n`;
    output += `    \x1b[1;37m[04]\x1b[0m \x1b[1;33mdocument\x1b[0m  : ${mediaVault.document.title}\n`;
    output += `    \x1b[1;37m[05]\x1b[0m \x1b[1;35mlinks\x1b[0m     : ${mediaVault.links.title}\n\n`;

    output += `\x1b[90m----------------------------------------------------------------------\x1b[0m\n`;
    output += `\x1b[1;32m[SYSTEM NOTE]:\x1b[0m Type e.g., \x1b[1;36mcat document\x1b[0m or \x1b[1;36mcat links\x1b[0m to execute.\n`;

    return output;
}

function renderMediaElement(key) {
    const data = mediaVault[key];
    if (!data) return null;

    const wrapper = document.createElement("div");
    wrapper.className = "terminal-media-container";

    let contentHtml = "";

    if (data.type === "youtube") {
        let embedUrl = data.url.includes("embed") ? data.url : data.url.replace("watch?v=", "embed/");
        contentHtml = `
            <div class="media-iframe-wrapper">
                <iframe src="${embedUrl}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allowfullscreen></iframe>
            </div>`;
    } else if (data.type === "image") {
        contentHtml = `<div class="media-img-wrapper"><img src="${data.url}" alt="${data.title}"></div>`;
    } else if (data.type === "mp3") {
        contentHtml = `<div class="media-audio-wrapper"><audio controls autoplay><source src="${data.url}" type="audio/mpeg">Your browser doesn't support audio element.</audio></div>`;
    } else if (data.type === "pdf") {
        contentHtml = `
            <div class="media-pdf-wrapper">
                <p style="margin-bottom: 10px; font-size: 12px; color: #8b949e;">Document loaded into frame buffer preview:</p>
                <iframe src="${data.url}" width="100%" height="400px" style="border:none; border-radius:4px;"></iframe>
                <div style="margin-top: 8px;"><a href="${data.url}" target="_blank" style="color: #50fa7b; font-size: 11px;">[Open Raw PDF Document in New Tab]</a></div>
            </div>`;
    } else if (data.type === "weblinks") {
        let linksList = data.items.map(item => `
            <div style="margin-bottom: 12px; padding: 6px 8px; background: rgba(255,255,255,0.03); border-left: 2px solid #8be9fd; border-radius: 0 4px 4px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px;">
                    <a href="${item.url}" target="_blank" style="color: #8be9fd; text-decoration: none; font-weight: bold;">➔ ${item.name}</a>
                    <span style="color: #6272a4; font-size: 10px; word-break: break-all;">${item.url}</span>
                </div>
                <div style="color: #a0aec0; font-size: 11px; margin-top: 4px; line-height: 1.4;">${item.desc}</div>
            </div>`).join("");
        contentHtml = `<div style="padding: 4px 0;">${linksList}</div>`;
    }

    wrapper.innerHTML = `
        <div class="media-window-header">
            <span>MEDIA BUFFER // ${data.title}</span>
            <span class="close-media" onclick="this.parentElement.parentElement.remove()">[X CLOSE]</span>
        </div>
        <div class="media-body">
            ${contentHtml}
        </div>
    `;
    return wrapper;
}

if (typeof window !== 'undefined') {
    window.getMediaListOutput = renderMediaList;
    window.getMediaElement = renderMediaElement;
}