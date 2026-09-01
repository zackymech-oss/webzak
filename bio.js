// /home/bio.js
const bioData = {
    title: "SYSTEM IDENT & PROFILE: BIO",
    subtitle: "Veteran IT System Operator & Infrastructure Core",
    overview: [
        "Bloody hell, another IT veteran down the drain. Been messing with servers,",
        "backend junk, and digital plumbing since 2009. Dragged myself out from",
        "brutal field ops and old-school wild-west web days. Now I just keep things",
        "ticking over without the corporate bollocks, innit."
    ],
    dna: [
        { label: "Hardcore Indomie Loyalist", status: "ONLINE" },
        { label: "Lethal Caffeine Addict", status: "ONLINE" },
        { label: "Nicotine Fiend", status: "ONLINE" },
        { label: "TBDM Noise Fanatic", status: "ACTIVE" }
    ],
    offscreen: [
        "Jugglin' remote server maintenance while trying to run actual brick-and-mortar",
        "offline businesses without losing my mind.",
        "Messing with privacy-first mobile stuff (rootless Android tinkering), staring at",
        "random street views in geo-guessing games, and zoning out to classic horror."
    ]
};

function renderBio() {
    let output = `\n\x1b[1;32m╔══════════════════════════════════════════════════════════════════════╗\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[1;36m${bioData.title.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[0;37m${bioData.subtitle.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m╚══════════════════════════════════════════════════════════════════════╝\x1b[0m\n\n`;

    output += `\x1b[1;33m >> [01] OVERVIEW\x1b[0m\n`;
    bioData.overview.forEach(line => {
        output += `    \x1b[0;37m${line}\x1b[0m\n`;
    });
    output += `\n`;

    output += `\x1b[1;33m >> [02] SYSTEM DNA & HABITS\x1b[0m\n`;
    output += `    \x1b[90mCore Vibe: Pragmatic, self-taught, zero patience for bloated code.\x1b[0m\n`;
    bioData.dna.forEach(item => {
        output += `    \x1b[1;32m[✔]\x1b[0m \x1b[1;37m${item.label.padEnd(30, ' ')}\x1b[0m \x1b[90mStatus: ${item.status}\x1b[0m\n`;
    });
    output += `\n`;

    output += `\x1b[1;33m >> [03] OFF-SCREEN SETUP\x1b[0m\n`;
    bioData.offscreen.forEach(line => {
        output += `    \x1b[0;37m${line}\x1b[0m\n`;
    });
    output += `\n`;

    output += `\x1b[90m----------------------------------------------------------------------\x1b[0m\n`;
    output += `\x1b[1;32m[STATUS]:\x1b[0m Sodding knackered. Type \x1b[1;36m'skills'\x1b[0m if you really must.\n`;

    return output;
}

if (typeof window !== 'undefined') {
    window.getBioOutput = renderBio;
}