import { useEffect, useState } from "react";
import { List, X, Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#role-intern", label: "experience" },
  { href: "#skills", label: "skills" },
  { href: "#work", label: "work" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-4 md:top-5 inset-x-4 md:inset-x-8 z-50">
      <nav className="mx-auto max-w-6xl h-14 px-5 flex items-center justify-between border border-border/80 bg-bg/80 backdrop-blur-md">
        <a
          href="#top"
          className="font-mono text-sm text-fg hover:text-accent transition-colors"
        >
          sabarivasan<span className="text-accent">@</span>dev
          <span className="caret-blink text-accent">_</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-[13px] tracking-wide uppercase">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="bracket-link text-fg-muted hover:text-fg transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-sm border border-border text-fg-muted hover:text-accent hover:border-accent-dim transition-colors"
          >
            {theme === "dark" ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 text-fg"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden mt-2 border border-border/80 bg-bg/95 backdrop-blur-md">
          <ul className="flex flex-col px-5 py-4 gap-1 font-mono text-sm uppercase tracking-wide">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-fg-muted hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={toggle}
                className="flex items-center gap-2 py-3 text-fg-muted hover:text-accent transition-colors"
              >
                {theme === "dark" ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
                {theme === "dark" ? "light mode" : "dark mode"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
