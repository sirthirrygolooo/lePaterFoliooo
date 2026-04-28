import React from 'react';
import { Layers, Zap, Code, CheckCircle, Clock, Server, Star, Globe, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SkillStatus = ({ name, level, description }) => {
  let status = { text: "Staging", color: "text-yellow-500", icon: Clock, dots: 3 };

  if (level >= 85) {
    status = { text: "😎", color: "text-green-500", icon: CheckCircle, dots: 5 };
  } else if (level >= 70) {
    status = { text: "😁", color: "text-cyan-400", icon: Server, dots: 4 };
  } else if (level <= 60) {
    status = { text: "🥴", color: "text-red-500", icon: Star, dots: 2 };
  }

  const ProgressDots = () => (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i < status.dots ? status.color.replace('text-', 'bg-') : 'bg-muted-foreground/30'
                }`}
            />
        ))}
      </div>
  );

  return (
      <div className="py-2 border-b border-border/70">
        <div className="flex justify-between items-center mb-1">
          <span className="font-mono text-sm text-foreground">{name}</span>
          <span className={`text-xs font-mono flex items-center gap-1 ${status.color}`}>
                    <status.icon className="w-3 h-3" />
            {status.text}
                </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground italic">{description}</p>
          <ProgressDots />
        </div>
      </div>
  );
};
// ------------------------------------

const LanguageLevel = ({ name, level, description }) => {
  const levelMap = {
    'C2': 5,
    'C1': 4,
    'B2': 3,
    'B1': 2,
    'A2': 1,
  };
  const stars = levelMap[level] || 0;

  return (
      <div className="flex justify-between items-start border-l-2 border-primary pl-4 py-2 hover:bg-muted/20 transition-colors">
        <div>
          <span className="font-semibold text-base block">{name}</span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
        <div className="flex space-x-1 text-sm pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
              <span
                  key={i}
                  className={i < stars ? 'text-yellow-400' : 'text-gray-600 dark:text-gray-700'}
              >
                        ●
                    </span>
          ))}
        </div>
      </div>
  );
};


const Skills = () => {
  const skillCategories = [
    {
      category: "langages.json",
      type: "status",
      icon: Code,
      skills: [
        { name: "Python", level: 90, description: "Mon langage de cœur pour l'IA et le scripting." },
        { name: "Java", level: 90, description: "Langage principal utilisé pour les projets d'architecture." },
        { name: "Javascript", level: 75, description: "Frontend et Web services." },
        { name: "HTML/CSS", level: 85, description: "Développement d'interfaces utilisateur modernes." },
        { name: "C/C++", level: 35, description: "Compétences de bas niveau, idéal pour la performance critique." },
      ],
    },
    {
      category: "AI.pth",
      type: "status",
      icon: Cpu,
      skills: [
        { name: "Machine Learning", level: 70, description: "Connaissances générales et implémentation d'algorithmes classiques." },
        { name: "PyTorch", level: 70, description: "Framework favori pour la conception de réseaux de neurones." },
        { name: "TensorFlow/Keras", level: 30, description: "Utilisé sur un projet académique majeur." },
        { name: "Computer Vision", level: 60, description: "Application en robotique (LIDAR/SLAM) et traitement d'images." },
      ],
    },
    {
      category: "utils.sys",
      type: "status",
      icon: Server,
      skills: [
        { name: "Linux/Unix", level: 90, description: "Maîtrise complète de l'environnement, essentiel pour la sécurité." },
        { name: "Docker", level: 78, description: "Conteneurisation et déploiement d'applications." },
        { name: "Git", level: 90, description: "Maîtrise des workflows complexes et du contrôle de version." },
        { name: "CI/CD", level: 60, description: "Mise en place de pipelines de déploiement automatisé (GitLab/GitHub Actions)." },
      ],
    },

    {
      category: "i18n.locale",
      type: "lang",
      icon: Globe,
      skills: [
        { name: "Français", level: "C2", description: "Langue maternelle" },
        { name: "Anglais", level: "B2", description: "Fluide, Professionnel" },
        { name: "Allemand", level: "B1", description: "Notions de base - Lycée" },
      ],
    },
  ];

  return (
      <section id="competences" className="py-24 bg-background relative overflow-hidden">
        {/* Parallax Grid Background */}
        <div className="absolute inset-0 z-0 grid-background opacity-10 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Entête Terminal */}
            <div className="font-mono text-primary text-sm mb-4">
              <span className="terminal-cursor">$ cat /profile/tech_skills.list</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-16">
              RÉSUMÉ <span className="text-primary">TECHNIQUE</span>
            </h2>

            <div className="grid lg:grid-cols-4 gap-12">

              <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
                {skillCategories.filter(c => c.type === 'status').map((category, catIndex) => (
                    <div key={catIndex} className="space-y-6 bg-card p-4 border border-border rounded-lg shadow-md hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 relative overflow-hidden group">
                      
                      {/* Scanline effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear pointer-events-none"></div>

                      <div className="relative z-10">
                        <h3 className="font-mono text-lg text-primary border-b border-border pb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                          <category.icon className='w-5 h-5'/>
                          [{category.category.toUpperCase()}]
                        </h3>

                        <div className="space-y-4 pt-2">
                          {category.skills.map((skill, skillIndex) => (
                              <SkillStatus
                                  key={skillIndex}
                                  name={skill.name}
                                  level={skill.level}
                                  description={skill.description}
                              />
                          ))}
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              <div className="lg:col-span-1 space-y-8">

                {skillCategories.filter(c => c.type === 'lang').map((category, catIndex) => (
                    <div key={`lang-${catIndex}`} className="space-y-6 bg-card p-4 border border-border rounded-lg shadow-md hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 relative overflow-hidden group">
                      
                      {/* Scanline effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear pointer-events-none"></div>

                      <div className="relative z-10">
                        <h3 className="font-mono text-lg text-primary border-b border-border pb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                          <category.icon className='w-5 h-5'/>
                          [{category.category.toUpperCase()}]
                        </h3>

                        <div className="space-y-3 pt-2">
                          {category.skills.map((skill, skillIndex) => (
                              <LanguageLevel
                                  key={skillIndex}
                                  name={skill.name}
                                  level={skill.level}
                                  description={skill.description}
                              />
                          ))}
                        </div>
                      </div>
                    </div>
                ))}

                {/* Bloc d'information statique pour combler l'espace */}
                <div className="border border-primary/50 p-4 bg-primary/10 font-mono text-xs text-primary rounded-lg shadow-inner">
                  <p>
                    <span className="text-secondary-foreground">[R&D]</span>
                    &gt; Légende :
                  </p>
                  <p className="mt-1">
                    &gt; 😎 - Technologie bien maitrisée<br />
                    &gt; 😁 - Technologie très familière<br />
                    &gt; 🥴 - Compétences basiques<br />
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
  );
};

export default Skills;