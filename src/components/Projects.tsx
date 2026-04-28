import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Filter, Code, Zap, Shield, Loader, FlaskRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_PROJECT_COUNT = 4;
const PROJECTS_INCREMENT = 4;

const ALL_PROJECTS = [
  {
    title: "Portfolio de stage de S4",
    description: "Portfolio de compte rendu de stage de S4, réalisé avec AstroJS. Projet front et qui permet d'expliquer d'un point de vue compétences, mon stage de Semestre 4",
    tags: ["Astro", "Tailwind", "Pnpm", "Frontend", "Portfolio"],
    category: "WebDev",
    githubUrl: "https://github.com/sirthirrygolooo/portfolio-s4",
    liveUrl: "https://portfolio-s4-gamma.vercel.app/",
    icon: Shield,
  },
  {
    title: "Sécurité en Apprentissage automatique",
    description: "Sujet de stage de semestre 4 portant sur les attaques \"adversaires\" et \"backdoor\" en Deep Learning sur de la classification d'images, avec implémentation de plusieurs méthodes d'attaque et de défense.",
    tags: ["PyTorch", "Deep Learning","CNN", "Adversarial Attacks", "AI Security", "Machine Learning", "IBM ART"],
    category: "Security",
    githubUrl: "https://github.com/sirthirrygolooo/MLsecurity",
    liveUrl: null,
    icon: Code,
  },
  {
    title: "Version Alpha de mon portfolio (HTML/CSS)",
    description: "Première version de portfolio, non adoptée in fine car il ne me représentait pas vraiment.",
    tags: ["Astro", "TailWind", "Frontend", "Portfolio"],
    category: "WebDev",
    githubUrl: "https://github.com/sirthirrygolooo/PortfolioS5V2",
    liveUrl: "https://jean-baptiste-portfolio-bice.vercel.app/",
    icon: Zap,
  },
  {
    title: "ProCreate: Projet de cours IA",
    description: "Projet de cours d'IA mélant Chatbot (LLM) et classification d'images sur la base d'un dataset RGB.",
    tags: ["PyTorch", "CNN", "RGB Images", "Image Classification", "Deep Learning"],
    category: "AI",
    githubUrl: "https://github.com/rCaruhel/S5IA_ProCreate",
    icon: Code,
  },
  {
    title: "TouilleurDeVidéo: Projet de cours Programmation Média",
    description: "Projet visant à faire du chiffrement/déchiffrement vidéo en temps réel via différents algos. (Même principe que chiffrement canal+ à l'ancienne)",
    tags: ["Java", "OpenCV","JavaFX", "Video Processing", "Media Programming"],
    category: "WebDev",
    githubUrl: "https://github.com/sirthirrygolooo/TouilleurDeVideo",
    liveUrl: null,
    icon: Code,
  },
  {
    title: "BIP - Projets et codes Webot",
    description: "Mes projets sur webot, dans le cadre d'un Blended Intensive Program sur l'IA et la robotique",
    tags: ["Computer Vision", "SLAM", "LIDAR", "Robotics", "Webot", "Path Following"],
    category: "Other",
    githubUrl: "https://github.com/sirthirrygolooo/WEBOT_projects_BIP",
    liveUrl: null,
    icon: Shield,
  },
  {
    title: "BIP - Code Projet - #tests",
    description: "Partie webot de tests pour le rendu final du projet",
    tags: ["Computer Vision", "SLAM", "LIDAR", "Robotics", "Webot", "Path Following"],
    category: "AI",
    githubUrl: "https://github.com/aqfel/AI-in-Robotics/tree/Tests",
    liveUrl: null,
    icon: Shield,
  },
  {
    title: "Analyse de Dataset - CICIoV2024 - Voitures connectées",
    description: "Analyse et classification de données issues de BUS CAN pour analyse des différentes attaques réseau sur véhicules connectés.(Quelle attaque sur quel composant et quel type)",
    tags: ["ML", "Python", "Tree", "Apprentissage supervisé", "Regression linéaire", "RandomForest", "XGBoost", "LightGBM"],
    category: "AI",
    githubUrl: "https://github.com/sirthirrygolooo/CICIoV2024-Dataset-Analysis-Project",
    liveUrl: null,
    icon: Shield,
  },
  {
    title: "Discord X operaGX Nitro Exploit",
    description: "Projet que j'avais fait pour me familiariser avec les requêtes web en python et les proxys. Petit exploit sur un partenariat entre l'application Discord et l'application OperaGX qui permet de générer à volonté des liens nitro (version payante discord). [PLUS A JOUR : PARTENARIAT FINI]",
    tags: ["Discord", "Python", "Requêtes", "Proxies"],
    category: "Security",
    githubUrl: "https://github.com/sirthirrygolooo/CICIoV2024-Dataset-Analysis-Project",
    liveUrl: null,
    icon: Shield,
  },
  {
    title: "DDoSCord : Projet à visée éducative uniquement",
    description: "Projet que j'avais fait à l'époque pour mieux comprendre python et le fonctionnement de discord. Il récupère globalement beaucoup d'informations et quelques mots de passe si exécuté sur une machine windows [PLUS A JOUR NON PLUS] (discord a évolué en matière de sécurité)",
    tags: ["Discord", "Cryptography", "TokenGrab", "Proxies"],
    category: "Security",
    githubUrl: "https://github.com/sirthirrygolooo/DDosCord",
    liveUrl: null,
    icon: Shield,
  },
];

