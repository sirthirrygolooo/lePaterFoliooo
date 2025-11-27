import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
// NOTE: Bien que useNavigate ne soit plus utilisé pour les secrets, on le garde si besoin pour une autre navigation interne
import { useNavigate } from 'react-router-dom';

// Définir le type pour les commandes
interface Command {
    command: string; // La commande complète, ex: "cat secrets/journal.txt"
    output: string | ((args: string[]) => string);
    secretRoute?: string;
}

// NOTE: Le nom d'utilisateur "admin" est l'indice caché à trouver
const ADMIN_USER = "4rsi_root";
const GUEST_USER = "guest";

const COMMANDS: Command[] = [
    { command: "help", output: "COMMANDS:\n  help - Display this help message.\n  ls - List files in current directory.\n  ls -la - List files with details (HINT).\n  su [user] - Switch user (HINT).\n  cd [directory] - Change directory.\n  whoami - Display current user.\n  cat [file] - Display file content.\n  ping [host] - Test network connectivity (fake).\n  clear - Clear the terminal." },
    { command: "ls", output: "  ./about.txt    ./projects.log    ./skills.list    ./contact.data    ./secrets/" },
    {
        command: "ls -la",
        output: `  total 24\n  drwxr-xr-x 7 ${ADMIN_USER} staff 224 Nov 27 00:00 .\n  drwxr-xr-x 8 ${ADMIN_USER} staff 256 Nov 27 00:00 ..\n  -rw-r--r-- 1 ${ADMIN_USER} staff 575 Nov 27 00:00 about.txt\n  drwx------ 3 ${ADMIN_USER} staff 96 Nov 27 00:00 secrets/`
    },
    { command: "whoami", output: (args) => `  Current User: ${ADMIN_USER} (Privilege Level: ${GUEST_USER})` },

    { command: "cat about.txt", output: "  [INFO] Personal portfolio information.\n  [HINT] Try 'cat'ing other files or 'cd'ing into directories." },
    { command: "cat projects.log", output: "  [INFO] List of projects. Use the 'projects' section for details." },
    { command: "cat skills.list", output: "  [INFO] Technical skills details. See the 'competences' section." },
    { command: "cat contact.data", output: "  [INFO] Contact information. Use the 'me contacter' section." },

    { command: "ping", output: (args) => args[1] ? `  Pinging ${args[1]} [127.0.0.1] with 32 bytes of data:\n  Reply from 127.0.0.1: bytes=32 time<1ms TTL=128\n  Reply from 127.0.0.1: bytes=32 time<1ms TTL=128\n  Reply from 0.0.0.0: Destination Host Unreachable\n  Ping statistics for 127.0.0.1:\n      Packets: Sent = 3, Received = 2, Lost = 1 (33% loss),\n  Approximate round trip times in milli-seconds:\n      Minimum = 0ms, Maximum = 0ms, Average = 0ms` : "  Usage: ping [host]" },

    // --- COMMANDES SECRÈTES ET PIÈGES ---
    {
        command: "cat secrets/journal.txt",
        output: "  [ACCESS GRANTED] Redirecting to personal journal...\n  Reading 'journal.txt' reveals deep insights.\n  Navigating to /journal...",
        secretRoute: "/journal"
    },
    {
        command: "exec backdoor.sh",
        output: "  [WARNING] Executing unauthorized script... \n  Bypassing authentication... \n  Redirecting to private gallery...",
        secretRoute: "/gallery"
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
    const [privilegeLevel, setPrivilegeLevel] = useState(GUEST_USER); // 'guest' ou 'admin'
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate(); // Garder navigate au cas où d'autres redirections internes seraient nécessaires

    // Focus l'input à l'ouverture
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Scroll automatique vers le bas
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

        // --- COMMANDES DE BASE UNIQUES ---
        if (cmd === "clear") {
            setOutput([]);
            return;
        }

        // --- LOGIQUE SU (ÉLÉVATION DE PRIVILÈGE) ---
        if (cmd === "su") {
            const targetUser = args[1];
            if (targetUser === ADMIN_USER) {
                setPrivilegeLevel("admin");
                newOutput.push(`  Authentication successful for user '${ADMIN_USER}'.`);
                newOutput.push("  Privilege level elevated to 'admin'.");
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

        // --- LOGIQUE LS ---
        if (cmd === "ls") {
            if (currentDir === "~" && args[1] === "-la") {
                newOutput.push(...COMMANDS.find(c => c.command === 'ls -la')?.output.split('\n') || []);
            }
            else if (currentDir === "~" || args[1] === undefined || args[1] === "." ) {
                newOutput.push("  ./about.txt    ./projects.log    ./skills.list    ./contact.data    ./secrets/");
            } else if (currentDir === "secrets" || args[1] === "secrets") {
                newOutput.push("  ../");
                newOutput.push("  journal.txt - (READ ONLY)");
                newOutput.push("  backdoor.sh - (EXECUTE ONLY)");
                newOutput.push("  [HINT] Use appropriate action (cat/exec) for these files.");
            } else {
                newOutput.push(`  ls: cannot access '${args[1]}': No such file or directory`);
            }
            setOutput(newOutput);
            return;
        }


        // --- LOGIQUE DE JEU (RECHERCHE DE COMMANDE) ---

        let foundCommand = COMMANDS.find(c => {
            if (c.command === fullCommand) return true;
            if (c.command === cmd && args.length === 1) return true;
            if (cmd === 'ping' && c.command === 'ping') return true;
            return false;
        });

        // Correction pour les commandes cat/exec dans le répertoire secrets
        let secretAccessCommand: string | undefined;

        if (cmd === 'cat' && currentDir === 'secrets' && args[1] === 'journal.txt') {
            secretAccessCommand = 'cat secrets/journal.txt';

            // GESTION DES PERMISSIONS
            if (privilegeLevel === GUEST_USER) {
                newOutput.push(`  cat: secrets/journal.txt: Permission denied. Access level: ${privilegeLevel}.`);
                newOutput.push("  [HINT] Try to find the root user of the system with 'ls -la' and switch user.");
                setOutput(newOutput);
                return;
            }
        }

        if (cmd === 'exec' && currentDir === 'secrets' && args[1] === 'backdoor.sh') {
            secretAccessCommand = 'exec backdoor.sh';
        }

        if (secretAccessCommand) {
            foundCommand = COMMANDS.find(c => c.command === secretAccessCommand);
        }

        // --- EXÉCUTION DE LA COMMANDE ---

        if (foundCommand) {
            let commandOutput = typeof foundCommand.output === 'function' ? foundCommand.output(args) : foundCommand.output;
            newOutput.push(...commandOutput.split('\n'));

            if (foundCommand.secretRoute) {
                newOutput.push(`  [SUCCESS] Opening secret route: ${foundCommand.secretRoute} in new window...`);
                setOutput(newOutput);

                // NOUVEAU: Redirection dans un nouvel onglet
                setTimeout(() => {
                    window.open(foundCommand.secretRoute!, '_blank');
                    // Nous laissons le terminal ouvert ou le fermons selon préférence.
                    // Pour ne pas briser la session, je le laisse ouvert.
                    // onClose(); // <-- Commenté pour garder la session active
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

    // Détermine le symbole du prompt (# pour admin, > pour guest)
    const promptSymbol = privilegeLevel === 'admin' ? '#' : '>';
    const promptColor = privilegeLevel === 'admin' ? 'text-red-500' : 'text-primary';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl h-[600px] bg-gray-900 border border-primary/50 shadow-2xl flex flex-col font-mono text-white relative">

                {/* Barre de titre du terminal */}
                <div className="flex items-center justify-between bg-primary/20 text-primary p-2 border-b border-primary/50">
                    <div className="flex items-center gap-2">
                        <TerminalIcon className="w-4 h-4" />
                        <span className="text-sm">4rsi@portfolio-console: ~/{currentDir} (User: {privilegeLevel})</span>
                    </div>
                    <button onClick={onClose} className="text-primary hover:text-red-400">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Zone de sortie du terminal */}
                <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto text-sm custom-scrollbar">
                    {output.map((line, index) => (
                        <pre key={index} className="whitespace-pre-wrap leading-relaxed">
                            {line}
                        </pre>
                    ))}
                    <div className="flex items-center mt-2">
                        {/* Prompt dynamique et coloré */}
                        <span className={`mr-2 flex-shrink-0 ${promptColor}`}>
                            $ {currentDir}{promptSymbol}
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none text-white caret-primary"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
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