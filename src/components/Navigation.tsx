import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import PseudoTerminal from "./Terminal";
import TerminalHint from "./TerminalHint"; // NOUVEL IMPORT
import { Terminal as TerminalIcon, X } from "lucide-react";

const Navigation = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const location = useLocation();
  const terminalButtonRef = useRef<HTMLButtonElement>(null); // RÉFÉRENCE POUR LA BULLE

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenTerminal = () => {
    setIsTerminalOpen(true);
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

                {/* Bouton Terminal avec Réf */}
                <button
                    ref={terminalButtonRef} // Application de la référence
                    onClick={handleOpenTerminal}
                    className="ml-4 p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/40 transition-colors duration-200"
                    aria-label="Open Terminal"
                >
                  <TerminalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Rendre le Hint et le Terminal */}
        <TerminalHint
            terminalButtonRef={terminalButtonRef}
            onOpenTerminal={handleOpenTerminal}
        />
        <PseudoTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      </>
  );
};

export default Navigation;