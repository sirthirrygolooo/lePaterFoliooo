import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Clé de session pour ne pas afficher l'alerte à chaque chargement de page
const SESSION_KEY = 'desktopWarningDismissed';

const CompatibilityWarning = () => {
    // État local pour contrôler la visibilité (basé sur sessionStorage)
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Vérifie si l'utilisateur a déjà fermé l'alerte durant cette session
        const dismissed = sessionStorage.getItem(SESSION_KEY);

        // Nous affichons l'alerte seulement si elle n'a jamais été fermée dans la session
        if (dismissed !== 'true') {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        // Enregistre l'état de fermeture dans sessionStorage
        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    // Design du panneau d'alerte, fixé en bas de l'écran
    return (
        <div className="fixed bottom-4 right-4 z-[999] max-w-sm w-full p-4 bg-gray-900 border-2 border-yellow-500 rounded-lg shadow-2xl animate-fade-in-up">
            <div className="flex items-start gap-4 font-mono text-sm">

                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />

                <div className="flex-1">
                    <span className="text-yellow-400 font-bold flex items-center gap-2 mb-1">
                         <Monitor className="w-4 h-4" /> [SYSTÈME] ALERTE EXPERIENCE UTILISATEUR
                    </span>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                        Pour profiter pleinement de l'interface et des easter eggs, il est recommandé de consulter ce portfolio sur un ordinateur de bureau ou un écran large.
                    </p>

                    <div className="mt-3 flex justify-end">
                        <Button
                            onClick={handleDismiss}
                            variant="ghost"
                            className="h-8 px-3 text-xs font-mono text-yellow-400 hover:bg-yellow-900/40"
                        >
                            ACKNOWLEDGE & CLOSE
                        </Button>
                    </div>
                </div>

                <button
                    onClick={handleDismiss}
                    className="text-gray-500 hover:text-white transition-colors p-1"
                    aria-label="Fermer l'avertissement"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default CompatibilityWarning;