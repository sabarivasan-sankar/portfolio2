import { profile } from "../lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto w-full max-w-[820px] px-6 md:px-8 pb-16">
      <hr className="rule mb-6" />
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-fg-faint">
        <p>Sabarivasan Sankar, {year}</p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
