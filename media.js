// /home/media.js (Simpan dlm satu file ini bae biar gampang diatur)
const mediaVault = {
    "video": {
        type: "youtube",
        title: "PORTFOLIO REEL // SHOWCASE",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Tinggal ganti ID/link embed youtube lu
    },
    "photo": {
        type: "image",
        title: "SYSTEM ARCHITECTURE SCHEMATIC",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c" // Tinggal ganti link foto
    },
    "audio": {
        type: "mp3",
        title: "LO-FI SYSTEM AMBIENCE // 24-7 STREAM",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Tinggal ganti link MP3
    },
    "document": {
        type: "pdf",
        title: "RESUME // CURRICULUM VITAE (PDF)",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Tinggal ganti link PDF
    },
    "links": {
        type: "weblinks",
        title: "EXTERNAL NETWORKS & REPOSITORIES",
        items: [
            { name: "Kabar Batam Portal", url: "#" },
            { name: "Kutipan News", url: "#" },
            { name: "GitHub Repository", url: "https://github.com/#" }
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
    output += `    \x1b[1;37m[04]\x1b[0m \x1b[1;33mpdf\x1b[0m       : ${mediaVault.document.title}\n`;
    output += `    \x1b[1;37m[05]\x1b[0m \x1b[1;35mlinks\x1b[0m     : ${mediaVault.links.title}\n\n`;

    output += `\x1b[90m----------------------------------------------------------------------\x1b[0m\n`;
    output += `\x1b[1;32m[SYSTEM NOTE]:\x1b[0m Ketik misal \x1b[1;36mcat video\x1b[0m atau \x1b[1;36mcat links\x1b[0m buat eksekusi.\n`;

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
        contentHtml = `<div class="media-audio-wrapper"><audio controls autoplay><source src="${data.url}" type="audio/mpeg">Browser lu gak support audio player.</audio></div>`;
    } else if (data.type === "pdf") {
        contentHtml = `
            <div class="media-pdf-wrapper">
                <p style="margin-bottom: 10px; font-size: 12px; color: #8b949e;">Document loaded into frame buffer preview:</p>
                <iframe src="${data.url}" width="100%" height="400px" style="border:none; border-radius:4px;"></iframe>
                <div style="margin-top: 8px;"><a href="${data.url}" target="_blank" style="color: #50fa7b; font-size: 11px;">[Open Raw PDF Document in New Tab]</a></div>
            </div>`;
    } else if (data.type === "weblinks") {
        let linksList = data.items.map(item => `<li><a href="${item.url}" target="_blank" style="color: #8be9fd; text-decoration: none;">➔ ${item.name}</a> <span style="color: #6272a4; font-size: 11px;">(${item.url})</span></li>`).join("");
        contentHtml = `<ul style="list-style: none; padding: 5px 10px; line-height: 1.8;">${linksList}</ul>`;
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