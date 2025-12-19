"use client";
import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Button from "./ui/Button";
import { ChevronDown } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const fullText = "Fullstack Web Developer";

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [startTyping]);

  return (
    <section id="hero" className="relative flex items-center justify-center min-h-screen">
      <div className="max-w-6xl w-full px-4">
        <div className="text-center space-y-4">
          <motion.h1
            className="text-6xl md:text-7xl xl:text-8xl font-bold text-white flex flex-wrap gap-x-4 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants}>Hi,</motion.span>

            <motion.span
              variants={itemVariants}
              onAnimationComplete={() => setStartTyping(true)}
            >
              I'm <span className="text-primary text-glow-primary">Patryk</span>
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0 }}
          >
            <p className="text-3xl md:text-4xl xl:text-5xl font-display text-secondary text-glow-secondary">
              {displayText || "\u00A0"}
            </p>
          </motion.div>

          <motion.p
            className="text-base xl:text-lg text-white/70 max-w-2xs xl:max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            Building the future of the web. I engineer modern, full-stack
            applications using{" "}
            <span className="text-secondary text-glow-secondary">Next.js</span>,{" "}
            <span className="text-secondary text-glow-secondary">Vue.js</span>,{" "}
            <span className="text-secondary text-glow-secondary">Node.js</span> and{" "}
            <span className="text-secondary text-glow-secondary">.NET</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, type: "spring" }}
          >
            <Button
              className="mt-4"
              variant="primary"
              onClick={() =>
                document
                  .getElementById("about-me")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              About Me
            </Button>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: {
            duration: 1,
            delay: 1.5,
          },
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2, 
          },
        }}
        onClick={() =>
          document
            .getElementById("about-me")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown className="w-10 h-10 text-primary" />
      </motion.div>
    </section>
  );
};

export default Hero;
