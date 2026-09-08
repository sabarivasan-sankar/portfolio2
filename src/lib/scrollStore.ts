// Continuous scroll progress and the currently active chapter, updated by
// GSAP ScrollTrigger callbacks and read directly inside useFrame. Deliberately
// not React state: these change on every scroll tick and must never trigger
// a re-render of the whole tree.
type Listener = (chapter: number) => void;

const state = {
  progress: 0,
  activeChapter: 0,
};

const listeners = new Set<Listener>();

export const scrollStore = {
  get progress() {
    return state.progress;
  },
  get activeChapter() {
    return state.activeChapter;
  },
  setProgress(p: number) {
    state.progress = p;
  },
  setActiveChapter(index: number) {
    if (state.activeChapter !== index) {
      state.activeChapter = index;
      listeners.forEach((l) => l(index));
    }
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
