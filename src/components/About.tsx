import React, { useState } from 'react'; // Ajout de useState
import { Shield, Brain, Rocket, Code, Database } from "lucide-react";
import { Button } from '@/components/ui/button'; // Assurez-vous que Button est bien importé

const About = () => {
  const [copyStatus, setCopyStatus] = useState(false); // État pour la confirmation de copie

  const interests = [
    {
      icon: Shield,
      title: "Module: CyberSécurité",
      description: "Point central de mes intérêts. J'aime découvrir et tenter de relever les différents challenges que l'on peut trouver en ligne (Root-Me, HackTheBox, OWASP Apps...) pour tester mes compétences ou plus généralement me casser les méninges.",
      color: "text-green-500",
    },
    {
      icon: Brain,
      title: "Module: Apprentissage Machine",
      description: "Sur ce domaine, je me suis particulièrement essayé dans un premier temps à de la prédiction de données via des modèles supervisés (Régression, SVM, Forêts Aléatoires) sur des sujets de sécurité (ex: voitures autonomes) avant de m'intéresser à la sécurité des modèles eux-mêmes au travers de mon stage, et donc découvrir le principe de réseaux neuronaux.",
      color: "text-red-500",
    },
    {
      icon: Database,
      title: "Module: Développement Web",
      description: "J'aime également beaucoup développer mon côté créatif au travers de développement Front, comme par exemple ce portfolio. J'avais réalisé une première version que je trouvais trop 'lisse' et 'classique' et qui ne reflétait pas assez mes centres d'intérets. Je pense que à l'inverse, celui la représente assez bien ce qui m'anime en informatique. ",
      color: "text-blue-500",
    },
    {
      icon: Rocket,
      title: "En conclusion ?",
      description: "J'aime chercher, découvrir de nouvelles choses et exprimer mes découvertes et ce qui se passe dans ma tête au travers de projets visuels et davantage axés créatifs. Ceux-ci se font plus rare, mais correspondent strictement à ce que j'aime et à ce que j'imagine.",
      color: "text-yellow-500",
    },
  ];

  const stats = [
    { label: "Année d'étude", value: "3ème année" },
    { label: "Languages principaux", value: "Java, Python" },
    { label: "Points Root-Me 💀", value: "845" },
    { label: "Domaines favoris", value: "Cybersécurité & IA" }
  ];

  // NOUVELLE FONCTION DE COPIE (CORRIGÉE)
  const handleCopyCommand = async () => {
    const commandToCopy = "cat about.txt";

    // 1. Utilisation de la méthode moderne navigator.clipboard (la plus fiable et sans défilement)
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(commandToCopy);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
      } catch (err) {
        console.error('Erreur lors de la copie moderne:', err);
      }
    } else {
      // 2. Fallback pour les environnements plus anciens ou non sécurisés (CORRIGÉ SANS DÉFILEMENT)
      const textArea = document.createElement("textarea");
      textArea.value = commandToCopy;

      // Positionner l'élément hors écran pour éviter le défilement et le rendu visuel
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopyStatus(true);
          setTimeout(() => setCopyStatus(false), 2000);
        } else {
          console.warn('La commande execCommand("copy") a échoué.');
        }
      } catch (err) {
        console.error('Erreur lors de la copie du presse-papier (fallback):', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
      <section id="a propos" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-primary text-sm mb-4">
              <span className="terminal-cursor">$ cat about.txt | grep jean_baptiste</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              QUI <span className="text-primary">SUIS-JE ?</span>
            </h2>

            <div className="grid lg:grid-cols-3 gap-12">

              <div className="lg:col-span-2 space-y-8">

                <div className="bg-card border border-border p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary font-mono">
                    <Code className="w-5 h-5" />
                    <span className="text-foreground">Portfolio.about(jean_baptiste)</span>
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Salut ! Moi c'est Jean-Baptiste. Je suis actuellement étudiant en 3ème année de B.U.T Informatique et un jeune développeur qui s'intéresse tout particulièrement aux domaines de la sécurité informatique, de la Défense et de l'Intelligence Artificielle.

                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                    J'aimerais d'ailleurs plus tard travailler dans le domaine de la Cyberdéfense, mot qui se traduit par l'ensemble des moyens de défense et d'attaque dans le cyberespace, mis en place par un pays pour protéger les Systèmes d'Informations (SI) jugés essentiels.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                    Pour apprendre dans ce domaine, je fais donc beaucoup de veille informatique, de CTF en ligne, et des projets variés pour creuser différents aspects qui m'intéressent.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                    Mon stage de S4 sur la sécurité en Apprentissage Machine 'Machine Learning' m'a également ouvert de nouvelles perspectives passionnantes car m'a montré également l'importance de la sécurité dans le domaine de l'IA, d'autant plus que c'est un secteur en pleine expansion avec des enjeux cruciaux pour l'avenir.
                  </p>

                  <br></br>
                  <hr></hr>
                  <div className="mt-6 font-mono text-sm">
                    <span className="text-primary">[↺ IN_PROGRESS]</span>
                    <a href="https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/les-principales-filieres-d-etudes-superieures/les-but-bachelors-universitaires-de-technologie" target="_blank" className="text-foreground underline ml-2 hover:text-primary transition-colors">
                      Blended Intensive Program IA & robotic @ [Erasmus +] @ Oct 2025/Jan 2026
                    </a>
                  </div>
                  <div className="mt-6 font-mono text-sm">
                    <span className="text-primary">[↺ IN_PROGRESS]</span>
                    <a href="https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/les-principales-filieres-d-etudes-superieures/les-but-bachelors-universitaires-de-technologie" target="_blank" className="text-foreground underline ml-2 hover:text-primary transition-colors">
                      B.U.T Informatique @ [IUT NFC Belfort]
                    </a>
                  </div>
                  <div className="mt-6 font-mono text-sm">
                    <span className="text-primary">[✓ DONE]</span>
                    <a href="https://fr.wikipedia.org/wiki/Dipl%C3%B4me_universitaire_de_technologie" target="_blank" className="text-foreground underline ml-2 hover:text-primary transition-colors">
                      Diplôme Universitaire de Technologie @ [IUT NFC Belfort] @ 2025
                    </a>
                  </div>
                  <div className="mt-6 font-mono text-sm">
                    <span className="text-primary">[✓ DONE]</span>
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
                      &ldquo;Seul on va plus vite, ensemble on va plus loin&rdquo;
                    </p>
                    <p className="text-xs mt-2 text-primary/70">— Devise Personnelle</p>
                  </div>

                  {/* Bloc de l'Easter Egg (cliquable) */}
                  <div
                      className={`border p-4 font-mono text-sm transition-all duration-200 cursor-pointer ${copyStatus ? 'border-green-500 bg-green-900/40 text-green-300' : 'border-primary/50 bg-primary/10 text-primary hover:bg-primary/20'}`}
                      onClick={handleCopyCommand}
                      title="Click to copy command"
                  >
                    <p className="italic">
                      {copyStatus ? 'COMMANDE COPIÉE ! (Ctrl+V dans le terminal)' : 'Un “cat about.txt” dans le terminal pourrait t\'en apprendre davantage sur moi...'}
                    </p>
                    <p className="text-xs mt-2 text-primary/70">
                      — Petit secret {copyStatus ? '✅' : '😉'}
                    </p>
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