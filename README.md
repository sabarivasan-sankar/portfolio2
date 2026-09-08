# Sabarivasan Sankar — Portfolio

A portfolio that works as an access-control system rather than a scrolling
resume. The visitor assumes a role (recruiter, engineer, or founder) and every
writeup on the page is re-scoped for that role: the same work, framed for
whoever is reading. Two resources stay denied for everyone, and both denials are
honest ones — employer-owned source code, and a phone number deliberately kept
off the public site.

The concept demonstrates the role- and permission-based access control work
described on the page instead of just listing it.

## Design notes

The visual language was calibrated against measured values from award-winning
reference sites rather than guessed at:

- Display type is large but **light** (weight 200–300, tight negative tracking),
  never bold.
- Body copy runs 19–24px, not the usual 14–16px.
- Almost no borders. The whole page uses a handful of hairline rules; hierarchy
  comes from space and type scale instead of boxes.
- A single narrow reading column, dark by default with a light theme available.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) for the role-transition and preloader choreography
- Self-hosted [Sora](https://fonts.google.com/specimen/Sora) +
  [Space Mono](https://fonts.google.com/specimen/Space+Mono) via `@fontsource`

No WebGL, no 3D, no images. The page is entirely type, space, and motion.

## Development

```bash
bun install
bun run dev        # start the dev server
bun run typecheck  # tsc -b --noEmit
bun run lint       # oxlint
bun run build      # production build
```

## Accessibility

- The role switcher is a real `radiogroup` with keyboard support and accessible
  names.
- `prefers-reduced-motion` removes the preloader, the role-change transitions,
  and the status pulse.
- Both themes are contrast-checked, and the page carries no horizontal overflow
  at any viewport width.
