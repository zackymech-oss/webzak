// /home/skills.js
const skillsData = {
    title: "SYSTEM CORE & CAPABILITIES MATRIX",
    subtitle: "Real-World Experience, Stack & Digital Munitions",
    categories: [
        {
            section: "01 // SERVER INFRA & SYSADMIN",
            items: [
                { name: "Linux Administration", level: 95, bar: "[████████████████████] 95%", desc: "Debian, Ubuntu, AlmaLinux, Alpine, bare-metal wrangling" },
                { name: "Web & Proxy Servers", level: 90, bar: "[███████████████████░] 90%", desc: "Nginx, Apache, LiteSpeed, Cloudflare Tunnels, load management" },
                { name: "Containers & Storage", level: 85, bar: "[██████████████████░░] 85%", desc: "Docker, LXC/KVM, Cloudflare R2 object storage offloading" }
            ]
        },
        {
            section: "02 // BACKEND & DATABASE ENGINEERING",
            items: [
                { name: "Database Tuning & SQL", level: 90, bar: "[███████████████████░] 90%", desc: "MySQL/MariaDB, partitioning, bulk URL rewrites, Python automation" },
                { name: "Full-Stack Scripting", level: 85, bar: "[██████████████████░░] 85%", desc: "Python, PHP, Node.js, JS (no bloated framework rubbish)" },
                { name: "API & Pipeline Pipelines", level: 85, bar: "[██████████████████░░] 85%", desc: "RESTful endpoints, automated media pipelines, webhooks" }
            ]
        },
        {
            section: "03 // MEDIA PIPELINE & DIGITAL ASSETS",
            items: [
                { name: "News Platform Arch", level: 95, bar: "[████████████████████] 95%", desc: "High-traffic press-verified media ops & infrastructure scaling" },
                { name: "Automated Graphics", level: 90, bar: "[███████████████████░] 90%", desc: "Vertical 9:16 generation workflows, real-time social syndication" },
                { name: "Content & E-E-A-T", level: 85, bar: "[██████████████████░░] 85%", desc: "Cyber-journalism headlines, local trending algorithms, media workflows" }
            ]
        },
        {
            section: "04 // PRIVACY, ANDROID & LOW-LEVEL TWEAKS",
            items: [
                { name: "Rootless Android Ops", level: 90, bar: "[███████████████████░] 90%", desc: "Dhizuku device owner, ADB automation, system app pruning" },
                { name: "Privacy Infrastructure", level: 85, bar: "[██████████████████░░] 85%", desc: "Ad-blocking proxies, secure local routing, DNS sinkholes" },
                { name: "Hardcore Field Survival", level: 100, bar: "[████████████████████] 100%", desc: "Indomie reliance, caffeine optimization, zero corporate tolerance" }
            ]
        }
    ]
};

function renderSkills() {
    let output = `\n\x1b[1;32m╔══════════════════════════════════════════════════════════════════════╗\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[1;36m${skillsData.title.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[0;37m${skillsData.subtitle.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m╚══════════════════════════════════════════════════════════════════════╝\x1b[0m\n\n`;

    skillsData.categories.forEach(cat => {
        output += `\x1b[1;33m >> ${cat.section}\x1b[0m\n`;
        cat.items.forEach(item => {
            const coloredBar = item.bar.replace(/█/g, '\x1b[32m█\x1b[0m').replace(/░/g, '\x1b[90m░\x1b[0m');
            output += `    \x1b[1;37m${item.name.padEnd(26, ' ')}\x1b[0m ${coloredBar}\n`;
            output += `    \x1b[90m└─ ${item.desc}\x1b[0m\n`;
        });
        output += `\n`;
    });

    output += `\x1b[90m----------------------------------------------------------------------\x1b[0m\n`;
    output += `\x1b[1;32m[SYSTEM STATUS]: \x1b[0mAll modules loaded. Too tired for slow code. Type \x1b[1;36m'help'\x1b[0m for commands.\n`;
    
    return output;
}

if (typeof window !== 'undefined') {
    window.getSkillsOutput = renderSkills;
}