const CATEGORY_MAP = {
  All: { label: "TOUS", icon: Filter, color: "text-gray-400" },
  WebDev: { label: "WEB/APP", icon: Code, color: "text-blue-500" },
  AI: { label: "IA/MACHINE LEARNING", icon: Zap, color: "text-red-500" },
  Security: { label: "CYBERSÉCURITÉ", icon: Shield, color: "text-green-500" },
  Other: { label: "AUTRE", icon: FlaskRoundIcon, color: "text-gray-400" },
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projectsToShow, setProjectsToShow] = useState(INITIAL_PROJECT_COUNT);

  const filteredProjects = useMemo(() => {
    const filtered = ALL_PROJECTS.filter(project => {
      if (activeCategory === "All") return true;
      return project.category === activeCategory;
    });

    return filtered;
  }, [activeCategory]);

  const projectsToDisplay = filteredProjects.slice(0, projectsToShow);

  const hasMoreProjects = projectsToShow < filteredProjects.length;

  const handleLoadMore = () => {
    setProjectsToShow(prevCount => prevCount + PROJECTS_INCREMENT);
  };

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setProjectsToShow(INITIAL_PROJECT_COUNT);
  };


  return (
      <section id="projets" className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Parallax Grid Background */}
        <div className="absolute inset-0 z-0 grid-background opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Entête Terminal */}
            <div className="font-mono text-primary text-xs sm:text-sm mb-4">
              <span className="terminal-cursor">$ cat projects.log | grep "{activeCategory}"</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              ARCHIVES <span className="text-primary">PROJETS</span>
            </h2>

            {/* Zone de Filtrage */}
            <div className="flex flex-wrap gap-3 mb-12">
              {Object.keys(CATEGORY_MAP).map((key) => {
                const map = CATEGORY_MAP[key];
                return (
                    <Button
                        key={key}
                        // Utilise la nouvelle fonction de changement de catégorie
                        onClick={() => handleCategoryChange(key)}
                        variant={activeCategory === key ? "default" : "secondary"}
                        className={`font-mono text-xs h-8 ${activeCategory === key ? 'bg-primary hover:bg-primary/90' : 'bg-card hover:bg-muted/50 border border-border'}`}
                    >
                      <map.icon className={`w-3 h-3 mr-2 ${map.color}`} />
                      {map.label}
                    </Button>
                );
              })}
            </div>

            {/* Affichage des Projets */}
            <div className="grid md:grid-cols-2 gap-8">
              {projectsToDisplay.map((project, index) => { // Utilisation de projectsToDisplay
                const categoryInfo = CATEGORY_MAP[project.category] || CATEGORY_MAP.All;

                return (
                    <div
                        key={index}
                        className="bg-card border border-border p-6 shadow-lg hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Scanline effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear pointer-events-none"></div>

                      <div className="relative z-10 flex flex-col h-full">
                        {/* En-tête de la Carte */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <categoryInfo.icon className={`w-4 h-4 ${categoryInfo.color}`} />
                            <span className={`font-mono text-xs ${categoryInfo.color}`}>
                                                [{categoryInfo.label}]
                                            </span>
                          </div>

                          {/* Liens (GitHub & Live) */}
                          <div className="flex gap-2">
                            {project.githubUrl && (
                                <Button size="icon" variant="ghost" className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                                    <Github className="w-4 h-4" />
                                  </a>
                                </Button>
                            )}
                            {project.liveUrl && (
                                <Button size="icon" variant="ghost" className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </Button>
                            )}
                          </div>
                        </div>

                        {/* Contenu */}
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors flex items-start gap-2">
                          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                             <Code className="w-4 h-4" />
                          </span>
                          <span className="leading-tight -ml-6 group-hover:ml-0 transition-all duration-300">{project.title}</span>
                        </h3>

                        <p className="text-sm text-muted-foreground mb-6 flex-grow">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-4 border-t border-border pt-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                                <span
                                    key={tagIndex}
                                    className="px-2 py-0.5 text-xs font-mono bg-muted/50 text-foreground rounded border border-border flex items-center gap-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-default"
                                >
                                    <span className="text-primary font-bold opacity-70 group-hover:opacity-100">&gt;</span>
                                    {tag}
                                </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>

            {/* Bouton Charger Plus */}
            {hasMoreProjects && (
                <div className="mt-12 text-center">
                  <Button
                      onClick={handleLoadMore}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono tracking-wide transition-all duration-300"
                  >
                    <Loader className="w-4 h-4 mr-2 animate-spin-slow" />
                    CHARGER PLUS DE PROJETS ({filteredProjects.length - projectsToShow} RESTANTS)
                  </Button>
                </div>
            )}

            {/* Message si aucun projet */}
            {filteredProjects.length === 0 && (
                <div className="text-center p-12 border border-dashed border-border text-muted-foreground font-mono">
                  <p>ERREUR 404: Aucun projet trouvé dans la catégorie `{CATEGORY_MAP[activeCategory]?.label || activeCategory}`.</p>
                </div>
            )}
          </div>
        </div>
      </section>
  );
};

export default Projects;