# Sabarivasan Sankar — Portfolio

A scroll-driven portfolio site built around a single idea: a glowing signal path
that the camera travels along as you scroll, with each chapter of the career
story (intern → associate → mid-level, RBAC, payments, data pipelines) as a
waypoint on the path.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) + ScrollTrigger + SplitText for the scroll-driven
  choreography
- [react-three-fiber](https://r3f.docs.pmnd.rs) + [drei](https://github.com/pmndrs/drei) +
  [postprocessing](https://github.com/pmndrs/react-postprocessing) for the 3D
  scene and bloom
- Self-hosted [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) +
  [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via `@fontsource`

## Development

```bash
bun install
bun run dev        # start the dev server
bun run typecheck  # tsc -b --noEmit
bun run lint       # oxlint
bun run build       # production build
```

## Notes

- The 3D scene is lazy-loaded and code-split from the main bundle, and falls
  back to a static CSS gradient when WebGL is unavailable.
- `prefers-reduced-motion` disables camera flight, particle drift, and
  scroll-triggered entrances in favor of a static, fully readable page.
- Dark is the primary theme; a light theme is available via the toggle in the
  nav and persisted to `localStorage`.
