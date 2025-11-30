import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SESSION_KEY = 'terminalHintDismissed';

interface TerminalHintProps {
    terminalButtonRef: React.RefObject<HTMLButtonElement>;
    onOpenTerminal: () => void;
}

const TerminalHint: React.FC<TerminalHintProps> = ({ terminalButtonRef, onOpenTerminal }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const dismissed = sessionStorage.getItem(SESSION_KEY);
        // Afficher l'indice si non fermé et si le bouton du terminal est visible (sur desktop)
        if (dismissed !== 'true' && window.innerWidth >= 768) {
            // Nous attendons un court instant pour laisser la navigation se charger
            setTimeout(() => {
                const buttonElement = terminalButtonRef.current;
                if (buttonElement) {
                    const rect = buttonElement.getBoundingClientRect();
                    // Calcule la position relative au viewport pour placer la bulle
                    setPosition({
                        // Place la bulle juste à gauche du bouton du terminal
                        left: rect.left - 220,
                        top: rect.top + rect.height + 10, // Juste en dessous
                    });
                    setIsVisible(true);
                }
            }, 1000); // Délai pour s'assurer que la navigation est rendue
        }
    }, [terminalButtonRef]);

    // Fonction pour fermer la bulle et mémoriser l'action
    const handleDismiss = () => {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    // Rendu de la bulle d'indice
    return (
        <div
            className="fixed z-50 p-3 bg-card border border-primary/50 shadow-xl rounded-lg animate-fade-in-down"
            style={{ top: position.top, left: position.left }}
        >
            <div className="flex flex-col font-mono text-sm">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-primary font-bold flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> [EASTER EGG]
                    </span>
                    <button onClick={handleDismiss} className="text-muted-foreground hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-muted-foreground mb-3">
                    En haut à droite de cette page se trouve un petit bouton pour ouvrir un terminal... Essayez la commande <span className="text-primary font-semibold">`help`</span> pour commencer ! Qui sait, peut-être accéderiez-vous à certaines choses...
                </p>

                <Button
                    onClick={() => { handleDismiss(); onOpenTerminal(); }}
                    variant="default"
                    className="h-8 px-3 text-xs font-mono bg-secondary hover:bg-secondary/80 text-secondary-foreground w-full"
                >
                    <TerminalIcon className="w-4 h-4 mr-2" /> Ouvrir le Terminal
                </Button>
            </div>
        </div>
    );
};

export default TerminalHint;