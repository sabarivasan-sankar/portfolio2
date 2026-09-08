import { useCallback, useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Preloader } from "./components/Preloader";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Highlights } from "./components/Highlights";
import { Credentials } from "./components/Credentials";
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
        <About />
        <Experience />
        <Skills />
        <Highlights />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
