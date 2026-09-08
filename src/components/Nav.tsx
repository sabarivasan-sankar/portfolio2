import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme";

export function Nav() {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto w-full max-w-[820px] px-6 md:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-xs tracking-[0.18em] uppercase text-fg-muted hover:text-fg transition-colors duration-300"
        >
          sabarivasan sankar
        </a>

        <div className="flex items-center gap-6">
          <span className="hidden sm:flex items-center gap-2 font-mono text-xs text-fg-faint">
            <span className="status-dot w-1 h-1 rounded-full bg-accent" />
            open to work
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="text-fg-faint hover:text-accent transition-colors duration-300"
          >
            {theme === "dark" ? <Sun size={15} weight="light" /> : <Moon size={15} weight="light" />}
          </button>
        </div>
      </div>
    </header>
  );
}
