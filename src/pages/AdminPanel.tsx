import React, { useState, useEffect } from 'react';
import { ShieldAlert, Cpu, HardDrive, Wifi, Lock, Unlock, Clock, BarChart3, Cloud, AlertTriangle } from 'lucide-react';

const AdminPanel = () => {
    // État pour simuler l'activité
    const [systemLoad, setSystemLoad] = useState(Math.floor(Math.random() * 20));
    const [logs, setLogs] = useState<string[]>([]);

    // Simuler le temps de rafraîchissement
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        // Mise à jour de l'heure
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);

        // Simulation d'activité des logs
        const logMessages = [
            "[CORE] Initializing sub-routine 7...",
            "[NET] Ping latency check... 4ms",
            "[DB] Query success: 23ms",
            "[SECURITY] Access granted via 0x45B9C (Chong CH34T BYPA55)",
            "[ALERT] System load peaking at 92% (T-1)",
            "[PROC] Garbage Collection complete.",
            "[NET] External connection attempt BLOCKED.",
        ];

        const logInterval = setInterval(() => {
            const newLog = logMessages[Math.floor(Math.random() * logMessages.length)];
            setLogs(prev => {
                const newLogs = [...prev, `[${currentTime}] ${newLog}`];
                return newLogs.slice(-10); // Garder les 10 dernières lignes
            });
            setSystemLoad(Math.min(100, systemLoad + Math.floor(Math.random() * 5) - 2));
        }, 800);

        return () => {
            clearInterval(timer);
            clearInterval(logInterval);
        };
    }, [currentTime, systemLoad]);

    // Composant de tuile (widget)
    const Widget = ({ icon: Icon, title, value, statusColor = 'text-primary' }) => (
        <div className="bg-gray-800 p-4 border border-primary/50 shadow-lg font-mono">
            <div className="flex items-center justify-between mb-3">
                <Icon className={`w-6 h-6 ${statusColor}`} />
                <span className="text-xs text-muted-foreground">{title}</span>
            </div>
            <div className="text-xl font-bold text-white">{value}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-primary font-mono p-8 md:p-12">

            {/* Header / Titre de l'Interface */}
            <header className="flex justify-between items-center border-b border-red-500 pb-4 mb-8 animate-pulse-slow">
                <h1 className="text-3xl md:text-5xl font-extrabold flex items-center gap-4 text-red-500">
                    <ShieldAlert className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
                    PANNEAU DE SURVEILLANCE CHINOIS DE MINORITÉS
                </h1>
                <div className="text-sm">
                    <span className="text-red-500">ACCÈS: </span>
                    <span className="text-white">FORCE (CHONG_CH34T_ENGINE)</span>
                </div>
            </header>

            {/* Grille des Widgets d'État */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <Widget
                    icon={Cpu}
                    title="LOAD SYSTÈME"
                    value={`${systemLoad}%`}
                    statusColor={systemLoad > 80 ? 'text-yellow-400' : 'text-green-500'}
                />
                <Widget
                    icon={Clock}
                    title="HEURE SERVEUR"
                    value={currentTime}
                    statusColor="text-cyan-400"
                />
                <Widget
                    icon={Lock}
                    title="STATUS AUTH"
                    value="BYPASSED"
                    statusColor="text-red-500"
                />
                <Widget
                    icon={HardDrive}
                    title="STOCKAGE"
                    value="98.7 TB FREE"
                    statusColor="text-green-500"
                />
            </div>

            {/* Logs d'Activité et Console */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* 1. Fenêtre de Logs */}
                <div className="lg:col-span-2 bg-gray-900 border border-primary/50 p-4 h-[400px] overflow-y-auto custom-scrollbar shadow-inner">
                    <div className="text-red-500 mb-2 border-b border-primary/50 pb-2">
                        <BarChart3 className="w-4 h-4 inline mr-2" />
                        ONLINE ACTIVITY LOGS
                    </div>
                    {logs.map((log, index) => (
                        <pre
                            key={index}
                            className={`whitespace-pre-wrap text-xs leading-relaxed ${log.includes("ALERT") ? 'text-red-500 font-bold' : log.includes("SUCCESS") ? 'text-green-400' : 'text-gray-400'}`}
                        >
                            {log}
                        </pre>
                    ))}
                </div>

                {/* 2. Contrôles et Alertes */}
                <div className="lg:col-span-1 space-y-6">

                    <div className="bg-gray-800 p-4 border border-primary/50 font-mono">
                        <div className="text-lg text-primary mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            ALERTE SCANNER
                        </div>
                        <p className="text-sm text-yellow-400">
                            [*] Acc3ss v1auln3r@bl3 d3t3ct3d! Initi@ting f0rce bypass pr0c3dur3...
                            <br></br>
                            [!] ENY ACESS. Force reset in progress...
                        </p>
                    </div>

                    <div className="bg-gray-800 p-4 border border-primary/50 font-mono">
                        <div className="text-lg text-primary mb-2 flex items-center gap-2">
                            <Cloud className="w-5 h-5 text-cyan-400" />
                            Systèmes surveillés
                        </div>
                        <p className="text-sm text-gray-400">
                            SYS_LIST : [CCTV_CAM_01, FACE_RECOG_02, NET_MON_03,GROSSE_DARONNNE_A_MEHDI, DB_ACCESS_04, GEO_TRACK_05]
                        </p>
                    </div>

                </div>
            </div>

            {/* Footer de la Page Secrète */}
            <footer className="mt-12 pt-6 border-t border-primary/50 text-center">
                <a href="/" className="text-primary underline hover:text-red-500 transition-colors font-mono">
                    TERMINATE SESSION / RETURN TO PORTFOLIO
                </a>
            </footer>
        </div>
    );
};

export default AdminPanel;