import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Wrench, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/book", label: "Book" },
  { to: "/admin", label: "Admin" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.logo_link"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-smooth group-hover:scale-105">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-foreground text-base tracking-tight">
                The Spokesman
              </div>
              <div className="text-label text-muted-foreground text-[9px]">
                Mechanic
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.slice(0, -1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-smooth ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/book"
              search={{ serviceId: undefined }}
              data-ocid="nav.book_cta_button"
            >
              <Button className="btn-primary text-sm px-5">Book Online</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground/70 hover:bg-muted transition-smooth"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="nav.mobile_menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
              className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/book"
            search={{ serviceId: undefined }}
            onClick={() => setMobileOpen(false)}
            className="block pt-1"
          >
            <Button
              className="btn-primary w-full"
              data-ocid="nav.mobile_book_button"
            >
              Book Online
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display font-bold text-foreground text-sm">
                The Spokesman Mechanic
              </div>
              <div className="text-xs text-muted-foreground">
                123 Spoke Street, Biketown, CA 90210
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center md:text-right">
            <div>
              Call: (555) 123-BIKE &nbsp;|&nbsp; hello@spokesmanmechanic.com
            </div>
            <div className="mt-1">
              © {year}. Built with love using{" "}
              <a
                href={utm}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
