// /home/contact.js
const contactData = {
    title: "SECURE COMMS & TRANSMISSION GATEWAY",
    subtitle: "Direct Messaging Interface (Powered by Web3Forms)",
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "33b1daf3-e755-4d85-b340-97714c283b55"
};

function renderContact() {
    let output = `\n\x1b[1;32m╔══════════════════════════════════════════════════════════════════════╗\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[1;36m${contactData.title.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m║\x1b[0m \x1b[0;37m${contactData.subtitle.padEnd(68, ' ')}\x1b[0m \x1b[1;32m║\x1b[0m\n`;
    output += `\x1b[1;32m╚══════════════════════════════════════════════════════════════════════╝\x1b[0m\n\n`;

    output += `\x1b[1;33m >> HOW TO TRANSMIT A MESSAGE:\x1b[0m\n`;
    output += `    Type \x1b[1;36mmail <your_message>\x1b[0m or launch the interactive wizard below.\n`;
    output += `    No corporate forms, no tracking scripts. Straight to the inbox.\n\n`;

    output += `\x1b[1;33m >> NOTE:\x1b[0m Drop your contact info if you expect a reply. I'm no Doctor Strange,\n`;
    output += `    not forcing you, but that's just how the world works, lol.\n\n`;

    output += `\x1b[90m----------------------------------------------------------------------\x1b[0m\n`;
    output += `\x1b[1;32m[SYSTEM STATUS]:\x1b[0m Ready to receive packets. Type \x1b[1;36mmail "Halo bro"\x1b[0m to send.\n`;

    return output;
}

if (typeof window !== 'undefined') {
    window.getContactOutput = renderContact;
    window.contactConfig = contactData;
}