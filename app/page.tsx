import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <div className ="relative w-full h-screen">
      <ParticlesBackground />
      <main className="relative z-10">
        <Hero />
        <AboutMe />
      </main>
    </div>

  );
}
