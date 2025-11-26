import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Filter, Code, Zap, Shield, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_PROJECT_COUNT = 4;
const PROJECTS_INCREMENT = 4;

const ALL_PROJECTS = [
  {
    title: "Version 1 portfolio (HTML/CSS)",
    description: "Première version de portfolio, mais non adoptée in fine car pas forcément assez 'personnalisée' ",
    tags: ["Astro", "TailWind", "Frontend", "Portfolio"],
    category: "WebDev",
    githubUrl: "https://github.com/sirthirrygolooo/PortfolioS5V2",
    liveUrl: "https://jean-baptiste-portfolio-bice.vercel.app/",
    icon: Zap,
  },
  {
    title: "Portfolio de stage de S4",
    description: "Portfolio de compte rendu de stage de S4, réalisé avec AstroJS.",
    tags: ["Astro", "Tailwind", "Pnpm", "Frontend", "Portfolio"],
    category: "WebDev",
    githubUrl: "https://github.com/sirthirrygolooo/portfolio-s4",
    liveUrl: "https://portfolio-s4-gamma.vercel.app/",
    icon: Shield,
  },
  {
    title: "Sécurité en Apprentissage automatique",
    description: "Sujet de stage de semestre 4 portant sur les attaques adversariales en Deep Learning, avec implémentation de plusieurs méthodes d'attaque et de défense.",
    tags: ["PyTorch", "Deep Learning", "Adversarial Attacks", "AI Security", "Machine Learning", "IBM ART"],
    category: "Security",
    githubUrl: "https://github.com/sirthirrygolooo/MLsecurity",
    liveUrl: null,
    icon: Code,
  },
  {
    title: "ProCreate: Projet de cours IA",
    description: "A developper",
    tags: ["PyTorch", "CNN", "RGB Images", "Image Classification", "Deep Learning"],
    category: "AI",
    githubUrl: "#",
    liveUrl: "#",
    icon: Code,
  },
  {
    title: "Alpha",
    description: "A completer",
    tags: ["1", "2"],
    category: "WebDev",
    githubUrl: "#",
    liveUrl: "#",
    icon: Code,
  },
  {
    title: "Bravo",
    description: "A completer",
    tags: ["1", "2"],
    category: "Security",
    githubUrl: null,
    liveUrl: "#",
    icon: Shield,
  },
];

const CATEGORY_MAP = {
  All: { label: "TOUS", icon: Filter, color: "text-gray-400" },
  WebDev: { label: "WEB/APP", icon: Code, color: "text-blue-500" },
  AI: { label: "IA/MACHINE LEARNING", icon: Zap, color: "text-red-500" },
  Security: { label: "CYBERSÉCURITÉ", icon: Shield, color: "text-green-500" },
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
      <section id="projets" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Entête Terminal */}
            <div className="font-mono text-primary text-sm mb-4">
              <span className="terminal-cursor">$ cat projects.log | grep "{activeCategory}"</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8">
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
                        className="bg-card border border-border p-6 shadow-lg hover:border-primary/50 hover:shadow-primary/10 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
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
                                <Button size="icon" variant="ghost" className="w-8 h-8 hover:bg-primary/10" asChild>
                                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                                    <Github className="w-4 h-4 text-primary" />
                                  </a>
                                </Button>
                            )}
                            {project.liveUrl && (
                                <Button size="icon" variant="ghost" className="w-8 h-8 hover:bg-primary/10" asChild>
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                                    <ExternalLink className="w-4 h-4 text-primary" />
                                  </a>
                                </Button>
                            )}
                          </div>
                        </div>

                        {/* Contenu */}
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-6 flex-grow">
                          {project.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 border-t border-border pt-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                              <span
                                  key={tagIndex}
                                  className="px-2 py-0.5 text-xs font-mono bg-muted text-muted-foreground rounded"
                              >
                                                {tag}
                                            </span>
                          ))}
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