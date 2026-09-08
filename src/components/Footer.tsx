export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-bg border-t border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-fg-faint">
        <p>Sabarivasan Sankar, {year}</p>
        <p>Coimbatore, India</p>
      </div>
    </footer>
  );
}
