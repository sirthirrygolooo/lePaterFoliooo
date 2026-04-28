import React from 'react';
import { Briefcase, Calendar, MapPin, Building, Code } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Stage en Sécurité et Apprentissage Machine",
      company: "IUT Nord Franche-Comté / Femto-ST",
      location: "Belfort",
      date: "S4",
      description: "Travail sur la sécurité des modèles d'Apprentissage Machine (Machine Learning). Travail sur des réseaux neuronaux, principalement convolutifs, et recherches de techniques pour renforcer la robustesse des algorithmes face à différents types d'attaques.",
      skills: ["Python", "Machine Learning", "PyTorch", "CyberSécurité"]
    },
    {
      title: "Développement d'un outil IA au profit de l'animation d'exercices d'entrainement de Postes de Commandement",
      company: "Ministère des Armées",
      location: "Besançon",
      date: "S5/S6",
      skills: ["Python", "Javascript", "React", "LLM", "RAG"]
    }
  ];

  return (
    <section id="experiences" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-primary text-sm mb-4">
            <span className="terminal-cursor">$ cat /profile/experiences.log</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            MES <span className="text-primary">EXPÉRIENCES</span>
          </h2>

          <div className="relative border-l-2 border-primary/30 ml-3 md:ml-6 space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>

                <div className="bg-card border border-border p-6 shadow-md hover:border-primary/50 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground font-mono">
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-mono bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap">
                      <Calendar className="w-4 h-4" />
                      {exp.date}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                    <div className="w-full flex items-center gap-2 mb-2 text-sm text-primary font-mono">
                      <Code className="w-4 h-4" />
                      <span>Technologies utilisées :</span>
                    </div>
                    {exp.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="text-xs font-mono px-2 py-1 bg-muted rounded border border-border text-foreground">
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
