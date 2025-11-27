import React from 'react';
import { BookOpen } from 'lucide-react';

const JournalPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
            <div className="max-w-3xl mx-auto text-center border border-primary/50 bg-card p-10 shadow-lg">
                <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
                <h1 className="text-5xl font-bold font-mono text-primary mb-4">
                    [ACCÈS CONFIDENTIEL]
                </h1>
                <h2 className="text-3xl font-semibold mb-6">Mon Journal de Bord Personnel</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Bienvenue dans un espace un peu plus personnel. Ici, vous trouverez mes réflexions, mes expériences non-professionnelles, et quelques-uns de mes coups de cœur.
                </p>
                <p className="mt-4 text-sm text-gray-500 font-mono">
                    &gt; Log Entry #001: This page was discovered via 'cat secrets/journal.txt'.
                </p>
                <div className="mt-8">
                    <a href="/" className="text-primary underline hover:text-primary/70 font-mono">
                        &lt; Retour à l'accueil
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JournalPage;