import React from 'react';
import { Gamepad, Music, BookOpen, Utensils, Settings } from 'lucide-react';


const hobbyCategories = [
    {
        title: "Gaming / E-Sport",
        icon: Gamepad,
        data: [
            { name: "Jeux Compétitifs", value: "Tactical FPS, Stratégie (LoL, Valorant)" },
            { name: "Plateformes", value: "PC (Principal), Console (Occasionnel)" },
            { name: "Genre Préféré", value: "Mondes Ouverts / Aventure Solo" },
        ],
    },
    {
        title: "Musique & Audio",
        icon: Music,
        data: [
            { name: "Genres", value: "Electro (Ambient/House), Rock Indépendant, OSTs de Jeux Vidéo" },
            { name: "Matériel", value: "Casque Audio (Qualité HIFI), Vinyles (Collection)" },
        ],
    },
    {
        title: "Veille & Lecture",
        icon: BookOpen,
        data: [
            { name: "Domaines", value: "Vulnérabilités 0-day, Cryptographie, Futur de l'IA" },
            { name: "Format", value: "Articles (Medium, Blogs Tech), Podcasts (Anglais)" },
        ],
    },
];

const personalSettings = [
    { key: "ENVIRONMENT_THEME", value: "Dark Mode (Toujours)" },
    { key: "PRIMARY_LANGUAGE", value: "Français" },
    { key: "SECONDARY_LANGUAGE", value: "Anglais (B2/C1)" },
    { key: "STATUS", value: "En ligne / Actif" },
    { key: "COFFEE_INTAKE", value: "Critique (Niveau 3)" },
];

// ------------------------------------

const Interests = () => {
    return (
        <section id="hobbies" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Entête Terminal */}
                    <div className="font-mono text-primary text-sm mb-4">
                        <span className="terminal-cursor">$ cat user.profile | grep --personal</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-16">
                        FICHIER <span className="text-primary">PERSONNEL</span>
                    </h2>

                    <div className="grid lg:grid-cols-4 gap-12">

                        {/* Colonne 1 (3/4) : Hobbies & Intérêts (Log List) */}
                        <div className="lg:col-span-3 space-y-12">

                            {hobbyCategories.map((category, catIndex) => (
                                <div key={catIndex} className="space-y-6">
                                    <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                        <category.icon className="w-6 h-6 text-primary" />
                                        {category.title.toUpperCase()} <span className="font-mono text-base text-muted-foreground">[{catIndex + 1}/3]</span>
                                    </h3>

                                    {/* Tableau des Hobbies */}
                                    <div className="font-mono text-sm border border-border bg-card shadow-lg">

                                        {category.data.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className={`flex items-center py-3 px-4 ${itemIndex % 2 === 0 ? 'bg-muted/30' : 'bg-card'}`}
                                            >
                              <span className="text-primary w-40 shrink-0">
                                  {item.name}:
                              </span>
                                                <span className="text-foreground flex-1">
                                  {item.value}
                              </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Colonne 2 (1/4) : Paramètres/Stats Personnels */}
                        <div className="lg:col-span-1 space-y-8">

                            <h3 className="text-2xl font-bold flex items-center gap-3 font-mono">
                                <Settings className="w-5 h-5 text-primary" />
                                <span className="text-lg uppercase">User Settings</span>
                            </h3>

                            <div className="border border-border p-6 bg-muted/30 space-y-4 font-mono text-sm">
                                {personalSettings.map((setting, index) => (
                                    <div key={index} className="flex flex-col border-b border-border/50 pb-2 last:border-b-0 last:pb-0">
                                        <span className="text-primary uppercase tracking-wider">{setting.key}:</span>
                                        <span className="text-foreground ml-2">{setting.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Bloc de bas de colonne pour la conclusion */}
                            <div className="border border-primary/50 p-4 bg-primary/10 font-mono text-xs text-primary">
                                <p>
                                    <span className="text-secondary-foreground">[CONCLUSION]</span>
                                    &gt; Data gathered. Personality profile 98% complete.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Interests;