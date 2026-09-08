import { useCallback, useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Preloader } from "./components/Preloader";
import { Hero } from "./components/Hero";
import { Deck } from "./components/Deck";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { pointerStore } from "./lib/pointerStore";

function App() {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => pointerStore.attach(), []);

  return (
    <>
      <div className="scanline-overlay" aria-hidden="true" />
      <Preloader onComplete={handleReady} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Deck />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
