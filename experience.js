// /home/experience.js
const experienceData = {
    title: "PROFESSIONAL EXPERIENCE & CAREER TRAJECTORY",
    subtitle: "Field Operations, Heavy Industry & Digital Infrastructure Wars",
    milestones: [
        {
            id: "01",
            role: "Field Ops & Management Bloodbath",
            period: "Pre-IT Era",
            desc: "Started from the absolute bottom in heavy-ass industries: structural steel construction, energy resources, local mining, general trading, government contracting, and heavy machinery plantation commodities. Climbed the corporate ladder the hard way—field hand, team lead, field auditor, shifting into management roles from admin staff, division lead, all the way to Assistant Manager. Dealt with heavy machinery, ships, logistics, and human headaches before finally walking out to chase tech. Absolute nightmare fuel, but it built some thick skin."
        },
        {
            id: "02",
            role: "Independent Digital Platform Engineering",
            period: "Early Era",
            desc: "Built and ran an independent digital project that blew up way too fast in Indonesia. Ended up choking VPS capacities and staring down a bloody expensive bill for dedicated servers. Pulled the plug myself before things got legally messy because local laws back then were about as useful as a chocolate teapot for that kind of ecosystem."
        },
        {
            id: "03",
            role: "National Media Infrastructure & Core Ops",
            period: "Mid Era",
            desc: "Teamed up with other online greybeards to build and hold together major news and cyber media infrastructure. Kept the backend breathing, stable, and scaling nicely until the platform became one of the heavy hitters on a national scale. Bloody tiring, but it worked."
        },
        {
            id: "04",
            role: "Community Platform Development & Acquisition Exit",
            period: "Milestone",
            desc: "Acted as Core Developer and System Auditor for a massive local social community platform trying to punch above its weight against Facebook, Twitter, and MySpace. Got the whole thing to peak popularity in Indo before a massive multinational telco corporation bought the whole kit and caboodle out."
        },
        {
            id: "05",
            role: "Startup Full-Stack & System Architecture (R.I.P.)",
            period: "Pandemic Era",
            desc: "Hired as Lead Full-Stack Dev and SysAdmin for a business consultant and digital marketing startup. Held the whole tech stack together until COVID-19 smashed everything to pieces and the top brass failed to scrape up any more investor cash. Gone for good."
        },
        {
            id: "06",
            role: "Regional Media & Low-Stress Operations",
            period: "Current",
            desc: "Handling full-stack and server sysadmin duties for a couple of regional news portals. Keeping things lean, automated, and stable without killing myself. Just want quiet operations and peace of mind, frankly."
        }
    ]
};

function renderExperience() {
    let output = `\n\x1b[1;32m╔══════════════════════════════════════════════════════════════════════╗\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[1;36m${experienceData.title.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[0;37m${experienceData.subtitle.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m╚══════════════════════════════════════════════════════════════════════╝\x1b[0m\n\n`;

    experienceData.milestones.forEach(item => {
        output += `\x1b[1;33m >> [${item.id}] ${item.role}\x1b[0m\n`;
        output += `    \x1b[90mTimeline: ${item.period}\x1b[0m\n`;
        output += `    \x1b[0;37m${item.desc}\x1b[0m\n\n`;
    });

    output += `\x1b[90m----------------------------------------------------------------------\x1b[0m\n`;
    output += `\x1b[1;32m[SYSTEM STATUS]:\x1b[0m Battle scars verified. Type \x1b[1;36m'contact'\x1b[0m if you need to holler.\n`;

    return output;
}

if (typeof window !== 'undefined') {
    window.getExperienceOutput = renderExperience;
}