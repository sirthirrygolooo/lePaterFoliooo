import React from 'react';
import { Gamepad, Music, BookOpen, User, Settings, Zap, Repeat, Star, Code, Shield, Brain, Mountain, Dumbbell, Home, GitBranch, Heart, Link, CheckCircle, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

import profilePic from "@/assets/carlos.jpg";
import placeHolder from "@/assets/cyber.jpg"


const personalInfo = {
    name: "Jean-Baptiste",
    // Texte de remplacement stylisé
    description: "Jeune développeur passionné par le 'reversing engineering' et l'IA, je construis mon expertise autour des systèmes sécurisés et de l'innovation technologique. Mon temps libre est dédié à la compétition stratégique et à la découverte de nouvelles cultures musicales."
};

const socialLinks = [
    { key: "RootMe", url: "#", icon: Shield }, // Utilisé Shield pour le côté CTF/Hack
    { key: "Discord", url: "#", icon: Heart }, // Heart / Discord = Communauté
    { key: "Instagram", url: "#", icon: Zap }, // Zap / Instagram = Dynamisme/Activité
];

const gamingContent = [
    {
        title: "Valorant",
        image: placeHolder,
        genre: "FPS Tactique",
        // Texte de remplacement
        review: "Requires high-level system optimization and ultra-low latency connection. Strategic dominance relies on precise micro-management and robust team protocol.",
        rating: 4.5,
        tags: ["Tactical", "Competitive", "PC"],
    },
    {
        title: "League of Legends",
        image: placeHolder,
        genre: "MOBA Stratégique",
        // Texte de remplacement
        review: "Complex macro-strategy environment. Highly volatile community structure, demanding constant performance optimization and strong communication protocols.",
        rating: 4.0,
        tags: ["MOBA", "Strategy", "Teamwork"],
    },
    {
        title: "Elden Ring",
        image: placeHolder,
        genre: "Action-RPG / Monde Ouvert",
        // Texte de remplacement
        review: "Masterful world-building and challenging difficulty curve. A test of persistence, resource management, and pattern recognition. Flawless execution required.",
        rating: 5.0,
        tags: ["Solo", "Exploration", "Challenge"],
    },
];

const watchContent = [ // Renommé pour la clarté
    {
        title: "Vulnérabilités 0-day",
        icon: Shield,
        description: "Comprendre les failles de sécurité avant qu'elles ne soient connues, pour anticiper les menaces.",
        tags: ["Cybersécurité", "Recherche"],
        color: "text-red-400",
    },
    {
        title: "Cryptographie & Blockchain",
        icon: Code,
        description: "Exploration des mécanismes derrière la sécurité des données et les innovations décentralisées.",
        tags: ["Sécurité", "Tech"],
        color: "text-blue-400",
    },
    {
        title: "IA & Apprentissage Automatique",
        icon: Brain,
        description: "Suivi des avancées en intelligence artificielle et de leur impact futur sur la technologie.",
        tags: ["IA", "Futur"],
        color: "text-cyan-400",
    },
];

const hobbiesSportsContent = [ // Nouvelle structure pour la galerie d'images
    {
        title: "Musculation",
        image: "https://placehold.co/600x400/3b82f6/FFFFFF?text=MUSCULATION", // Placeholder image
        description: "Force et endurance, un équilibre entre le physique et le mental. Entraînement régulier et varié.",
        tags: ["Fitness", "Force", "Discipline"],
        icon: Dumbbell, // Icône pour un petit rappel visuel
    },
    {
        title: "Randonnée / Nature",
        image: "https://placehold.co/600x400/10b981/FFFFFF?text=RANDONNEE", // Placeholder image
        description: "Recharge mentale en pleine nature, découverte de nouveaux paysages et challenges physiques.",
        tags: ["Outdoor", "Exploration", "Détente"],
        icon: Mountain,
    },
    {
        title: "Échecs en Ligne",
        image: "https://placehold.co/600x400/ef4444/FFFFFF?text=ECHECS", // Placeholder image
        description: "Stimulation intellectuelle intense, stratégie et anticipation. Parties rapides ou analyses profondes.",
        tags: ["Stratégie", "Mental", "Réflexion"],
        icon: GitBranch, // Peut être remplacé par Chess si vous l'ajoutez
    },
    {
        title: "Cyclisme Urbain",
        image: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=CYCLISME", // Exemple d'ajout
        description: "Déplacement rapide et écologique en ville, parfait pour rester actif et explorer de nouveaux quartiers.",
        tags: ["Sport", "Urbain", "Écologie"],
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

    // Composant pour l'affichage des étoiles de notation
    const RatingStars = ({ rating }) => (
        <div className="flex items-center text-yellow-400 mt-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400' : 'fill-none'}`} />
            ))}
            <span className="ml-2 text-white text-xs">{rating}/5</span>
        </div>
    );

    // Composant d'une carte de la galerie Gaming
    const GamingCard = ({ title, content, image, rating }) => {
        return (
            <div
                className={`
                    bg-gray-800 border border-primary/50 shadow-xl rounded-xl overflow-hidden group 
                    transition-transform duration-300 relative h-96 md:h-80
                `}
            >
                {/* Image + Overlay (Gaming) */}
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

    // Composant d'une carte de la galerie Veille (texte)
    const WatchCard = ({ title, content, icon: Icon, color }) => {
        return (
            <div
                className={`
                    bg-gray-800 border shadow-xl rounded-xl overflow-hidden 
                    transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl h-full
                `}
                style={{ borderColor: color.replace('text-', 'border-') }}
            >
                <div className="p-5 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <Icon className={`w-8 h-8 ${color}`} />
                            <span className={`text-xs font-mono uppercase px-2 py-1 rounded-full`} style={{ borderColor: color.replace('text-', 'border-'), color: color, backgroundColor: `${color.replace('text-', 'bg-')}/20` }}>
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

                    <h2 className="text-4xl md:text-5xl font-bold mb-16">
                        ~$ CAT <span className="text-red-500">./D3CODED.DATA | grep personal</span>
                    </h2>

                    <div className="grid lg:grid-cols-4 gap-12">

                        <div className="lg:col-span-3 space-y-16">

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

                            {/* Section Gaming (Galerie) */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <Gamepad className="w-6 h-6 text-primary" />
                                    // MODULE JEUX & CULTURE <span className="font-mono text-base text-muted-foreground">[ACTIVATED]</span>
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

                            {/* Section VEILLE (Galerie de cartes textuelles) */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                    // MODULE VEILLE <span className="font-mono text-base text-muted-foreground">[SCANNING]</span>
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {watchContent.map((topic, index) => (
                                        <WatchCard
                                            key={index}
                                            title={topic.title}
                                            content={topic}
                                            icon={topic.icon}
                                            color={topic.color}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* NOUVELLE Section HOBBIES & SPORTS (Galerie d'images avec overlay) */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <Zap className="w-6 h-6 text-primary" />
                                    // MODULE HOBBIES & SPORTS <span className="font-mono text-base text-muted-foreground">[ACTIVE]</span>
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

                            {/* Bouton de Retour à l'Accueil */}
                            <div className="text-center pt-8">
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