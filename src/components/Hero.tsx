import { ChevronDown } from "lucide-react";
import hehe from "@/assets/hehe.gif"

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("a propos");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${hehe})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 grid-background opacity-50" />
      
      {/* Scan Line Effect */}
      <div className="absolute inset-0 z-0 scan-line pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="space-y-6 animate-fade-in">
          <div className="font-mono text-primary text-sm mb-4">
            <span className="terminal-cursor">$ whoami</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-glow">Salut !</span>
            <br />
            <span className="text-foreground">Moi, c'est JB</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Jeune étudiant en informatique, je m'intéresse particulièrement au domaine de la <strong>cybersécurité</strong> et de <strong>l'intelligence artificielle</strong>.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-8">
            <div className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">[STATUS]</span> En recherche de nouvelles opportunités...
            </div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary hover:text-primary/70 transition-colors animate-bounce"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
