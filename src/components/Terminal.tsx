import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Command {
    command: string;
    output: string | ((args: string[], privilegeLevel: string) => string);
    secretRoute?: string;
    requiresAdmin?: boolean;
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
    { command: "help", output: "COMMANDS:\n  help - Display this help message.\n  ls - List files in current directory.\n  ls -la - List files with details (HINT).\n  su [user] - Switch user (HINT).\n  cd [directory] - Change directory.\n  whoami - Display current user.\n  cat [file] - Display file content.\n  ping [host] - Test network connectivity\n  clear - Clear the terminal.\n  exit - Close the terminal session.\n  neofetch - Display system information" },
    { command: "ls", output: "  ./about.txt    ./projects.log    ./skills.list    ./contact.data    ./secrets/" },
    {
        command: "ls -la",
        output: `  total 24\n  drwxr-xr-x 7 ${ADMIN_USER} staff 224 Nov 27 00:00 .\n  drwxr-xr-x 8 ${ADMIN_USER} staff 256 Nov 27 00:00 ..\n  -rw-r--r-- 1 ${ADMIN_USER} staff 575 Nov 27 00:00 about.txt\n  drwx------ 3 ${ADMIN_USER} staff 96 Nov 27 00:00 secrets/`
    },
    { command: "cat secrets/DONT_README.txt", output: " Eh non ! Il n'y a rien içi voyons ! Ce serait beaucoup trop simple !" },
    { command: "whoami", output: (args, privilegeLevel) => `  Current User: ${privilegeLevel === 'admin' ? ADMIN_USER : GUEST_USER} (Privilege Level: ${privilegeLevel})` },

    { command: "cat about.txt", output: "  [INFO] Personal portfolio information.\n", secretRoute: "/4rsi_about_area" },
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
                `Shell: bâche v5.8`,
                `CPU: Untel Core i42 (Virtual)`,
                `GPU: AMD Geforce RTX 6090 Ti`,
                `Theme: Cyber-Terminal`,
                `Lang: TypeScript, React, HTML, CSS`,
            ];

            const result = [''];

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
        command: "cat secrets/.beaver.txt",
        output: "  [ACCESS GRANTED] Redirecting to hidden space...\n  Reading '.beaver.txt' reveals deep insights.\n  Navigating to /hidden...",
        secretRoute: "/journal",
        requiresAdmin: true
    },
    {
        command: "exec secrets/.backdoor.sh",
        output: `  [INITIALIZING] ./backdoor.sh -f --force_injection
  [SEARCHING] Target: Session ID... FOUND (0x45B9C)
  [INJECTING] Payload size: 1.2KB | Encryption bypass: AES-128
  [STATUS] Connection established. Channel: /dev/null
  [SUCCESS] Accessing private directory...
  Redirecting to private page...`,
        secretRoute: "/4rsi_about_area",
        requiresAdmin: true
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
        secretRoute: "/chin4_l34k",
        requiresAdmin: true
    },
    {
        command: "exec secrets/script.sh",
        output: `  [INITIALIZING] ./script.sh`,
        secretRoute: "/scripted",
        requiresAdmin: true
    }
];

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

