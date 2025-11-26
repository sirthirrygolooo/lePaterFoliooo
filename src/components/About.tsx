import { Shield, Brain, Radio } from "lucide-react";

const About = () => {
  const interests = [
    {
      icon: Shield,
      title: "Cybersécurité",
      description: "Point central de mes intérêts, j'aime découvrir et tenter de relever les différents challenges que le domaine propose, pour approfondir mes connaissances et éprouver ma créativité.",
    },
    {
      icon: Brain,
      title: "Intelligence Artificielle",
      description: "Principalement en Machine Learning et Deep Learning, j'aime explorer les différentes possibilités de l'IA au travers de pleins de projets très différents",
    },
    {
      icon: Radio,
      title: "Le milieu de la Défense",
      description: "Faut que je finisse de compléter ça plus tard...",
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-primary text-sm mb-4">
            <span className="terminal-cursor">$ cat about.txt</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            QUI <span className="text-primary">SUIS-JE ?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Salut ! Moi c'est Jean-Baptiste je suis étudiant en 3ème et dernière année de <a href="https://youtube.fr" target="_blank" className="font-bold">B.U.T Informatique</a>. Jeune développeur passionnée par la sécurité informatique, j'aime progresser dans ce domaine au travers de challenges.

          </p>

          <h2 className="text-4xl md:text-5l mb-8">Mes points d'intérêt principaux...</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <interest.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
                <p className="text-sm text-muted-foreground">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
