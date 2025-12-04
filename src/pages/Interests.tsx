import React, { useState } from 'react';
import { Gamepad, Music, BookOpen, User, Settings, Zap, Repeat, Star, Code, Shield, Brain, Mountain, Dumbbell, Home, GitBranch, Heart, Link, CheckCircle, Monitor, AlertTriangle, List, Clock, Loader, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import profilePic from "@/assets/moi.jpg";
import placeHolder from "@/assets/cyber.jpg";
// IMG GALLERY
import bloc from "@/assets/gallery/bloc.jpg";
import camo from "@/assets/gallery/camo.jpg";
import lamaa from "@/assets/gallery/lamaa.jpg";
import leLion from "@/assets/gallery/leLion.jpg";
import lutte from "@/assets/gallery/lutte.jpg";
import miotte from "@/assets/gallery/miotte.jpg";
import mk18 from "@/assets/gallery/mk18.jpg";
import montfac from "@/assets/gallery/montfac.jpg";
import op from "@/assets/gallery/op.jpg";
import suchez from "@/assets/gallery/suchez.jpg";
import suchez2 from "@/assets/gallery/suchez2.jpg";
import kettle from "@/assets/gallery/kettle.jpg";
import muns from "@/assets/gallery/muns.jpg";
import salbert from "@/assets/gallery/salbert.jpg";

const personalInfo = {
    name: "Jean-Baptiste",
    description: "Bon ben du coup moi c'est JB ! Je suis un bon fan de métal et de vieux rock des années 80 (mon spotify wrapper me donne 62 ans 💀)... Ah et aussi j'aime bien le code, la cybersécurité et les jeux vidéo bien sûr ! 😎",
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
        review: "Jeu de fou jusqu'à ce qu'ubisoft se dise hmmm ça manque de pièges...",
        rating: "multi",
        genre: "FPS Tactique",
        hours: "500 heures",
        tags: ["Tactique", "Compétitif", "PC", "Ela Diff"],
    },
    {
        title: "League of Legends",
        image: placeHolder,
        review: "Obligé de le mettre car j'y ai passé beaucoup trop de temps au lycée mais pitié quel jeu de con (bon je compte pas l'arena)",
        rating: 'lol',
        genre: "Ex toxique",
        hours: "Je sais pas mais encore sous PTSD",
        tags: ["MOBA", "Stratégie", "Travail d'équipe (non)"],
    },
    {
        title: "Valorant",
        image: placeHolder,
        review: "Ben c'est sympa mais pas en trop grosse quantité : faut doser pour pas devenir aigri de la vie",
        rating: "multi",
        genre: "LOL en moins puant",
        hours: "un ptit 100 heures",
        tags: ["FPS", "PAN PAN", "Travail d'équipe (non plus)"],
    },
    {
        title: "Cyberpunk 2077",
        image: placeHolder,
        review: "Juste un jeu chevresque en fait ???? Ambiance, immersion, missions mémorables... Et gameplay 💖",
        rating: 5,
        genre: "Action RPG / Monde ouvert",
        hours: "150 heures",
        tags: ["Solo", "Monde Ouvert", "Futuriste"],
    },
    {
        title: "Apex Legends",
        image: placeHolder,
        review: "J'ai vraiment commencé à y jouer récemment et quel plaisir le dynamisme et les mouvements... Bon j'arrive quand même un peu après la bataille",
        rating: "multi",
        genre: "FPS",
        hours: "~150 heures",
        tags: ["Battle Royale", "Compétitif", "Mouvements", "Dynamique"],
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

const hobbiesSportsContent = [
    {
        title: "Randonnée / Trail",
        image: lamaa,
        description: '"Si tu ne trouves pas les réponses à tes problèmes après quatre heures de course, tu ne les trouveras jamais..." Chritopher McDougall',
        tags: ["Outdoor", "Exploration", "Détente"],
        icon: Mountain,
        visuals: [suchez, suchez2, leLion, salbert, miotte, montfac]
    },
    {
        title: "Escalade / Renfo / Bagarre",
        image: bloc,
        description: '"Chaque sommet de montagne est à portée de main si vous continuez à grimper."',
        tags: ["Force", "Discipline", "Kettlebell"],
        icon: Dumbbell,
        visuals: [kettle, lutte]
    },
    {
        title: "Tir et Airsoft MilSim",
        image: camo,
        description: "🔫",
        tags: ["Tactic", "Teamwork", "Milsim"],
        icon: Zap,
        visuals: [mk18, op, muns]
    },
];

const personalSettings = [
    { key: "ENVIRONMENT_THEME", value: "Dark Mode (aïe les yeux)" },
    { key: "PRIMARY_LANGUAGE", value: "Français" },
    { key: "SECONDARY_LANGUAGE", value: "Anglais" },
    { key: "COFFEE_INTAKE", value: "Pitié non faut arrêter avec cette vanne" },
];

const Interests = () => {
    const [previewImage, setPreviewImage] = useState(null);

    const openPreview = (src) => {
        setPreviewImage(src);
    };

    const closePreview = () => {
        setPreviewImage(null);
    };

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

    const GamingReportCard = ({ title, content, rating, image }) => {
        const getRatingDisplay = () => {
            if (rating === 'lol') return <span className="text-destructive font-bold">CANCER / Toxique</span>;
            if (rating === 'multi') return <span className="text-cyan-400 font-bold">MULTIJOUEUR (pas notable)</span>;
            if (rating >= 4) return <span className="text-green-500 font-bold">{rating}/5 - Essentiel</span>;
            return <span className="text-muted-foreground italic">Non Évalué</span>;
        };
        return (
            <div className="bg-gray-800 border border-border p-5 shadow-xl rounded-lg space-y-3 hover:border-primary transition-colors">
                <div className="relative h-24 rounded-md overflow-hidden mb-3">
                    <img
                        src={image}
                        alt={`Bannière ${title}`}
                        className="w-full h-full object-cover opacity-30"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/600x100/444444/FFFFFF?text=Bannière+Jeu"; }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center p-3">
                        <span className="text-xl font-bold text-white tracking-wide">{title}</span>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                    "{content.review}"
                </p>
                <div className="pt-2 border-t border-border/70">
                    <div className="flex justify-between text-sm font-mono mt-1">
                        <span className="text-primary flex items-center gap-1"><Clock className="w-4 h-4"/> Temps Investi:</span>
                        <span className="text-foreground">{content.hours}</span>
                    </div>
                    <div className="flex justify-between text-sm font-mono mt-1">
                        <span className="text-primary flex items-center gap-1"><Loader className="w-4 h-4 animate-spin-slow"/> Avis</span>
                        {getRatingDisplay()}
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

    const HobbySportMissionCard = ({ title, image, description, tags, icon: Icon, visuals }) => {
        const [selectedImage, setSelectedImage] = useState(image);

        return (
            <div className="bg-gray-800 border border-primary/50 shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row h-[400px] md:h-[320px] transition-shadow duration-300 hover:shadow-primary/30">
                {/* Image principale (carrée) */}
                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden group cursor-pointer" onClick={() => openPreview(selectedImage)}>
                    <img
                        src={selectedImage}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/600x400/444444/FFFFFF?text=PHOTO+ACTIVITY"; }}
                    />
                </div>
                {/* Contenu textuel + galerie */}
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-white">{title}</h4>
                            <Icon className="w-5 h-5 text-primary shrink-0" />
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{description}</p>
                    </div>
                    <div className="pt-2 border-t border-border/70">
                        <p className="text-xs font-mono text-primary mb-2">Galerie (cliquer pour changer) :</p>
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                            {[image, ...(visuals || [])].map((src, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={src}
                                    alt={`Vue ${title} ${imgIndex + 1}`}
                                    className={`w-16 h-16 object-cover rounded-md border-2 cursor-pointer transition-all flex-shrink-0 ${
                                        selectedImage === src ? 'border-green-500 scale-105' : 'border-primary/50 hover:scale-105'
                                    }`}
                                    onClick={() => setSelectedImage(src)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section id="hobbies" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="font-mono text-primary text-sm mb-4">
                        <span className="terminal-cursor">$ DECODE P3RSONAL_CIPHER.DATA --output D3CODED.data</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        ~$ CAT <span className="text-red-500">./D3CODED.DATA | grep personal</span>
                    </h2>
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
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <List className="w-6 h-6 text-primary" />
                                    // LECTURES RÉCENTES <span className="font-mono text-base text-muted-foreground">[DECRYPTING]</span>
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
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <Gamepad className="w-6 h-6 text-primary" />
                                    // JEUX VIDEALS <span className="font-mono text-base text-muted-foreground">[ANALYZING]</span>
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {gamingContent.map((game, index) => (
                                        <GamingReportCard
                                            key={index}
                                            title={game.title}
                                            image={game.image}
                                            content={game}
                                            rating={game.rating}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <Music className="w-6 h-6 text-red-500" />
                                    ./ AUDIO <span className="font-mono text-base text-muted-foreground">[NOW PLAYING]</span>
                                </h3>
                                <div className="p-4 border border-border bg-gray-800 shadow-xl rounded-xl">
                                    <h4 className="font-mono text-sm text-green-400 mb-3 flex items-center gap-2">
                                        <Repeat className="w-3 h-3"/> STYLES FAVORIS : METAL <Heart className="w-3 h-3 text-red-500"/> / HARD ROCK / TECH & HARDCORE
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
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-2">
                                    <Zap className="w-6 h-6 text-primary" />
                                    // HOBBIES & SPORTS <span className="font-mono text-base text-muted-foreground">[ACTIVE]</span>
                                </h3>
                                <div className="grid md:grid-cols-1 gap-6">
                                    {hobbiesSportsContent.map((activity, index) => (
                                        <HobbySportMissionCard
                                            key={index}
                                            title={activity.title}
                                            image={activity.image}
                                            description={activity.description}
                                            tags={activity.tags}
                                            icon={activity.icon}
                                            visuals={activity.visuals}
                                        />
                                    ))}
                                </div>
                            </div>
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
                        </div>
                        <div className="lg:col-span-1 space-y-8 sticky top-8 h-fit">
                            <h3 className="text-2xl font-bold flex items-center gap-3 font-mono">
                                <Settings className="w-5 h-5 text-primary" />
                                <span className="text-lg uppercase">User Settings</span>
                            </h3>
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

            {/* Popup d'aperçu d'image */}
            {previewImage && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closePreview}>
                    <div className="relative max-w-4xl max-h-[90vh] bg-background rounded-lg overflow-hidden shadow-2xl">
                        <button
                            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10"
                            onClick={closePreview}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <img
                            src={previewImage}
                            alt="Aperçu"
                            className="w-full h-full object-contain max-h-[80vh]"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/800x600/444444/FFFFFF?text=IMAGE+INDISPONIBLE"; }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Interests;
