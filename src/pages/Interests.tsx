import React from 'react';
import { Gamepad, Music, BookOpen, User, Settings, Zap, Repeat, Star, Code, Shield, Brain, Mountain, Dumbbell, Home, GitBranch, Heart, Link, CheckCircle, Clock, List } from 'lucide-react'; // Ajout de List
import { Button } from "@/components/ui/button";

import profilePic from "@/assets/moi.jpg";
import placeHolder from "@/assets/cyber.jpg"


const personalInfo = {
    name: "Jean-Baptiste",
    description: "Bon ben du coup moi c'est JB ! J'aime particulièrement le métal et le vieux rock des années 80 (mon spotify wrapper me donne 62 ans 💀)... Ah et aussi le code, la cybersécurité et les jeux vidéo bien sûr !",
};

const socialLinks = [
    { key: "RootMe", url: "https://www.root-me.org/Sir_thirrygolooo?lang=fr#6bd5f588460a47903a3a0835147fe9ed", icon: Shield },
    { key: "Discord (sir_thirrygolooo)", url: null, icon: Heart },
    { key: "Instagram", url: "https://www.instagram.com/j_b.frhl/", icon: Zap },
];

const gamingContent = [
    {
        title: "Rainbow Six Siege",
        image: placeHolder,
        genre: "FPS Tactique",
        review: "Jeu de fou jusqu'à ce qu'ubisoft se dise hmmm ça manque de pièges...",
        rating: "multi",
        tags: ["Tactique", "Compétitif", "PC", "Ela Diff"],
    },
    {
        title: "League of Legends",
        image: placeHolder,
        genre: "Ex toxique",
        review: "Obligé de le mettre car j'y ai passé beaucoup trop de temps au lycée mais pitié quel jeu de con (bon je compte pas l'arena)",
        rating: 'lol',
        tags: ["MOBA", "Stratégie", "Travail d'équipe (non)"],
    },
    {
        title: "Valorant",
        image: placeHolder,
        genre: "LOL en moins puant",
        review: "Ben c'est sympa mais pas plus que nécéssaire faut doser pour pas devenir aigri de la vie",
        rating: "multi",
        tags: ["FPS", "PAN PAN", "Travail d'équipe (non plus)"],
    },
    {
        title: "Cyberpunk 2077",
        image: placeHolder,
        genre: "Action RPG / Monde ouvert",
        review: "Juste un jeu chevresque en fait ???? Ambiance, immersion, missions mémorables... Et gameplay agréable",
        rating: 5,
        tags: ["Solo", "Monde Ouvert", "Futuriste"],
    },
];

const watchContent = [
    {
        title: "Exploit Database (exploit-db.com)",
        icon: Shield,
        description: "Suivi des dernières CVE, Vulnérabilités et POOC dans le domaine de la cybersécurité.",
        tags: ["Cybersécurité", "Recherche"],
        colorClass: "text-red-400",
    },
    {
        title: "Suivi des actus cyber et tech - The Hacker News quel plaisir !",
        icon: Code,
        description: "J'aime bien me tenir à jour sur les dernières découvertes en terme de technos ou bien savoir si Free s'est encore fait dérober 2to de données utilisateurs 🥴",
        tags: ["Sécurité", "Tech", "Actualité"],
        colorClass: "text-blue-400",
    },
    {
        title: "IA et progrès",
        icon: Brain,
        description: "Je suis aussi beaucoup les progrès et différentes choses qui se font en matière d'IA. Que ce soit en matière d'IA qui recréent des tickets de caisse ou encore celle qui interprète nos rêves telle Madame Irma.",
        tags: ["IA", "Futur", "MatrixNestPasSiLoin"],
        colorClass: "text-cyan-400",
    },
];

