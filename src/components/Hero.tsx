import React, { useState } from 'react';
import { ChevronDown, Download, Github, Linkedin } from "lucide-react";
import hehe from "@/assets/hehe.gif"
import { Button } from "@/components/ui/button";

const Hero = () => {
    // État pour gérer le survol du bouton CV
    const [isHovering, setIsHovering] = useState(false);

    const scrollToAbout = () => {
        const element = document.getElementById("a propos");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    const CV_PATH = "/CV.pdf";

    // Texte conditionnel pour le bouton
    const buttonText = isHovering
        ? "wget public/CV.pdf"
        : "Télécharger mon CV";

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${hehe})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2,
                }}
            />

            <div className="absolute inset-0 z-0 grid-background opacity-50" />

            {/* Scan Line Effect (retiré car non présent dans l'input, mais ré-ajouté si vous le souhaitez) */}
            {/* <div className="absolute inset-0 z-0 scan-line pointer-events-none" /> */}

            <div className="relative z-10 container mx-auto px-6 text-center py-24">
                <div className="space-y-6 animate-fade-in">

                    <div className="font-mono text-primary text-sm mb-4">
                        <span className="terminal-cursor">$ whoami</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        <span className="text-glow">Salut !</span>
                        <br />
                        <span className="text-foreground">Moi, c'est JB</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Jeune étudiant en informatique, je m'intéresse particulièrement au domaine de la <strong>cybersécurité</strong> et de <strong>l'intelligence artificielle</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">

                        <a
                            href={CV_PATH}
                            download="FROEHLY_Jean-Baptiste_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setIsHovering(true)} // Gère l'événement de survol
                            onMouseLeave={() => setIsHovering(false)} // Gère l'événement de sortie
                            className="transition-transform duration-300 hover:scale-[1.03]" // Ajout d'une légère transition à l'ancre
                        >
                            <Button
                                variant="default"
                                className="h-12 px-6 font-mono bg-primary hover:bg-primary/90 text-primary-foreground text-base tracking-widest shadow-lg shadow-primary/20"
                            >
                                <Download className="w-5 h-5 mr-3" />
                                {buttonText} {/* Affichage du texte conditionnel */}
                            </Button>
                        </a>

                        <div className="flex gap-4 pt-4 sm:pt-0">
                            <Button variant="outline" size="icon" className="w-12 h-12 hover:bg-muted/30 border-border text-primary" asChild>
                                <a href="https://www.linkedin.com/in/jean-baptiste-froehly/" target="_blank" aria-label="Lien LinkedIn">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" className="w-12 h-12 hover:bg-muted/30 border-border text-primary" asChild>
                                <a href="https://github.com/sirthirrygolooo" target="_blank" aria-label="Lien GitHub">
                                    <Github className="w-5 h-5" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 pt-8">
                        <div className="font-mono text-sm text-muted-foreground">
                            <span className="text-primary">[STATUS]</span> En recherche de nouvelles opportunités...
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>

                </div>
            </div>

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