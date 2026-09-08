// Global normalized pointer position (-1..1), written by a single window
// listener and read directly inside useFrame. Avoids relying on per-canvas
// pointer capture, which would require the canvas to accept pointer events
// and interfere with clicking content stacked above it.
const state = { x: 0, y: 0 };

let attached = false;

function onMove(e: PointerEvent) {
  state.x = (e.clientX / window.innerWidth) * 2 - 1;
  state.y = -((e.clientY / window.innerHeight) * 2 - 1);
}

export const pointerStore = {
  get x() {
    return state.x;
  },
  get y() {
    return state.y;
  },
  attach() {
    if (attached) return () => {};
    attached = true;
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      attached = false;
    };
  },
};