const recentReadsContent = [
    {
        source: "It-connect.fr",
        title: "Nouvelle faille Zéro Day chez microsoft affectant les fichiers LNK sur Windows (CVE-2025-9491).",
        date: "04 Dec. 2025",
        url: "https://www.it-connect.fr/windows-zero-day-fichiers-lnk-cve-2025-9491-attenuation-microsoft/",
    },
    {
        source: "Franceinfo",
        title: "Les extorsions en ligne sont en hausse en 2025, selon un rapport",
        date: "04 Dec. 2025",
        url: "https://www.franceinfo.fr/economie/fraude/les-extorsions-en-ligne-sont-en-hausse-en-2025-selon-un-rapport_7657810.html",
    },
    {
        source: "The Hacker News",
        title:"Des paquets npm malveillants utilisent des invites et des scripts cachés pour échapper aux outils de sécurité IA",
        date: "02 Dec. 2025",
        url: "https://thehackernews.com/2025/12/malicious-npm-package-uses-hidden.html",
    },
    {
        source: "Cert-FR (organisme gouvernemental français lié à l'ANSSI)",
        title: "Vulnérabilités sur Cisco Adaptive Security Appliance (ASA) et Firewall Threat Defense (FTD).",
        date: "07 Nov. 2025",
        url: "https://www.cert.ssi.gouv.fr/alerte/CERTFR-2025-ALE-013/",
    },
    {
        source: "Cybermalveillance.gouv.fr",
        title: "2ème édition du baromètre national de la maturité cyber des TPE-PME",
        date: "06 Oct. 2025",
        url: "http://cybermalveillance.gouv.fr/tous-nos-contenus/actualites/etude-maturite-cyber-tpe-pme-2025",
    },
    {
        source: "Euronews",
        title: "Intelligence artificielle : des avancées significatives en 2025 (c'est sympa de voir si on y est ou pas)",
        date: "05 Jan. 2025",
        url: "https://fr.euronews.com/next/2025/01/05/intelligence-artificielle-des-avancees-significatives-en-2025",
    },
];
// ----------------------------------------

const hobbiesSportsContent = [
    {
        title: "Musculation / Street workout",
        image: "https://placehold.co/600x400/3b82f6/FFFFFF?text=MUSCULATION", // Placeholder image
        description: "Force et endurance, un équilibre entre le physique et le mental. Entraînement régulier et varié.",
        tags: ["Fitness", "Force", "Discipline"],
        icon: Dumbbell,
    },
    {
        title: "Course trail",
        image: "https://placehold.co/600x400/10b981/FFFFFF?text=RANDONNEE", // Placeholder image
        description: "Recharge mentale en pleine nature, découverte de nouveaux paysages et challenges physiques.",
        tags: ["Outdoor", "Exploration", "Détente"],
        icon: Mountain,
    },
    {
        title: "Randonnée",
        image: "https://placehold.co/600x400/ef4444/FFFFFF?text=Hehe", // Placeholder image
        description: "Stimulation intellectuelle intense, stratégie et anticipation. Parties rapides ou analyses profondes.",
        tags: ["Stratégie", "Mental", "Réflexion"],
        icon: GitBranch,
    },
    {
        title: "Tir et Milsim",
        image: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=MILSIM", // Exemple d'ajout
        description: "Simulation militaire et tactique. Travail d'équipe, communication et réaction rapide.",
        tags: ["Tactic", "Teamwork", "Milsim"],
        icon: Zap,
    }
];


const personalSettings = [
    { key: "ENVIRONMENT_THEME", value: "Dark Mode (Toujours)" },
    { key: "PRIMARY_LANGUAGE", value: "Français" },
    { key: "SECONDARY_LANGUAGE", value: "Anglais (B2/C1)" },
    { key: "STATUS", value: "En ligne / Actif" },
    { key: "COFFEE_INTAKE", value: "Critique (Niveau 3)" },
];

