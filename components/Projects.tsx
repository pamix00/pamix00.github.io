'use client';
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import Button from "./ui/Button";

const projects = [
    {
    id: 1,
    title: "Piwo z Łosiem",
    description: "A location-based social app connecting beer enthusiasts. Features real-time user tracking on maps, instant chat, and a consumption log built with Vue.js and Node.js.",
    image: "/projects/piwo-z-losiem.webp",
    tags: ["Vue.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Investment Calculator",
    description: "Interactive financial tool that visualizes the power of compound interest with real-time dynamic charts and data analysis.",
    image: "/projects/investment-calculator.webp",
    tags: ["Next.js", "React", "Recharts", "Tailwind CSS", "TypeScript", "Shadcn UI"],
    liveUrl: "https://kalkulator.patrykczech.me/",
    repoUrl: "https://github.com/pamix00/investment-calculator",
  },
  {
    id: 3,
    title: "Work in Progress",
    description: "Something exciting is being built right now. Stay tuned for the reveal of my next big full-stack project.",
    image: "https://images.unsplash.com/photo-1653387300291-bfa1eeb90e16?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Loading...", "In Development", "Coming Soon"],
  },
  
];

const Projects = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const sliderRef = useRef(null);
  const isSliderInView = useInView(sliderRef, { once: true, amount: 0.5 });
  const sliderNavRef = useRef(null);
  const isSliderNavInView = useInView(sliderNavRef, { once: true, amount: 0.3 });

  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));

  const navigate = (direction: number) => {
    setActiveIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return projects.length - 1;
      if (newIndex >= projects.length) return 0;
      return newIndex;
    });
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);
    
    if (absDiff > 2) return { opacity: 0, scale: 0.5, x: diff * 100, z: -500, rotateY: 0 };
    
    return {
      x: diff * 280,
      z: absDiff === 0 ? 0 : -150 * absDiff,
      rotateY: diff * -25,
      scale: absDiff === 0 ? 1 : 0.85 - absDiff * 0.1,
      opacity: absDiff === 0 ? 1 : 0.4,
    };
  };

  return (
    <section id="projects" className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="text-white">Featured </span>
          <span className="text-primary text-glow-primary">Projects</span>
        </motion.h2>

        <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: "1200px" }}>
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  ref={sliderRef}
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={ isSliderInView ? {
                    ...style,
                    transition: { type: "spring", stiffness: 300, damping: 30 },
                  } : {}}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setActiveIndex(index)}
                  className="absolute w-[320px] md:w-[400px] cursor-pointer"
                  style={{ transformStyle: "preserve-3d", zIndex: isActive ? 50 : 10 }}
                >
                  <div className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isActive 
                      ? "border-primary shadow-[0_0_40px_rgba(var(--primary),0.3)]" 
                      : "border-border/30"
                  }`}>
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} - application interface built with ${project.tags.join(', ')}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    
                    <div className="p-6 bg-card relative z-10 -mt-1 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          {project.liveUrl ? (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="no-underline"
                            >
                              <Button variant="primary" className="flex items-center gap-2 text-sm font-medium">
                                <ExternalLink size={14} /> Live Demo
                              </Button>
                            </a>
                          ) : (
                            <Button 
                              variant="primary" 
                              disabled 
                              className="flex items-center gap-2 text-sm font-medium opacity-50 grayscale filter "
                            >
                              <ExternalLink size={14} /> Live Demo
                            </Button>
                          )}

                          {project.repoUrl ? (
                            <a 
                              href={project.repoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="no-underline"
                            >
                              <Button variant="dark" className="flex items-center gap-2">
                                <Github size={14} /> Code
                              </Button>
                            </a>
                          ) : (
                            <Button 
                              variant="dark" 
                              disabled 
                              className="flex items-center gap-2 opacity-50 cursor-not-allowed text-muted-foreground"
                            >
                              <Github size={14} /> Code
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div 
          ref={sliderNavRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isSliderNavInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-4 mt-8">
          <Button variant="circleDark"
            onClick={() => navigate(-1)}
            className=""
          >
            <ChevronLeft className="text-foreground" />
          </Button>
          <div className="flex items-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <Button variant="circleDark"
            onClick={() => navigate(1)}
            className=""
          >
            <ChevronRight className="text-foreground" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;