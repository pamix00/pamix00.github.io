"use client";
import React, { useState } from "react";
import { AnimatePresence, motion, scale, useInView, type Variants } from "framer-motion";
import { SiShadcnui } from "react-icons/si";
import Button from "./ui/Button";

const tabs = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", iconClass: "devicon-react-original", color: "#61DAFB" },
      { name: "Next.js", iconClass: "devicon-nextjs-plain", color: "#E3E1E1" },
      { name: "Vue.js", iconClass: "devicon-vuejs-plain", color: "#4FC08D" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain", color: "#3178C6" },
      { name: "JavaScript", iconClass: "devicon-javascript-plain", color: "#F7DF1E" },
      { name: "Tailwind", iconClass: "devicon-tailwindcss-original", color: "#06B6D4" },
      { name: "Framer Motion", iconClass: "devicon-framermotion-original", color: "#E3E1E1" },
      { name: "Shadcn UI", icon: SiShadcnui, color: "#E3E1E1" },
      { name: "HTML5", iconClass: "devicon-html5-plain", color: "#E34F26" },
      { name: "CSS3", iconClass: "devicon-css3-plain", color: "#1572B6" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", iconClass: "devicon-nodejs-plain-wordmark", color: "#339933" },
      { name: ".NET", iconClass: "devicon-dotnetcore-plain", color: "#512BD4" },
      { name: "MongoDB", iconClass: "devicon-mongodb-plain", color: "#47A248" },
      { name: "MySQL", iconClass: "devicon-mysql-plain", color: "#4479A1" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", iconClass: "devicon-git-plain", color: "#F05032" },
      { name: "GitHub", iconClass: "devicon-github-original", color: "#E3E1E1" },
      { name: "Figma", iconClass: "devicon-figma-plain", color: "#F24E1E" },
      { name: "Postman", iconClass: "devicon-postman-plain", color: "#FF6C37" },
      { name: "Jira", iconClass: "devicon-jira-plain", color: "#0052CC" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 15, mass: 1 },
  },
};

const Skills = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const [activeTab, setActiveTab] = useState("frontend");
  const activeSkils = tabs.find((tab) => tab.id === activeTab)?.skills || [];

  return (
    <section id="skills" className="flex items-center justify-center py-20">
      <div className="max-w-4xl w-full px-4">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="text-white">Skills & </span>
          <span className="text-primary text-glow-primary">Technologies</span>
        </motion.h2>

        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-full bg-card/50 border border-border/50">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant="skills"
                className={` ${
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full glow-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="min-h-[310px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4"
          >
            {activeSkils.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ "--skill-color": skill.color } as React.CSSProperties}
                className="flex items-center flex-col gap-4 p-5 rounded-xl bg-card/50 backdrop-blur-sm transition-colors duration-300 cursor-pointer group border border-border/50 hover:border-(--skill-color) hover:shadow-[0_0_20px_-5px_var(--skill-color)] hover:bg-[color-mix(in_srgb,var(--skill-color),transparent_95%)]"
              >
                <div className="w-16 h-16 rounded-lg bg-transparent from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all relative">
                  {skill.iconClass ? (
                    //Devicon <i>
                    <i className={`${skill.iconClass} text-4xl text-muted-foreground transition-all duration-300 group-hover:opacity-0 group-hover:scale-110`} />
                  ) : (
                    //React-Icons 
                    skill.icon && (
                      <skill.icon className="text-4xl text-muted-foreground transition-all duration-300 group-hover:opacity-0 group-hover:scale-110"/>
                    )
                  )}

                  {/* HOVER  */}
                  {skill.iconClass ? (
                    //Devicon <i>
                    <i className={`${skill.iconClass} text-4xl absolute transition-all duration-300 opacity-0 scale-100 text-(--skill-color) group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_currentColor] `} />
                  ) : (
                    // React-Icons
                    skill.icon && (
                      <skill.icon className="text-4xl absolute transition-all duration-300 opacity-0 scale-100 text-(--skill-color) group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_currentColor]" />
                    )
                  )}
                </div>
                <span className="font-medium text-foreground">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
