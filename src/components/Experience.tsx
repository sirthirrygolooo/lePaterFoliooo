import React from 'react';
import { Briefcase, Calendar, MapPin, Building, Code, Terminal, ChevronRight } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Développement d'un outil IA au profit de l'animation d'exercices pour l'entrainement de Postes de Commandement (PC)",
      company: "Ministère des Armées",
      location: "Besançon",
      date: "S5/S6",
      status: "IN_PROGRESS",
      description: "Conception et développement complet d'une solution basée sur l'Intelligence Artificielle pour assister à l'animation d'exercices militaires. Utilisation de modèles de langage (LLM) et de techniques de Retrieval-Augmented Generation (RAG).",
      skills: ["Python", "Javascript", "React", "LLM", "RAG"]
    },
    {
      title: "Stage en Sécurité et Apprentissage Machine",
      company: "IUT Nord Franche-Comté / Femto-ST",
      location: "Belfort",
      date: "S4",
      status: "DONE",
      description: "Travail sur la sécurité des modèles d'Apprentissage Machine (Machine Learning). Travail sur des réseaux neuronaux, principalement convolutifs, et recherches de techniques pour renforcer la robustesse des algorithmes face à différents types d'attaques.",
      skills: ["Python", "Machine Learning", "PyTorch", "CyberSécurité"]
    },
  ];

  return (
    <section id="experiences" className="py-24 bg-background relative overflow-hidden">
      {/* Parallax Grid Background */}
      <div className="absolute inset-0 z-0 grid-background opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-primary text-xs sm:text-sm mb-4 truncate">
            <span className="terminal-cursor">$ cat /profile/experiences.log | grep --color=auto "work"</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16">
            MES <span className="text-primary">EXPÉRIENCES</span>
          </h2>

          <div className="relative border-l-2 border-primary/30 ml-3 sm:ml-6 space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-6 sm:pl-12 group">
                {/* Timeline dot avec animation si IN_PROGRESS */}
                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-primary ${exp.status === 'IN_PROGRESS' ? 'bg-primary shadow-[0_0_10px_var(--primary)] animate-pulse' : 'bg-background'}`}></div>
                
                <div className="bg-card border border-border p-6 shadow-md hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 relative overflow-hidden">
                  
                  {/* Effet de scanline en arrière-plan au survol */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-start gap-2">
                        <Terminal className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span className="leading-tight">{exp.title}</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground font-mono">
                        <span className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Building className="w-4 h-4" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1 text-sm font-mono bg-primary/10 text-primary px-3 py-1 rounded border border-primary/20">
                        <Calendar className="w-4 h-4" />
                        {exp.date}
                      </div>
                      {/* Statut façon terminal */}
                      <div className="font-mono text-xs font-bold">
                        {exp.status === "IN_PROGRESS" ? (
                          <span className="text-yellow-500">[↺ IN_PROGRESS]</span>
                        ) : (
                          <span className="text-primary">[✓ DONE]</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    {exp.description && (
                      <p className="text-muted-foreground mb-5 pl-7 border-l-2 border-muted">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50 relative z-10">
                    <div className="w-full flex items-center gap-2 mb-2 text-sm text-primary font-mono">
                      <Code className="w-4 h-4" />
                      <span>Stack_Technologique :</span>
                    </div>
                    {exp.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="text-xs font-mono px-2 py-1 bg-muted/50 rounded border border-border text-foreground flex items-center gap-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-default"
                      >
                        <ChevronRight className="w-3 h-3 text-primary group-hover:text-current opacity-70" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
