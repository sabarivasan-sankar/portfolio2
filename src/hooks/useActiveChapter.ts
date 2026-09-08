import { useEffect, useState } from "react";
import { scrollStore } from "../lib/scrollStore";

export function useActiveChapter() {
  const [chapter, setChapter] = useState(scrollStore.activeChapter);

  useEffect(() => {
    const unsubscribe = scrollStore.subscribe(setChapter);
    return () => {
      unsubscribe();
    };
  }, []);

  return chapter;
}
