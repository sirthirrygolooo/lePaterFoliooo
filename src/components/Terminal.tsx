import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Command {
    command: string;
    output: string | ((args: string[], privilegeLevel: string) => string); // Mise à jour du type de fonction
    secretRoute?: string;
}

// CONST UTILISATEURS

const ADMIN_USER = "4rsi_root";
const GUEST_USER = "guest";

// --- ASCII ART ---

const ASCII_ART_SET = [
    `⣿⣿⡿⣫⣾⠏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣀⣀⣀⣀⠄⠄⠄⠄⠄⠄
⣿⡇⠱⠉⠁⠄⠄⠄⠄⠄⠄⢀⣀⣤⣶⣶⣿⣿⣿⣿⣿⣿⣿⣦⠄⠄⠄⠄⠄
⣿⡇⠄⠄⠄⠄⠄⢀⣠⣛⡩⣩⣭⡹⣿⣿⣿⣿⠞⣛⣛⣛⡲⣿⡇⠄⠄⠄⠄
⣿⡇⠄⠄⠄⡾⣡⣾⣿⣷⣹⣿⣿⡿⣪⡻⠟⣱⣿⣿⣿⣿⣿⣷⡹⠄⠄⠄⠄
⣿⡇⠄⠄⣼⡇⣿⣻⣿⠟⡛⢿⣿⣾⣿⡇⢰⣍⢻⡿⠛⢿⣿⡭⣿⣷⠄⠄⠄
⣿⣧⣄⡀⣿⡇⣮⣽⣿⣮⣉⣾⣿⣿⣿⣇⡸⣿⣿⣆⠛⣰⣿⣾⡿⣿⠄⠄⠄
⣿⣇⡼⣄⣿⣿⡄⠙⢿⣏⣿⣿⡮⠁⣉⣾⣷⡈⠃⢿⣿⣬⡭⠝⣀⣿⠄⠄⠐
⡆⡇⣹⣿⣿⣿⣿⡿⠓⠛⣉⣉⣉⣉⣙⣛⠓⠾⣟⢿⣿⣿⣿⣿⣿⣿⣿⠇⠄⠙
⠁⡇⣞⣿⡿⠋⠁⠄⠄⠈⠉⠙⠛⠛⠻⠿⠿⠿⣶⣌⠻⣿⣿⣿⣿⣿⢗⢴⣆⢣
⠸⣇⡻⠈⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⢻⣷⡌⢿⣿⣿⣿⢸⠼⣣⣾
⣦⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⠄⠄⠄⠄⠄⠄⠄⠄⠙⠛⠈⣿⡫⡼⢠⣾⣿⣿
⣿⣇⠄⣀⣠⡀⠄⠄⠴⠾⠿⠿⠶⠶⣦⣤⡀⠄⠄⠄⠄⠄⠄⢨⠯⢁⣿⣿⣿⣿
⣿⣿⣦⢒⠤⣅⡶⣶⣶⣾⣿⣿⣿⣷⣶⣮⣍⠢⠄⠄⠄⠄⠄⠐⢠⣾⣿⣿⣿⣿
⣿⣿⣿⣧⡐⠫⣉⡿⣬⡞⢿⣿⢯⠽⣶⡽⢟⣛⢖⣨⣛⠛⢃⣴⣿⣿⣿⣿⣿⣿`,

    `⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣉⡥⠶⢶⣿⣿⣿⣿⣷⣆⠉⠛⠿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡿⢡⡞⠁⠀⠀⠤⠈⠿⠿⠿⠿⣿⠀⢻⣦⡈⠻⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡇⠘⡁⠀⢀⣀⣀⣀⣈⣁⣐⡒⠢⢤⡈⠛⢿⡄⠻⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡇⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⠉⠐⠄⡈⢀⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠇⢠⣿⣿⣿⣿⡿⢿⣿⣿⣿⠁⢈⣿⡄⠀⢀⣀⠸⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠟⣡⣶⣶⣬⣭⣥⣴⠀⣾⣿⣿⣿⣶⣾⣿⣧⠀⣼⣿⣷⣌⡻⢿⣿
⣿⣿⠟⣋⣴⣾⣿⣿⣿⣿⣿⣿⣿⡇⢿⣿⣿⣿⣿⣿⣿⡿⢸⣿⣿⣿⣿⣷⠄⢻
⡏⠰⢾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⢂⣭⣿⣿⣿⣿⣿⠇⠘⠛⠛⢉⣉⣠⣴⣾
⣿⣷⣦⣬⣍⣉⣉⣛⣛⣉⠉⣤⣶⣾⣿⣿⣿⣿⣿⣿⡿⢰⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡘⣿⣿⣿⣿⣿⣿⣿⣿⡇⣼⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⢸⣿⣿⣿⣿⣿⣿⣿⠁⣿⣿⣿⣿⣿⣿⣿⣿⣿
    `,

    `░░░░░░░░░░░░░░░░░█████░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░████░░░░░███░░░░░░░░░░░░░░░
░░░░██████████░░░░░░████████████░░░░░░░░
░░░░█░░░░░░░█░░░░████░░░░░░░░░░██░░░░░░░
░░░██░░░░░░██░░░░░█░░░░░░░░░░░██░░░░░░░░
░░░█░░░░░░░█░░░░░░███░░░░░█████░░░░░░░░░
░░░░█░░░░░░█░░░░░░░░░███████░░░░░░░░░░░░
░░░░░███████░░░░░░░░░░░░░░░█░░░░░░░░░░░░
░░░░░░░░░░░█░░░███████░░░░░█░░░░░░░░░░░░
░░░░░░░░░░░█░░░█░░░░░█░░░░░█░░░░░░░░░░░░
░░░░░░░░░░░█░░░█░░░░░█░░░░█░░░░░░░░░░░░░
░░░░░░░░░░░█░░░█░░░░░█░░░░█░░░░░░░░░░░░░
░░░░░░░░░░░█░░░█░░░░░█░░░░█░░░░░░░░░░░░░
░░░░░░░░░░░█░░░█░░░░░██████░░░░░░░░░░░░░
░░░░░░░░░░░█████░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    `,

    `⢀⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆ 
⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿ 
⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀ 
⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉
    `,

    `────────────────────────
─────────▄▀▀▀▀▀▀▀▄──────
────────█▒▒▒▒▒▒▒▒▒█─────
───────▄▀▒▒▒▒▒▒▒▒▄▀─────
──────█▒▒▒▒▒▒▒▒▒▒█──────
─────▄▀▒▄▄▄▒▄▄▄▒▒█──I───
─────█▒▒─▀─▒─▀─▒▒█──AM──
─────█▒▒▒▒▒▒▒▒▒▒▒█──BACK
────▄▀▒▒▒▀▄▄▄▀▒▒▒▒▀▀▄───
──▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄─
─█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒█─
─▀▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄▀─
───█▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌█───
───▀█▌▌▌▌▌▌▌▌▌▌▌▌▌▌█▀───
─────█▒▒▌▌▌▌▌▌▌▌▌▒▒█────
──────▀▀─────────▀▀─────
    `,
];

