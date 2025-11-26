import React from 'react';
import { Shield, Brain, Radio, Code, Database, Rocket } from "lucide-react";

const About = () => {

  // Données des modules d'intérêt
  const interests = [
    {
      icon: Shield,
      title: "Module: Sec-Vulnerabilities",
      description: "Point central de mes intérêts. J'aime découvrir et tenter de relever les différents challenges du domaine (CTF, Bug Bounty) pour approfondir mes connaissances et éprouver ma créativité.",
      color: "text-green-500",
    },
    {
      icon: Brain,
      title: "Module: AI-DeepLearning",
      description: "Principalement en Machine Learning et Deep Learning, j'explore l'IA au travers de projets variés (PyTorch/TensorFlow), allant de la classification à la génération complexe.",
      color: "text-red-500",
    },
    {
      icon: Database,
      title: "Module: Web-Architecture",
      description: "Au-delà du code, j'ai une forte appétence pour la conception de systèmes backend robustes et performants, utilisant des architectures modernes (Microservices, REST/gRPC, Cloud).",
      color: "text-blue-500",
    },
    {
      icon: Rocket,
      title: "Module: Mes couilles en ski",
      description: "Je sais plus quoi dire la ça me tabasse les burnes",
      color: "text-yellow-500",
    },
  ];

  const stats = [
    { label: "Année d'étude", value: "3ème année" },
    { label: "Repos Github", value: "53" },
    { label: "Languages principaux", value: "Java, Python" },
    { label: "Domaines favoris", value: "Cybersécurité & IA" },
  ];

  return (
      <section id="a propos" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-primary text-sm mb-4">
              <span className="terminal-cursor">$ cat about.txt | grep 4rsi</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              QUI <span className="text-primary">SUIS-JE ?</span>
            </h2>

            <div className="grid lg:grid-cols-3 gap-12">

              <div className="lg:col-span-2 space-y-8">

                <div className="bg-card border border-border p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary font-mono">
                    <Code className="w-5 h-5" />
                    <span className="text-foreground">Portfolio.about(4rsi)</span>
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Salut ! Moi c'est Jean-Baptiste. Je suis actuellement étudiant en 3ème année de B.U.T Informatique et développeur passionné par la sécurité informatique.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                    J'aimerais plus tard travailler dans le domaine de la sécurité informatique. (Faudra que je developpe bien plus cette section)
                  </p>

                  <br></br>
                  <hr></hr>

                  <div className="mt-6 font-mono text-sm">
                    <span className="text-primary">[IN_PROGRESS]</span>
                    <a href="https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/les-principales-filieres-d-etudes-superieures/les-but-bachelors-universitaires-de-technologie" target="_blank" className="text-foreground underline ml-2 hover:text-primary transition-colors">
                      B.U.T Informatique @ [IUT NFC Belfort]
                    </a>
                  </div>
                  <div className="mt-6 font-mono text-sm">
                    <span className="text-primary">[DONE]</span>
                    <a href="https://fr.wikipedia.org/wiki/Dipl%C3%B4me_universitaire_de_technologie" target="_blank" className="text-foreground underline ml-2 hover:text-primary transition-colors">
                      Diplôme Universitaire de Technologie @ [IUT NFC Belfort] @ 2025
                    </a>
                  </div>
                  <div className="mt-6 font-mono text-sm">
                    <span className="text-primary">[DONE]</span>
                    <a href="#" target="_blank" className="text-foreground underline ml-2 hover:text-primary transition-colors">
                      BAC Général @ [Spé Maths/NSI] @ 2022
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">▸</span>
                    CENTRES <span className="text-foreground">D'INTERETS</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {interests.map((interest, index) => (
                        <div
                            key={index}
                            className="bg-card border border-border p-5 hover:border-primary/50 transition-all duration-300 group flex items-start space-x-4"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <interest.icon className={`w-6 h-6 shrink-0 mt-1 ${interest.color} group-hover:scale-110 transition-transform`} />
                          <div>
                            <h3 className="text-base font-mono font-bold mb-1 text-primary">{interest.title}</h3>
                            <p className="text-sm text-muted-foreground">{interest.description}</p>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6"> {/* Ajout de sticky pour un meilleur effet */}
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 font-mono">
                    <span className="text-primary">//</span>
                    <span className="text-lg uppercase">...Statistiques de profil</span>
                  </h3>

                  <div className="border border-border p-6 bg-muted/30 space-y-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-b-0 last:pb-0">
                          <span className="font-mono text-xs text-muted-foreground uppercase">{stat.label}:</span>
                          <span className="font-mono text-sm text-primary">{stat.value}</span>
                        </div>
                    ))}
                  </div>

                  {/* Bloc d'information supplémentaire / Citation */}
                  <div className="border border-primary/50 p-4 bg-primary/10 font-mono text-sm text-primary">
                    <p className="italic">
                      &ldquo;Toujours baisé, jamais surpris&rdquo;
                    </p>
                    <p className="text-xs mt-2 text-primary/70">— Devise Personnelle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default About;