const Interests = () => {
    const RatingStars = ({ rating }) => {
        if (rating === 'lol') {
            return (
                <div className="flex items-center text-red-500 font-mono mt-2">
                    <span className="font-bold text-lg mr-2">CANCER</span>
                    <span className="text-sm text-red-400">/5</span>
                </div>
            );
        }
        if (rating === 'multi') {
            return (
                <div className="flex items-center text-blue-500 font-mono mt-2">
                    <span className="font-bold text-lg mr-2">Jeu Multi</span>
                </div>
            );
        }
        if (rating === null || rating === undefined) {
            return (
                <div className="flex items-center text-muted-foreground font-mono mt-2">
                    <span className="text-sm italic"></span>
                </div>
            );
        }
        const normalizedRating = Math.max(0, Math.min(5, parseFloat(rating)));
        return (
            <div className="flex items-center text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(normalizedRating) ? 'fill-yellow-400' : 'fill-none'}`} />
                ))}
                <span className="ml-2 text-white text-xs">{normalizedRating}/5</span>
            </div>
        );
    };

    const GamingCard = ({ title, content, image, rating }) => {
        return (
            <div
                className={`
                    bg-gray-800 border border-primary/50 shadow-xl rounded-xl overflow-hidden group 
                    transition-transform duration-300 relative h-96 md:h-80
                `}
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/400x400/444444/FFFFFF?text=JEU_IMG"; }}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="text-white">
                        <h4 className="text-2xl font-bold mb-1 border-b border-white/30 pb-1">{title}</h4>
                        <p className="text-sm text-primary mb-2">{content.genre}</p>
                        <p className="text-muted-foreground text-sm mb-3 italic">
                            "{content.review}"
                        </p>
                        <RatingStars rating={rating} />
                    </div>
                </div>
            </div>
        );
    };

    const WatchCard = ({ title, content, icon: Icon, colorClass }) => {
        return (
            <div
                className={`
                    bg-gray-800 border shadow-xl rounded-xl overflow-hidden 
                    transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl h-full
                `}
                style={{ borderColor: colorClass.replace('text-', 'border-') }}
            >
                <div className="p-5 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <Icon className={`w-8 h-8 ${colorClass}`} />
                            <span className={`text-xs font-mono uppercase px-2 py-1 rounded-full`} style={{ borderColor: colorClass.replace('text-', 'border-'), color: colorClass, backgroundColor: `${colorClass.replace('text-', 'bg-')}/20` }}>
                                {content.tags[0]}
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
                        <p className="text-muted-foreground text-sm mb-4">{content.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {content.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs bg-gray-900 text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const HobbySportCard = ({ title, image, description, tags, icon: Icon }) => {
        return (
            <div
                className="bg-gray-800 shadow-xl rounded-xl overflow-hidden group
                           relative h-80 md:h-64 cursor-pointer" // Hauteur ajustée pour une galerie
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity duration-300"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/600x400/444444/FFFFFF?text=ACTIVITE_IMG"; }}
                />
                {/* Overlay d'information */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4
                                translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <Icon className="w-8 h-8 text-white mb-2" />
                    <h4 className="text-2xl font-bold text-white mb-1">{title}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };


    return (
        <section id="hobbies" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Entête Terminal */}
                    <div className="font-mono text-primary text-sm mb-4">
                        <span className="terminal-cursor">$ DECODE P3RSONAL_CIPHER.DATA --output D3CODED.data</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-8"> {/* Réajustement de mb-8 pour le bouton */}
                        ~$ CAT <span className="text-red-500">./D3CODED.DATA | grep personal</span>
                    </h2>

                    {/* Bouton de Retour à l'Accueil (Sorti du H2 pour la structure HTML) */}
                    <div className="text-center mb-16">
                        <a href="/" aria-label="Retour à la page d'accueil">
                            <Button
                                variant="outline"
                                className="h-12 px-6 font-mono border-primary text-primary hover:bg-primary/10 transition-colors rounded-lg"
                            >
                                <Home className="w-5 h-5 mr-3" />
                                cd /home/
                            </Button>
                        </a>
                    </div>


                    <div className="grid lg:grid-cols-4 gap-12">

                        <div className="lg:col-span-3 space-y-16">

                            {/* Bloc Photo de Profil & Description (Intégré au flux principal) */}
                            <div className="flex flex-col md:flex-row items-center gap-8 p-6 border border-primary/20 bg-card shadow-lg rounded-xl">
                                <img
                                    src={profilePic}
                                    alt="Photo de profil de Jean-Baptiste"
                                    className="w-32 h-32 rounded-full border-4 border-primary object-cover"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src="https://placehold.co/128x128/333333/AAAAAA?text=USER"
                                    }}
                                />
                                <div>
                                    <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                                        <User className="w-5 h-5 text-primary" />
                                        {personalInfo.name}
                                    </h3>
                                    <p className="text-lg text-muted-foreground">
                                        {personalInfo.description}
                                    </p>
                                </div>
                            </div>

                            {/* Section VEILLE (Galerie de cartes textuelles) */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                    // VEILLE INFORMATIQUE <span className="font-mono text-base text-muted-foreground">[SCANNING]</span>
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {watchContent.map((topic, index) => (
                                        <WatchCard
                                            key={index}
                                            title={topic.title}
                                            content={topic}
                                            icon={topic.icon}
                                            colorClass={topic.colorClass}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* NOUVELLE SECTION : LECTURES RÉCENTES */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <List className="w-6 h-6 text-primary" />
                                    // MODULE LECTURES RÉCENTES <span className="font-mono text-base text-muted-foreground">[DECRYPTING]</span>
                                </h3>
                                <div className="border border-border rounded-lg bg-card overflow-hidden">
                                    {recentReadsContent.map((read, index) => (
                                        <a
                                            key={index}
                                            href={read.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex justify-between items-center p-4 border-b border-border/70 hover:bg-muted/30 transition-colors"
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-mono text-sm text-foreground hover:text-primary transition-colors">{read.title}</span>
                                                <span className="text-xs text-muted-foreground mt-1">Source: {read.source}</span>
                                            </div>
                                            <span className="font-mono text-xs text-primary shrink-0 ml-4">{read.date}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Intégration Spotify (Module Audio) */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <Music className="w-6 h-6 text-red-500" />
                                    ./ AUDIO <span className="font-mono text-base text-muted-foreground">[NOW PLAYING]</span>
                                </h3>

                                <div className="p-4 border border-border bg-gray-800 shadow-xl rounded-xl">
                                    <h4 className="font-mono text-sm text-green-400 mb-3 flex items-center gap-2">
                                        <Repeat className="w-3 h-3"/> STYLES FAVORIS : METAL <Heart className="w-3 h-3 text-red-500"/> / ROCK INDUSTRIEL / TECHNO & AMBIENT
                                    </h4>
                                    <iframe
                                        data-testid="embed-iframe"
                                        style={{ borderRadius: '12px' }}
                                        src="https://open.spotify.com/embed/playlist/1ZnMOBidXz5feD9X71EwEa?utm_source=generator&theme=0"
                                        width="100%"
                                        height="352"
                                        frameBorder="0"
                                        allowFullScreen={true}
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy">
                                    </iframe>
                                </div>
                            </div>

                            {/* Section Gaming (Galerie) */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <Gamepad className="w-6 h-6 text-primary" />
                                    // MODULE JEUX VIDEALS <span className="font-mono text-base text-muted-foreground">[ANALYZING]</span>
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {gamingContent.map((game, index) => (
                                        <GamingCard
                                            key={index}
                                            title={game.title}
                                            image={game.image}
                                            content={game}
                                            rating={game.rating}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Section HOBBIES & SPORTS (Galerie d'images avec overlay) */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <Zap className="w-6 h-6 text-primary" />
                                    // HOBBIES & SPORTS <span className="font-mono text-base text-muted-foreground">[ACTIVE]</span>
                                </h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"> {/* Grille adaptative */}
                                    {hobbiesSportsContent.map((activity, index) => (
                                        <HobbySportCard
                                            key={index}
                                            title={activity.title}
                                            image={activity.image}
                                            description={activity.description}
                                            tags={activity.tags}
                                            icon={activity.icon}
                                        />
                                    ))}
                                </div>
                            </div>


                        </div>

                        {/* Colonne 2 (1/4) : Paramètres/Stats Personnels (Sticky) */}
                        <div className="lg:col-span-1 space-y-8 sticky top-8 h-fit">

                            <h3 className="text-2xl font-bold flex items-center gap-3 font-mono">
                                <Settings className="w-5 h-5 text-primary" />
                                <span className="text-lg uppercase">User Settings</span>
                            </h3>

                            {/* Section Liens Sociaux */}
                            <div className="border border-border p-4 bg-muted/30 font-mono text-sm rounded-xl">
                                <p className="text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <CheckCircle className='w-4 h-4 text-green-500'/> Mes réseaux
                                </p>
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-1"
                                    >
                                        <link.icon className='w-4 h-4 shrink-0'/>
                                        {link.key}
                                    </a>
                                ))}
                            </div>


                            <div className="border border-border p-6 bg-muted/30 space-y-4 font-mono text-sm rounded-xl">
                                {personalSettings.map((setting, index) => (
                                    <div key={index} className="flex flex-col border-b border-border/50 pb-2 last:border-b-0 last:pb-0">
                                        <span className="text-primary uppercase tracking-wider">{setting.key}:</span>
                                        <span className="text-foreground ml-2">{setting.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Bloc de bas de colonne pour la conclusion */}
                            <div className="border border-primary/50 p-4 bg-primary/10 font-mono text-xs text-primary rounded-xl">
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