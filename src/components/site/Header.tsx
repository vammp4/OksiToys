import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { dict, langs, langLabel, type Lang } from "@/lib/i18n";

export function Header({ lang }: { lang: Lang }) {
  const t = dict[lang].nav;
  const base = lang === "pl" ? "" : `/${lang}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [lang]);

  const navItems = [
    { href: "#collection", label: t.collection },
    { href: "#story", label: t.story },
    { href: "#custom", label: t.custom },
    { href: "#reviews", label: t.reviews },
    { href: "#contact", label: t.contact },
  ];

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md md:bg-background/70 md:backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-20 sm:px-6">
        <Link to={(base || "/") as "/"} className="flex items-center gap-3 group">
          <span className="font-display text-[1.55rem] leading-none tracking-tight sm:text-2xl">
            <span className="text-primary">Oksi</span>
            <span className="text-foreground">Toys</span>
          </span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Amigurumi
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/80">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link transition-colors duration-200 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 rounded-full border border-border/80 bg-card/60 p-1">
            {langs.map((l) => {
              const to = l === "pl" ? "/" : (`/${l}` as "/en" | "/ua");
              const active = l === lang;
              return (
                <Link
                  key={l}
                  to={to}
                  className={
                    "rounded-full px-2 py-1.5 text-[10px] font-medium tracking-widest transition-colors duration-200 sm:px-3 sm:text-[11px] " +
                    (active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {langLabel[l]}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/70 text-foreground transition-colors duration-200 hover:bg-secondary sm:h-10 sm:w-10 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={
          "absolute left-3 right-3 top-full mt-2 rounded-[1.25rem] border border-border/60 bg-card px-3 py-3 shadow-petal backdrop-blur-md sm:px-4 sm:py-4 md:hidden " +
          "transition-[opacity,transform,max-height] duration-300 ease-out " +
          (isMobileMenuOpen
            ? "mobile-menu-open max-h-72 translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-3 overflow-hidden opacity-0")
        }
      >
        <nav className="flex flex-col gap-2 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link rounded-2xl border border-transparent px-3 py-2.5 text-foreground/85 transition-[transform,background-color,border-color,color] duration-200 hover:border-border/70 hover:bg-card hover:text-foreground"
              style={{
                transitionDelay: isMobileMenuOpen ? `${navItems.indexOf(item) * 35}ms` : "0ms",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
