import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className ="relative w-full min-h-screen">
      <div className="flex flex-col gap-0 w-full overflow-hidden">
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>

  );
}
