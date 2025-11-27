import { useState } from "react";
import { useLocation } from "react-router-dom";
import Terminal from "./Terminal"; // Assurez-vous du chemin correct
import { Terminal as TerminalIcon, X } from "lucide-react"; // Importez l'icône Terminal

const Navigation = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false); // État pour le terminal
  const location = useLocation();

  const scrollToSection = (id: string) => {
    // Vérifie si la section existe sur la page actuelle
    if (location.pathname !== "/") {
      // Si on n'est pas sur la page d'accueil, on y navigue d'abord
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <span className="font-mono text-lg font-bold terminal-cursor">4rsi@fl4fl4:~/web/portfolio$</span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                {["a propos", "competences", "projets", "me contacter"].map((section) => (
                    <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className="text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors relative group"
                    >
                  <span className="relative">
                    {section}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                    </button>
                ))}

                {/* Nouveau Bouton Terminal */}
                <button
                    onClick={() => setIsTerminalOpen(true)}
                    className="ml-4 p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/40 transition-colors duration-200"
                    aria-label="Open Terminal"
                >
                  <TerminalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Rendre le composant Terminal */}
        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      </>
  );
};

export default Navigation;