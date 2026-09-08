import { Nav } from "./components/Nav";
import { StoryHud } from "./components/StoryHud";
import { ScrollDriver } from "./components/ScrollDriver";
import { SceneBackdrop } from "./components/scene/SceneBackdrop";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { RoleChapters } from "./components/RoleChapters";
import { Skills } from "./components/Skills";
import { Highlights } from "./components/Highlights";
import { Credentials } from "./components/Credentials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <div className="scanline-overlay" aria-hidden="true" />
      <SceneBackdrop />
      <ScrollDriver />
      <Nav />
      <StoryHud />
      <main className="relative">
        <Hero />
        <About />
        <RoleChapters />
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