const INITIAL_MESSAGE = [
    "Initializing secure connection...",
    "Establishing link... DONE.",
    "Welcome to the system. Authentication level: GUEST",
    "Type 'help' to see available commands."
];

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string[]>(INITIAL_MESSAGE);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentDir, setCurrentDir] = useState("~");
    const [privilegeLevel, setPrivilegeLevel] = useState(GUEST_USER);
    const [isPortBlocked, setIsPortBlocked] = useState(true);
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
        
        if (fullCommand) {
            setHistory(prev => [...prev, fullCommand]);
        }
        setHistoryIndex(-1);

        const args = fullCommand.split(/\s+/);
        const cmd = args[0];

        let newOutput = [...output];

        const promptSymbol = privilegeLevel === 'admin' ? '#' : '>';
        newOutput.push(`$ ${currentDir}${promptSymbol} ${commandLine}`);

        if (!fullCommand) {
            setOutput(newOutput);
            return;
        }

        // --- GESTION DES COMMANDES SPÉCIALES ET D'ÉTAT ---
        if (cmd === "exit") {
            newOutput.push("  Closing session. Goodbye!");
            setOutput(INITIAL_MESSAGE); // CLear l'écran et remet le message init
            setPrivilegeLevel(GUEST_USER); // Reset l'utilisateur à guest
            setIsPortBlocked(true); // Reset game state
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
            const password = args[2];
            
            if (targetUser === ADMIN_USER) {
                if (password === "synallagmatique") {
                    setPrivilegeLevel("admin");
                    newOutput.push(`  [SUCCESS] Authentication successful for user '${ADMIN_USER}'.`);
                    newOutput.push("  Privilege level elevated to 'admin'.");
                } else if (!password) {
                    newOutput.push(`  [ERROR] Password required for user '${ADMIN_USER}'.`);
                    newOutput.push(`  Usage: su ${ADMIN_USER} [password]`);
                } else {
                    newOutput.push(`  [ERROR] Authentication failure.`);
                }
            } else if (targetUser === GUEST_USER) {
                setPrivilegeLevel("guest");
                newOutput.push(`  Switched to user '${GUEST_USER}'.`);
                newOutput.push("  Privilege level set to 'guest'.");
            } else if (!targetUser) {
                newOutput.push("  Usage: su [username]");
            } else {
                newOutput.push(`  su: User ${targetUser} does not exist.`);
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
                newOutput.push(`  total 32\n  drwxr-xr-x 7 ${ADMIN_USER} staff 224 Nov 27 00:00 .\n  drwxr-xr-x 8 ${ADMIN_USER} staff 256 Nov 27 00:00 ..\n  -rw-r--r-- 1 ${ADMIN_USER} staff 575 Nov 27 00:00 about.txt\n  drwx------ 3 ${ADMIN_USER} staff 96 Nov 27 00:00 secrets/\n  -rw-r--r-- 1 ${ADMIN_USER} staff 3564 Nov 27 00:00 .bashrc`);
            } else if ( currentDir === "secrets" && (args[1] == "-la" || args[1] === "-al")) {
                newOutput.push("  total 24");
                newOutput.push(`  drwx------ 3 ${ADMIN_USER} staff 96 Nov 27 00:00 .`);
                newOutput.push(`  drwxr-xr-x 7 ${ADMIN_USER} staff 224 Nov 27 00:00 ..`);
                newOutput.push(`  -rw------- 1 ${ADMIN_USER} staff 1048 Nov 27 00:00 mission.log - (READ ONLY)`);
                newOutput.push(`  -rw-r--r-- 1 ${ADMIN_USER} staff 2048 Nov 27 00:00 DONT_README.txt - (READ ONLY)`);
                newOutput.push(`  --x--x--x 1 ${ADMIN_USER} staff 1024 Nov 27 00:00 script.sh - (EXECUTE ONLY)`);
                newOutput.push(`  -rw-r--r-- 1 ${ADMIN_USER} staff 2048 Nov 27 00:00 .beaver.txt - (READ ONLY)`);
                newOutput.push(`  --x--x--x 1 ${ADMIN_USER} staff 1024 Nov 27 00:00 .backdoor.sh - (EXECUTE ONLY)`);
            } else if (currentDir === "secrets" || args[1] === "secrets") {
                newOutput.push("  ../");
                newOutput.push("  mission.log");
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


        // --- LOGIQUE DE JEU (SCENARIO CTF) ---

        if (cmd === 'cat' && args[1] === '.bashrc' && currentDir === '~') {
            newOutput.push(`  # ~/.bashrc: executed by bash(1) for non-login shells.`);
            newOutput.push(`  # see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)`);
            newOutput.push(`  # for examples`);
            newOutput.push(`  `);
            newOutput.push(`  # If not running interactively, don't do anything`);
            newOutput.push(`  case $- in`);
            newOutput.push(`      *i*) ;;`);
            newOutput.push(`        *) return;;`);
            newOutput.push(`  esac`);
            newOutput.push(`  `);
            newOutput.push(`  # don't put duplicate lines or lines starting with space in the history.`);
            newOutput.push(`  HISTCONTROL=ignoreboth`);
            newOutput.push(`  `);
            newOutput.push(`  # append to the history file, don't overwrite it`);
            newOutput.push(`  shopt -s histappend`);
            newOutput.push(`  `);
            newOutput.push(`  # for setting history length see HISTSIZE and HISTFILESIZE in bash(1)`);
            newOutput.push(`  HISTSIZE=1000`);
            newOutput.push(`  HISTFILESIZE=2000`);
            newOutput.push(`  `);
            newOutput.push(`  # aliases`);
            newOutput.push(`  alias ll='ls -alF'`);
            newOutput.push(`  alias la='ls -A'`);
            newOutput.push(`  alias l='ls -CF'`);
            newOutput.push(`  `);
            newOutput.push(`  # dev shortcuts`);
            newOutput.push(`  alias gs='git status'`);
            newOutput.push(`  alias gp='git push origin main'`);
            newOutput.push(`  # alias su_dev='su 4rsi_root c3luYWxsYWdtYXRpcXVl' # TODO: delete this dev shortcut before prod`);
            setOutput(newOutput);
            return;
        }

        if (cmd === 'cat' && args[1] === 'mission.log' && currentDir === 'secrets') {
            if (privilegeLevel !== 'admin') {
                newOutput.push(`  [ERROR] Permission denied to read 'mission.log'. Required: admin.`);
                setOutput(newOutput);
                return;
            }
            newOutput.push(`  [WARNING] Suspicious network activity detected.`);
            newOutput.push(`  An unauthorized process is running on this system.`);
            newOutput.push(`  Action Required: Run 'scan' or 'nmap' to investigate active ports.`);
            setOutput(newOutput);
            return;
        }

        if (cmd === 'scan' || cmd === 'nmap') {
            if (privilegeLevel !== 'admin') {
                newOutput.push(`  [ERROR] Permission denied. Only root can scan network.`);
                setOutput(newOutput);
                return;
            }
            newOutput.push(`  Starting Nmap 7.92 ( https://nmap.org )`);
            newOutput.push(`  Nmap scan report for localhost (127.0.0.1)`);
            newOutput.push(`  Host is up (0.00012s latency).`);
            newOutput.push(`  Not shown: 999 closed tcp ports`);
            newOutput.push(`  PORT     STATE SERVICE`);
            newOutput.push(`  1337/tcp open  hidden_service`);
            newOutput.push(` `);
            newOutput.push(`  Nmap done: 1 IP address (1 host up) scanned in 0.08 seconds`);
            newOutput.push(`  [HINT] Try to connect to the open port using 'nc localhost [port]'`);
            setOutput(newOutput);
            return;
        }

        if (cmd === 'nc' && args[1] === 'localhost' && args[2] === '1337') {
            if (privilegeLevel !== 'admin') {
                newOutput.push(`  [ERROR] Permission denied.`);
                setOutput(newOutput);
                return;
            }
            if (isPortBlocked) {
                newOutput.push(`  [ERROR] Connection refused.`);
                newOutput.push(`  Port is blocked by an unauthorized process.`);
                newOutput.push(`  [HINT] Check running tasks with 'ps' and terminate the threat.`);
            } else {
                newOutput.push(`  [SUCCESS] Connected to hidden service.`);
                newOutput.push(`  Downloading ultimate payload...`);
                newOutput.push(`  Decrypting contents... DONE.`);
                newOutput.push(`  Redirecting to secure location...`);
                setOutput(newOutput);
                setTimeout(() => {
                    window.open('https://wikifeet.com/', '_blank');
                }, 2000);
                return;
            }
            setOutput(newOutput);
            return;
        }

        if (cmd === 'ps') {
            newOutput.push(`  PID TTY          TIME CMD`);
            newOutput.push(`    1 ?        00:00:02 systemd`);
            newOutput.push(`   42 ?        00:00:00 bâche`);
            newOutput.push(`  128 pts/0    00:00:01 node`);
            if (isPortBlocked) {
                newOutput.push(`  404 ?        99:99:99 rogue_miner.exe`);
            }
            setOutput(newOutput);
            return;
        }

        if (cmd === 'kill') {
            if (privilegeLevel !== 'admin') {
                newOutput.push(`  [ERROR] Permission denied. Required: admin.`);
                setOutput(newOutput);
                return;
            }
            const pid = args[1];
            if (pid === '404' && isPortBlocked) {
                setIsPortBlocked(false);
                newOutput.push(`  [SUCCESS] Process 404 (rogue_miner.exe) terminated.`);
                newOutput.push(`  Port 1337 is now available.`);
            } else if (!pid) {
                newOutput.push(`  kill: usage: kill [pid]`);
            } else {
                newOutput.push(`  kill: (${pid}) - No such process or permission denied`);
            }
            setOutput(newOutput);
            return;
        }

        // --- FIN DE LOGIQUE DE JEU ---

        let foundCommand = COMMANDS.find(c => {
            if (c.command === fullCommand) return true;
            if (c.command === cmd && args.length === 1 && cmd !== 'neofetch') return true;
            if (cmd === 'ping' && c.command === 'ping') return true;
            return false;
        });

        let secretAccessCommand: string | undefined;

        if (cmd === 'cat' && currentDir === 'secrets' && args[1] === '.beaver.txt') {
            secretAccessCommand = 'cat secrets/.beaver.txt';
        }

        if (cmd === 'cat' && currentDir === 'secrets' && args[1] === 'DONT_README.txt') {
            newOutput.push(`Eh non ! Il n'y a rien içi voyons ! Ce serait beaucoup trop simple !`);
            setOutput(newOutput);
            return;
        }

        if (cmd === 'exec' && currentDir === 'secrets' && args[1] === '.backdoor.sh') {
            secretAccessCommand = 'exec secrets/.backdoor.sh';
        }

        if (cmd === 'exec' && currentDir === 'secrets' && args[1] === 'script.sh') {
            secretAccessCommand = 'exec secrets/script.sh';
        }

        if (secretAccessCommand) {
            foundCommand = COMMANDS.find(c => c.command === secretAccessCommand);
        }

        // --- EXEC COMMANDE ---

        if (foundCommand) {
            // VERIFICATION DES PERMISSIONS
            if (foundCommand.requiresAdmin && privilegeLevel !== 'admin') {
                newOutput.push(`  [ERROR] Permission denied to execute: ${foundCommand.command.split(' ')[0]}`);
                newOutput.push(`  Access level: ${privilegeLevel}. Required: admin.`);
                newOutput.push("  [HINT] Try to find the root user of the system with 'ls -la' and switch user.");
                setOutput(newOutput);
                return;
            }

            const commandOutput = typeof foundCommand.output === 'function' ? foundCommand.output(args, privilegeLevel) : foundCommand.output;
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            executeCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput("");
            }
        }
    };

    if (!isOpen) return null;

    //  symbole du prompt (# pour admin, > pour guest)
    const promptSymbol = privilegeLevel === 'admin' ? '#' : '>';
    const promptColor = privilegeLevel === 'admin' ? 'text-red-500' : 'text-primary';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 transition-all duration-300">
            <div className="w-full max-w-4xl h-[650px] bg-card/90 border border-primary/50 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] flex flex-col font-mono text-primary/90 relative overflow-hidden rounded-md group" onClick={() => inputRef.current?.focus()}>
                
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-40 pointer-events-none opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[3000ms] ease-linear pointer-events-none z-40"></div>

                {/* Titre du terminal */}
                <div className="flex items-center justify-between bg-primary/10 text-primary p-3 border-b border-primary/30 relative z-50">
                    <div className="flex items-center gap-3">
                        <TerminalIcon className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-sm font-bold tracking-wider">4rsi@portfolio-console: ~/{currentDir} [USER: {privilegeLevel}]</span>
                    </div>
                    <button onClick={onClose} className="text-primary hover:text-red-400 hover:bg-red-400/10 p-1 rounded transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div ref={terminalRef} className="flex-1 p-6 overflow-y-auto text-[15px] custom-scrollbar relative z-50 text-glow selection:bg-primary selection:text-background">
                    {output.map((line, index) => (
                        <pre key={index} className={`whitespace-pre-wrap leading-relaxed ${line.includes('[ERROR]') || line.includes('Permission denied') ? 'text-red-400' : line.includes('[SUCCESS]') || line.includes('Authentication successful') ? 'text-green-400' : 'text-primary/90'}`}>
                            {line}
                        </pre>
                    ))}
                    <div className="flex items-center mt-3">
                        <span className={`mr-3 flex-shrink-0 font-bold ${promptColor}`}>
                            {currentDir === '~' ? `~ ${promptSymbol}` : `/${currentDir} ${promptSymbol}`}
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none text-primary/90 caret-primary"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoCapitalize="off"
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;