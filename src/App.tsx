import { MotionConfig } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-[#f6f9fe] text-[#000b1b] overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