const COMMANDS: Command[] = [
    { command: "help", output: "COMMANDS:\n  help - Display this help message.\n  ls - List files in current directory.\n  ls -la - List files with details (HINT).\n  su [user] - Switch user (HINT).\n  cd [directory] - Change directory.\n  whoami - Display current user.\n  cat [file] - Display file content.\n  ping [host] - Test network connectivity (fake).\n  clear - Clear the terminal.\n  exit - Close the terminal session.\n  neofetch - Display system information" },
    { command: "ls", output: "  ./about.txt    ./projects.log    ./skills.list    ./contact.data    ./secrets/" },
    {
        command: "ls -la",
        output: `  total 24\n  drwxr-xr-x 7 ${ADMIN_USER} staff 224 Nov 27 00:00 .\n  drwxr-xr-x 8 ${ADMIN_USER} staff 256 Nov 27 00:00 ..\n  -rw-r--r-- 1 ${ADMIN_USER} staff 575 Nov 27 00:00 about.txt\n  drwx------ 3 ${ADMIN_USER} staff 96 Nov 27 00:00 secrets/`
    },
    { command: "cat secrets/DONT_README.txt", output: "  Hehe" },
    { command: "whoami", output: (args, privilegeLevel) => `  Current User: ${privilegeLevel === 'admin' ? ADMIN_USER : GUEST_USER} (Privilege Level: ${privilegeLevel})` },

    { command: "cat about.txt", output: "  [INFO] Personal portfolio information.\n  [HINT] Try 'cat'ing other files or 'cd'ing into directories." },
    { command: "cat projects.log", output: "  [INFO] List of projects. Use the 'projects' section for details." },
    { command: "cat skills.list", output: "  [INFO] Technical skills details. See the 'competences' section." },
    { command: "cat contact.data", output: "  [INFO] Contact information. Use the 'me contacter' section." },

    { command: "ping", output: (args) => args[1] ? `  Pinging ${args[1]} [127.0.0.1] with 32 bytes of data:\n  Reply from 127.0.0.1: bytes=32 time<1ms TTL=128\n  Reply from 127.0.0.1: bytes=32 time<1ms TTL=128\n  Reply from 0.0.0.0: Destination Host Unreachable\n  Ping statistics for 127.0.0.1:\n      Packets: Sent = 3, Received = 2, Lost = 1 (33% loss),\n  Approximate round trip times in milli-seconds:\n      Minimum = 0ms, Maximum = 0ms, Average = 0ms` : "  Usage: ping [host]" },

    // --- NEOFETCH ---
    {
        command: "neofetch",
        output: () => {
            const randomArtIndex = Math.floor(Math.random() * ASCII_ART_SET.length);
            const asciiArt = ASCII_ART_SET[randomArtIndex];

            const lines = asciiArt.split('\n');
            const data = [
                `User@Host: ${ADMIN_USER}@portfolio`,
                `OS: JS Runtime (React 18+)`,
                `Kernel: 5.15.0-js-x64`,
                `Uptime: ${Math.floor(Math.random() * 50)} days`,
                `Packages: 2200 (npm, yarn, bun)`,
                `Shell: bash (simulated)`,
                `CPU: Untel Core i42 (Virtual)`,
                `GPU: AMD Geforce RTX 6090 Ti`,
                `Theme: Cyber-Terminal`,
                `Lang: TypeScript, Python, Java`,
            ];

            let result = [''];

            for (let i = 0; i < Math.max(lines.length, data.length); i++) {
                const ascii = lines[i] || ' ';
                const info = data[i] || '';
                result.push(`${ascii.padEnd(25)} ${info}`);
            }

            return result.join('\n');
        }
    },

    // --- COMMANDES SECRÈTES / BAIT ---
    {
        command: "cat secrets/beaver.txt",
        output: "  [ACCESS GRANTED] Redirecting to hidden space...\n  Reading 'beaver.txt' reveals deep insights.\n  Navigating to /hidden...",
        secretRoute: "/journal"
    },
    {
        command: "exec .backdoor.sh",
        output: `  [INITIALIZING] ./backdoor.sh -f --force_injection
  [SEARCHING] Target: Session ID... FOUND (0x45B9C)
  [INJECTING] Payload size: 1.2KB | Encryption bypass: AES-128
  [STATUS] Connection established. Channel: /dev/null
  [SUCCESS] Accessing private directory...
  Redirecting to private page...`,
        secretRoute: "/4rsi_about_area"
    },
    {
        command: "sudo su",
        output: "  [ERROR] Not allowed to run sudo.\n  Hint: Maybe try a less privileged command to reveal some secrets."
    },
    {
        command: "chong",
        output: `  [INITIALIZING] ./早上好.sh -f --force_injection
  [SEARCHING] Target: Session ID... FOUND (0x公鸡)
  [INJECTING] Payload size: 1.2KB | Encryption bypass: 呵呵
  [STATUS] Connection established. Channel: /dev/null
  [SUCCESS] Accessing private directory...
  [ERROR] Chinese interception...
  [错误] 黑客攻击进行中
  [性别] 绝密通道
  Redirection to 仪表盘秘密...`,
        secretRoute: "/chin4_l34k"
    },
    {
        command: "sudo su",
        output: "  [ERROR] Not allowed to run sudo.\n  Hint: Maybe try a less privileged command to reveal some secrets."
    },
];

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string[]>([]);
    const [currentDir, setCurrentDir] = useState("~");
    const [privilegeLevel, setPrivilegeLevel] = useState(GUEST_USER);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Focus l'input à l'ouverture - parce que les gens se plaignent ces gros bébés
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    const executeCommand = (commandLine: string) => {
        const fullCommand = commandLine.trim();
        const args = fullCommand.split(/\s+/);
        const cmd = args[0];

        let newOutput = [...output];

        const promptSymbol = privilegeLevel === 'admin' ? '#' : '>';
        newOutput.push(`$ ${currentDir}${promptSymbol} ${commandLine}`);

        // --- GESTION DES COMMANDES SPÉCIALES ET D'ÉTAT ---
        if (cmd === "exit") {
            newOutput.push("  Closing session. Goodbye!");
            setOutput([]); // CLear l'écran
            setPrivilegeLevel(GUEST_USER); // Reset l'utilisateur à guest
            setTimeout(() => { onClose(); }, 500);
            return;
        }

        if (cmd === "clear") {
            setOutput([]);
            return;
        }

        // --- LOGIQUE SU ---
        if (cmd === "su") {
            const targetUser = args[1];
            if (targetUser === ADMIN_USER) {
                setPrivilegeLevel("admin");
                newOutput.push(`  Authentication successful for user '${ADMIN_USER}'.`);
                newOutput.push("  Privilege level elevated to 'admin'.");
            } else if (targetUser === GUEST_USER) {
                setPrivilegeLevel("guest");
                newOutput.push(`  Switched to user '${GUEST_USER}'.`);
                newOutput.push("  Privilege level set to 'guest'.");
            } else if (!targetUser) {
                newOutput.push("  Usage: su [username]");
            } else {
                newOutput.push(`  su: User ${targetUser} does not exist or password is required.`);
            }
            setOutput(newOutput);
            return;
        }

        // --- LOGIQUE CD ---
        if (cmd === "cd") {
            const targetDir = args[1];

            if (targetDir === "secrets" && currentDir === "~") {
                setCurrentDir("secrets");
                newOutput.push("  Directory changed to '/secrets'.");
            } else if (targetDir === ".." && currentDir === "secrets") {
                setCurrentDir("~");
                newOutput.push("  Directory changed to '~'.");
            } else if (targetDir === ".." && currentDir === "~") {
                newOutput.push("  You are already in the root directory.");
            } else if (targetDir === "secrets" && currentDir === "secrets") {
                newOutput.push("  You are already in the 'secrets' directory.");
            }
            else if (targetDir === undefined) {
                setCurrentDir("~");
                newOutput.push("  Changing directory to '~'.");
            }
            else {
                newOutput.push(`  cd: No such directory: ${targetDir}`);
            }
            setOutput(newOutput);
            return;
        }

        // --- LS ---
        if (cmd === "ls") {
            if (currentDir === "~" && (args[1] === "-la" || args[1] === "-al")) {
                newOutput.push(...COMMANDS.find(c => c.command === 'ls -la')?.output.split('\n') || []);
            } else if ( currentDir === "secrets" && (args[1] == "-la" || args[1] === "-al")) {
                newOutput.push("  total 16");
                newOutput.push(`  drwx------ 3 ${ADMIN_USER} staff 96 Nov 27 00:00 .`);
                newOutput.push(`  drwxr-xr-x 7 ${ADMIN_USER} staff 224 Nov 27 00:00 ..`);
                newOutput.push(`  -rw-r--r-- 1 ${ADMIN_USER} staff 2048 Nov 27 00:00 DONT_README.txt - (READ ONLY)`);
                newOutput.push(`  --x--x--x 1 ${ADMIN_USER} staff 1024 Nov 27 00:00 script.sh - (EXECUTE ONLY)`);
                newOutput.push(`  -rw-r--r-- 1 ${ADMIN_USER} staff 2048 Nov 27 00:00 .beaver.txt - (READ ONLY)`);
                newOutput.push(`  --x--x--x 1 ${ADMIN_USER} staff 1024 Nov 27 00:00 .backdoor.sh - (EXECUTE ONLY)`);
            } else if (currentDir === "secrets" || args[1] === "secrets") {
                newOutput.push("  ../");
                newOutput.push("  DONT_README.txt (READ ONLY)");
                newOutput.push("  script.sh - (EXECUTE ONLY)");
                newOutput.push("  [HINT] Use appropriate action (cat/exec) for these files.");
            } else if (currentDir === "~" || args[1] === undefined || args[1] === "." ) {
                newOutput.push("  ./about.txt    ./projects.log    ./skills.list    ./contact.data    ./secrets/");
            } else {
                newOutput.push(`  ls: cannot access '${args[1]}': No such file or directory`);
            }
            setOutput(newOutput);
            return;
        }

        // --- NEOFETCH ---
        if (cmd === "neofetch") {
            const neofetchCommand = COMMANDS.find(c => c.command === 'neofetch');
            if (neofetchCommand) {
                const outputFunction = neofetchCommand.output as (args: string[]) => string;
                const fetchOutput = outputFunction(args);

                setOutput([]);
                newOutput = [fetchOutput];
                setOutput(newOutput);
                return;
            }
        }


        // --- LOGIQUE DE JEU ---

        let foundCommand = COMMANDS.find(c => {
            if (c.command === fullCommand) return true;
            if (c.command === cmd && args.length === 1 && cmd !== 'neofetch') return true;
            if (cmd === 'ping' && c.command === 'ping') return true;
            return false;
        });

        let secretAccessCommand: string | undefined;

        if (cmd === 'cat' && currentDir === 'secrets' && args[1] === 'beaver.txt') {
            secretAccessCommand = 'cat secrets/beaver.txt';

            // PERMISSIONS
            if (privilegeLevel === GUEST_USER) {
                newOutput.push(`  cat: secrets/beaver.txt: Permission denied. Access level: ${privilegeLevel}.`);
                newOutput.push("  [HINT] Try to find the root user of the system with 'ls -la' and switch user.");
                setOutput(newOutput);
                return;
            }
        }

        if (cmd === 'cat' && currentDir === 'secrets' && args[1] === 'DONT_README.txt') {
            newOutput.push(`  Hehe`);
            newOutput.push("  Haha");
            setOutput(newOutput);
            return;
        }

        if (cmd === 'exec' && currentDir === 'secrets' && args[1] === 'backdoor.sh') {
            secretAccessCommand = 'exec backdoor.sh';
        }

        if (secretAccessCommand) {
            foundCommand = COMMANDS.find(c => c.command === secretAccessCommand);
        }

        // --- EXEC COMMANDE ---

        if (foundCommand) {
            let commandOutput = typeof foundCommand.output === 'function' ? foundCommand.output(args, privilegeLevel) : foundCommand.output;
            newOutput.push(...commandOutput.split('\n'));

            if (foundCommand.secretRoute) {
                newOutput.push(`  [SUCCESS] Opening secret route: ${foundCommand.secretRoute} in new window...`);
                setOutput(newOutput);
                setTimeout(() => {
                    window.open(foundCommand.secretRoute!, '_blank');
                }, 1500);
                return;
            }

        } else {
            // Logique de commande non trouvée pour l'utilisateur
            if (cmd) {
                newOutput.push(`  Command not found: ${cmd}`);
                newOutput.push(`  Type 'help' for available commands.`);
            } else {
                newOutput.pop();
            }
        }

        setOutput(newOutput);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            executeCommand(input);
            setInput("");
        }
    };

    if (!isOpen) return null;

    //  symbole du prompt (# pour admin, > pour guest)
    const promptSymbol = privilegeLevel === 'admin' ? '#' : ' >';
    const promptColor = privilegeLevel === 'admin' ? 'text-red-500' : 'text-primary';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl h-[600px] bg-gray-900 border border-primary/50 shadow-2xl flex flex-col font-mono text-white relative">

                {/* Titre du terminal */}
                <div className="flex items-center justify-between bg-primary/20 text-primary p-2 border-b border-primary/50">
                    <div className="flex items-center gap-2">
                        <TerminalIcon className="w-4 h-4" />
                        <span className="text-sm">4rsi@portfolio-console: ~/{currentDir} (User: {privilegeLevel})</span>
                    </div>
                    <button onClick={onClose} className="text-primary hover:text-red-400">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto text-sm custom-scrollbar">
                    {output.map((line, index) => (
                        <pre key={index} className="whitespace-pre-wrap leading-relaxed">
                            {line}
                        </pre>
                    ))}
                    <div className="flex items-center mt-2">
                        <span className={`mr-2 flex-shrink-0 ${promptColor}`}>
                            <span className={`mr-2 flex-shrink-0 ${promptColor}`}>
                                {currentDir === '~' ? `$ ~/${promptSymbol}` : `$ /${currentDir} ${promptSymbol}`}
                            </span>

                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none text-white caret-primary"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={handleKeyPress}
                            autoCapitalize="off"
                            spellCheck="false"
                        />
                        <span className="terminal-cursor-fake w-2 h-4 bg-primary animate-blink inline-block ml-1"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;