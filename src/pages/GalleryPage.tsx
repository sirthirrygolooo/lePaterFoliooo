// src/pages/GalleryPage.tsx
import React from 'react';
import { Image, Camera } from 'lucide-react';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center border border-primary/50 bg-card p-10 shadow-lg">
        <Camera className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-5xl font-bold font-mono text-primary mb-4">
          [DONNÉES CHIFFRÉES]
        </h1>
        <h2 className="text-3xl font-semibold mb-6">Ma Galerie Photo Privée</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Vous avez trouvé ma galerie secrète \! Ici, je partage des photos de voyages, de mes projets personnels non-tech, ou de moments importants.
        </p>
        {/* Vous pouvez ajouter une grille d'images ici */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Exemple d'image */}
            <div className="bg-muted p-2 border border-border">
                <img src="https://via.placeholder.com/150/FF0000/FFFFFF?text=Secret+Pic+1" alt="Secret 1" className="w-full h-auto" />
                <p className="text-xs text-muted-foreground mt-2 font-mono">IMG_001.jpg</p>
            </div>
            <div className="bg-muted p-2 border border-border">
                <img src="https://via.placeholder.com/150/0000FF/FFFFFF?text=Secret+Pic+2" alt="Secret 2" className="w-full h-auto" />
                <p className="text-xs text-muted-foreground mt-2 font-mono">IMG_002.jpg</p>
            </div>
             <div className="bg-muted p-2 border border-border">
                <img src="https://via.placeholder.com/150/00FF00/FFFFFF?text=Secret+Pic+3" alt="Secret 3" className="w-full h-auto" />
                <p className="text-xs text-muted-foreground mt-2 font-mono">IMG_003.jpg</p>
            </div>
        </div>
        <p className="mt-8 text-sm text-gray-500 font-mono">
          &gt; Log Entry #002: This page was accessed via 'exec backdoor.sh'.
        </p>
        <div className="mt-8">
          <a href="/" className="text-primary underline hover:text-primary/70 font-mono">
            &lt; Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;