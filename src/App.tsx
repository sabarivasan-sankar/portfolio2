import { Nav } from "./components/Nav";
import { Preloader } from "./components/Preloader";
import { AccessConsole } from "./components/AccessConsole";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <div className="scanline-overlay" aria-hidden="true" />
      <Preloader />
      <Nav />
      <main>
        <AccessConsole />
      </main>
      <Footer />
    </>
  );
}

export default App;
