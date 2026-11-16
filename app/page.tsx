import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Tools from "@/components/sections/Tools";
import Contact from "@/components/sections/Contact";
import JellySection from "@/components/ui/JellySection";

export default function Home() {
  return (
    <main id="main" className="max-w-7xl mx-auto">
      <Hero />
      <JellySection>
        <About />
      </JellySection>
      {/* "wide": the folder stack is several screens tall, so it is not stretched vertically. */}
      <JellySection variant="wide">
        <Experience />
      </JellySection>
      <JellySection>
        <Tools />
      </JellySection>
      <JellySection>
        <Contact />
      </JellySection>
    </main>
  );
}
