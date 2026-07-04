const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              Precision <span className="text-primary">Structures</span> &
              Interiors
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { label: "Facebook", href: "#" },
              { label: "Instagram", href: "#" },
              { label: "LinkedIn", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded border border-border font-body text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
