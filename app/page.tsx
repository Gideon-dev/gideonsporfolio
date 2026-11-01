import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main" className="max-w-7xl mx-auto">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Clients />
      <Contact />
    </main>
  );
}
