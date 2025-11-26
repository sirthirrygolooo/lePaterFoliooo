import React from 'react';

// Composant de barre de progression réutilisable (pour les compétences techniques)
const SkillBar = ({ name, level, delay }) => (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs font-mono text-muted-foreground">
                {level}%
            </span>
      </div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div
            className="h-full bg-primary transition-all duration-1000 ease-out"
            style={{
              width: `${level}%`,
              animationDelay: `${delay}ms`,
            }}
        />
      </div>
    </div>
);

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
                  className={i < stars ? 'text-green-400' : 'text-gray-600 dark:text-gray-700'}
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
      type: "bar",
      skills: [
        { name: "Python - Mon langage de coeur", level: 90 },
        { name: "Java - Langage principal", level: 90 },
        { name: "Javascript - Javascript 🤷‍♂️", level: 75 },
        { name: "HTML/CSS - ✨Frontend✨", level: 85 },
        { name: "C/C++ - Encore sous PTSD de QT ", level: 35 },
      ],
    },
    {
      category: "AI.pth",
      type: "bar",
      skills: [
        { name: "Machine Learning - Connaissances générales", level: 70 },
        { name: "PyTorch - mon ptit favori", level: 70 },
        { name: "TensorFlow/Keras - utilisé sur un projet", level: 30 },
        { name: "Computer Vision - En robotique (LIDAR/SLAM)", level: 60 },
      ],
    },
    {
      category: "utils.sys",
      type: "bar",
      skills: [
        { name: "Linux/Unix", level: 90 },
        { name: "Docker", level: 78 },
        { name: "Git", level: 90 },
        { name: "CI/CD", level: 60 },
      ],
    },
    // Catégorie Langues (utilisera le format 'lang')
    {
      category: "i18n.locale",
      type: "lang",
      skills: [
        { name: "Français", level: "C2", description: "Langue maternelle" },
        { name: "Anglais", level: "B2", description: "Fluide, Professionnel" },
        { name: "Allemand", level: "B1", description: "Notions de base - Lycée" },
      ],
    },
  ];

  return (
      <section id="competences" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Entête Terminal */}
            <div className="font-mono text-primary text-sm mb-4">
              <span className="terminal-cursor">$ cat /profile/tech_skills.list</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-16">
              RÉSUMÉ <span className="text-primary">TECHNIQUE</span>
            </h2>

            <div className="grid lg:grid-cols-4 gap-12">

              {/* 1. Bloc des Compétences Générales (3 colonnes) */}
              <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
                {skillCategories.filter(c => c.type === 'bar').map((category, catIndex) => (
                    <div key={catIndex} className="space-y-6">
                      <h3 className="font-mono text-lg text-primary border-b border-border pb-2">
                        [{category.category}]
                      </h3>

                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                            <SkillBar
                                key={skillIndex}
                                name={skill.name}
                                level={skill.level}
                                delay={(catIndex * 4 + skillIndex) * 100}
                            />
                        ))}
                      </div>
                    </div>
                ))}
              </div>

              <div className="lg:col-span-1 space-y-8">

                {/* Section Langues */}
                {skillCategories.filter(c => c.type === 'lang').map((category, catIndex) => (
                    <div key={`lang-${catIndex}`} className="space-y-6">
                      <h3 className="font-mono text-lg text-primary border-b border-border pb-2">
                        [{category.category}]
                      </h3>

                      <div className="space-y-3">
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
                ))}

              </div>

            </div>
          </div>
        </div>
      </section>
  );
};

export default Skills;