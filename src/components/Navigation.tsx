import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import PseudoTerminal from "./Terminal";
import TerminalHint from "./TerminalHint";
import { Terminal as TerminalIcon, X, Menu } from "lucide-react";

const NAV_SECTIONS = ["a propos", "experiences", "competences", "projets", "me contacter"];

const Navigation = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const terminalButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenTerminal = () => {
    setIsMobileMenuOpen(false);
    setIsTerminalOpen(true);
  };

  return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo / Hostname */}
              <div className="flex items-center gap-2 text-primary min-w-0">
                <span className="font-mono text-sm sm:text-base lg:text-lg font-bold terminal-cursor truncate">
                  4rsi@fl4fl4:~/web/portfolio$
                </span>
              </div>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {NAV_SECTIONS.map((section) => (
                    <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className="text-xs lg:text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors relative group"
                    >
                      <span className="relative">
                        {section}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </button>
                ))}

                {/* Bouton Terminal */}
                <button
                    ref={terminalButtonRef}
                    onClick={handleOpenTerminal}
                    className="ml-2 p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/40 transition-colors duration-200"
                    aria-label="Open Terminal"
                >
                  <TerminalIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile right actions */}
              <div className="flex md:hidden items-center gap-2">
                <button
                    onClick={handleOpenTerminal}
                    className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/40 transition-colors duration-200"
                    aria-label="Open Terminal"
                >
                  <TerminalIcon className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-full bg-muted/50 text-foreground hover:bg-muted transition-colors duration-200"
                    aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_SECTIONS.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-left w-full px-3 py-3 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded"
                  >
                    <span className="text-primary mr-2">›</span>
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
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