const Skills = () => {
  const skillCategories = [
    {
      category: "CYBERSECURITY",
      skills: [
        { name: "Network Security", level: 85 },
        { name: "Penetration Testing", level: 75 },
        { name: "Cryptography", level: 70 },
        { name: "Security Auditing", level: 80 },
      ],
    },
    {
      category: "ARTIFICIAL INTELLIGENCE",
      skills: [
        { name: "Machine Learning", level: 80 },
        { name: "Deep Learning", level: 70 },
        { name: "NLP", level: 65 },
        { name: "Computer Vision", level: 60 },
      ],
    },
    {
      category: "TECHNICAL OPERATIONS",
      skills: [
        { name: "Python", level: 90 },
        { name: "Linux/Unix", level: 85 },
        { name: "Network Protocols", level: 80 },
        { name: "System Architecture", level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-primary text-sm mb-4">
            <span className="terminal-cursor">$ ls -la /skills</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            TECHNICAL <span className="text-primary">ARSENAL</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="space-y-6">
                <h3 className="font-mono text-lg text-primary border-b border-border pb-2">
                  [{category.category}]
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${(catIndex * 4 + skillIndex) * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
