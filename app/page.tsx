import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className ="relative w-full h-screen">
      <div className="fixed z-0">
        <ParticlesBackground />
      </div>
      <main className="relative z-10">
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
      </main>
    </div>

  );
}
