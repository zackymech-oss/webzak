// /home/projects.js
const projectsData = {
    title: "NOTABLE PROJECTS & INITIATIVES",
    subtitle: "High-Traffic Systems, Legacy Builds & Automated Pipelines",
    projects: [
        {
            id: "01",
            name: "High-Scale Media Infrastructure & Storage",
            status: "ACTIVE // CURRENT",
            desc: "Redesigned and wrangled server architecture for regional news portals. Offloaded massive asset hoards to distributed cloud object storage and wrote custom scripts to bulk-rewrite the database so the servers stopped crying."
        },
        {
            id: "02",
            name: "Social Community & Acquisition Milestone",
            status: "ARCHIVED // ACQUIRED",
            desc: "Built systems and audited spaghetti code for a massive national online community platform boasting millions of active users. Held the backend together until a multinational telco giant bought the whole damn thing out."
        },
        {
            id: "03",
            name: "Automated News Graphic Pipeline",
            status: "ACTIVE // DEPLOYED",
            desc: "Engineered an automated 9:16 vertical graphic generator for real-time social media publishing. Saved the visual editorial crew from doing mind-numbing manual layout work. Fully automated, zero fuss."
        },
        {
            id: "04",
            name: "High-Traffic Experimental & Grey-Area Ecosystems",
            status: "ARCHIVED // LEGACY",
            desc: "Dodgy independent experiments and extreme traffic stress tests back in the wild-west era of Indonesian digital tech (pre-regulation days). Handled insane traffic spikes, heavy server load trickery, and massive automation setups."
        }
    ]
};

function renderProjects() {
    let output = `\n\x1b[1;32m╔══════════════════════════════════════════════════════════════════════╗\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[1;36m${projectsData.title.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[0;37m${projectsData.subtitle.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m╚══════════════════════════════════════════════════════════════════════╝\x1b[0m\n\n`;

    projectsData.projects.forEach(proj => {
        output += `\x1b[1;33m >> [${proj.id}] ${proj.name}\x1b[0m\n`;
        output += `    \x1b[90mStatus: ${proj.status}\x1b[0m\n`;
        output += `    \x1b[0;37m${proj.desc}\x1b[0m\n\n`;
    });

    output += `\x1b[90m----------------------------------------------------------------------\x1b[0m\n`;
    output += `\x1b[1;32m[SYSTEM STATUS]:\x1b[0m Archive logs verified. Type \x1b[1;36m'experience'\x1b[0m for career battle scars.\n`;

    return output;
}

if (typeof window !== 'undefined') {
    window.getProjectsOutput = renderProjects;
}