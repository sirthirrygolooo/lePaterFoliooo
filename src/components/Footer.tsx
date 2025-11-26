
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="font-mono text-sm ">~/portfolio$./myPortfolio.sh --set-author "FROEHLY Jean-Baptiste" </span>
          </div>
          
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} • Made with 💖 mais surtout avec Vite, React et TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
