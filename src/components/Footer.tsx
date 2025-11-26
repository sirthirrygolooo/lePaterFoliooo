import React from 'react';
import { Terminal, Code, Heart, CheckCircle, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Obtient l'heure et la date formatées pour l'horodatage
  const getTimestamp = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    return `${date.toUpperCase()} @ ${time}`;
  };

  return (
      <footer className="bg-card border-t border-border py-6 sm:py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Colonne 1 : Statut du système et Auteur */}
            <div className="flex flex-col items-center md:items-start gap-1">

              {/* 1. Ligne du Hostname/Auteur */}
              <div className="flex items-center gap-2 text-primary">
                <Terminal className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs sm:text-sm">
                                <span className="text-secondary-foreground">4RSI-portfolio</span>:<span className="text-foreground">/profile$ </span> <span className="text-primary">AUTHOR:</span> FROEHLY Jean-Baptiste
                            </span>
              </div>

              {/* 2. Statut de compilation/déploiement */}
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                <span className="text-green-500">[BUILD STATUS]</span>
                <span className="text-foreground">OK (Exit Code 0)</span>
              </div>

              {/* NOUVEAU : Horodatage */}
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <Clock className="w-3 h-3 text-yellow-500 shrink-0" />
                <span className="text-yellow-500">[LAST REFRESH]</span>
                <span className="text-foreground">{getTimestamp()}</span>
              </div>

            </div>

            {/* Colonne 2 : Copyright et Technologies */}
            <div className="flex flex-col items-center md:items-end gap-1">

              {/* Copyright */}
              <p className="font-mono text-xs text-muted-foreground order-2 md:order-1">
                © {currentYear} • github.com/sirthirrygolooo • All rights reserved.
              </p>

              {/* Technologies Utilisées */}
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-1 order-1 md:order-2">
                <Code className="w-3 h-3 text-primary shrink-0" />
                <span className="text-primary">Tecnos :</span>
                <span className="text-secondary-foreground/80">Vite / React / TailwindCSS / Zod</span>
                <span className="text-primary ml-1">• Made with </span>
                <Heart className="w-3 h-3 text-red-500" />
                <span className="text-secondary-foreground/80"> but especially with my keyboard</span>
              </div>

            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;