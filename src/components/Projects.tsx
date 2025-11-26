import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Network Intrusion Detection",
      description: "ML-based system for detecting and analyzing network security threats in real-time",
      tags: ["Python", "TensorFlow", "Network Security"],
      category: "CYBERSECURITY",
    },
    {
      title: "AI Threat Intelligence",
      description: "Automated threat analysis platform using natural language processing and pattern recognition",
      tags: ["NLP", "Machine Learning", "Security"],
      category: "AI SECURITY",
    },
    {
      title: "Tactical Communication Protocol",
      description: "Secure communication framework for encrypted tactical data transmission",
      tags: ["Cryptography", "C++", "Networking"],
      category: "MILITARY TECH",
    },
    {
      title: "Vulnerability Scanner",
      description: "Comprehensive security assessment tool for identifying system vulnerabilities",
      tags: ["Penetration Testing", "Python", "Security"],
      category: "CYBERSECURITY",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-primary text-sm mb-4">
            <span className="terminal-cursor">$ cat projects.log</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            MISSION <span className="text-primary">ARCHIVES</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs text-primary">
                    [{project.category}]
                  </span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="w-8 h-8">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
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

export default Projects;
