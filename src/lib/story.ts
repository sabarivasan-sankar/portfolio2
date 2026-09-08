export type Chapter = {
  index: number;
  id: string;
  tag: string;
  label: string;
  point: [number, number, number];
};

// A single curve winds through the whole page. Each chapter is a waypoint
// along it; scroll position maps directly to camera position on this path.
export const CHAPTERS: Chapter[] = [
  { index: 0, id: "top", tag: "0x00", label: "origin", point: [0, 0, 0] },
  { index: 1, id: "about", tag: "0x01", label: "foundations", point: [1.3, -0.35, -7] },
  { index: 2, id: "role-intern", tag: "0x02", label: "first commit", point: [-1.1, 0.45, -14] },
  { index: 3, id: "role-associate", tag: "0x03", label: "scaling up", point: [1.5, -0.3, -21] },
  { index: 4, id: "role-midlevel", tag: "0x04", label: "command", point: [-1.3, 0.4, -28] },
  { index: 5, id: "skills", tag: "0x05", label: "the stack", point: [1.1, -0.4, -35] },
  { index: 6, id: "work", tag: "0x06", label: "proof of work", point: [-0.9, 0.35, -42] },
  { index: 7, id: "credentials", tag: "0x07", label: "recognition", point: [0.7, -0.25, -48] },
  { index: 8, id: "contact", tag: "0x08", label: "signal received", point: [0, 0.1, -54] },
];

export const TOTAL_DEPTH = Math.abs(CHAPTERS[CHAPTERS.length - 1].point[2]);
