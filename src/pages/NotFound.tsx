import { useLocation, Link } from "react-router-dom"; // Assurez-vous d'importer Link si vous utilisez React Router
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(`[SYSTEM_LOG] 404 Error: Protocol failed. Access denied for path: ${location.pathname} - Ehhhh non petit malin !`);
  }, [location.pathname]);

  const pathSegments = location.pathname.split('/').filter(s => s.length > 0);
  const pathDisplay = pathSegments.join(' > ');

  return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="max-w-xl w-full border border-border bg-card p-8 shadow-xl">

          <div className="font-mono text-primary text-sm mb-4">
            <span className="terminal-cursor">$ UNKNOWN_PAGE</span>
          </div>

          <div className="flex items-start gap-4 mb-8 border-l-4 border-red-500 pl-4 py-2 bg-red-500/10">
            <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl font-bold text-red-500 font-mono">
                ERREUR_404_
              </h1>
              <p className="text-lg text-foreground mt-1">
                Requête introuvable. Le fichier ou le répertoire spécifié n'existe pas.
              </p>
            </div>
          </div>

          <div className="font-mono text-sm space-y-3 bg-muted/30 p-4 border border-border">
            <div className="text-red-500">
              &gt; <span className="text-primary">[PROTOCOL_ERROR]</span> Chemin non référencé ou inaccessible
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">[ACCESSED_PATH]</span>
              <span className="text-foreground ml-2">
                    {pathDisplay.length > 0 ? `/root/${pathDisplay}` : '/'}
                </span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">[B4CK_HOME]</span> Returning to safe zone...
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary font-mono underline hover:no-underline transition-colors p-3 border border-primary/50 hover:bg-primary/10"
            >
              <Home className="w-4 h-4" />
              cd /home/
            </Link>
          </div>
        </div>
      </div>
  );
};

export default NotFound;