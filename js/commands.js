// Struktur File System Server Pribadi Lengkap Media
const fileSystem = {
    "dokumen": {
        type: "dir",
        content: {
            "catatan.txt": { type: "file", fileType: "text", content: "Selamat datang di server pribadi! Jangan lupa backup database bulanan." },
            "resume.txt": { type: "file", fileType: "text", content: "IT Support & System Administrator Specialist." }
        }
    },
    "foto": {
        type: "dir",
        content: {
            "profile.png": { type: "file", fileType: "image", url: "https://via.placeholder.com/600x400/161b22/58a6ff?text=Foto+Profile+Admin" },
            "wallpaper.jpg": { type: "file", fileType: "image", url: "https://via.placeholder.com/800x450/21262d/3fb950?text=Wallpaper+Server" }
        }
    },
    "video": {
        type: "dir",
        content: {
            "demo.mp4": { type: "file", fileType: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
        }
    },
    "musik": {
        type: "dir",
        content: {
            "chill.mp3": { type: "file", fileType: "audio", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }
        }
    },
    "pdf": {
        type: "dir",
        content: {
            "sop_server.pdf": { type: "file", fileType: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
        }
    },
    "links": {
        type: "dir",
        content: {
            "kabarbatam.url": { type: "file", fileType: "url", url: "https://kabarbatam.com" },
            "github.url": { type: "file", fileType: "url", url: "https://github.com" }
        }
    }
};

// Data Akun Login (User & Password)
const USERS = {
    "su": "admin123",      // User superuser / admin
    "guest": "guest123"    // User guest biasa
};