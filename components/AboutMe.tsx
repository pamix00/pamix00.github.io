"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

type CodeToken = {
  text: string;
  className: string;
};

const AboutMe = () => {
  const [charsTyped, setCharsTyped] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const colors = {
    default: "text-white/80",
    keyword: "text-secondary font-bold",
    string: "text-primary",
    number: "text-secondary",
  };

  const codeTokens: CodeToken[] = useMemo(
    () => [
      { text: "export const ", className: colors.keyword },
      { text: "profile = {\n", className: colors.default },

      // --- DANE OSOBOWE ---
      { text: "  name: ", className: colors.default },
      { text: '"Patryk Czech"', className: colors.string },
      { text: ",\n", className: colors.default },

      { text: "  age: ", className: colors.default },
      { text: "21", className: colors.number },
      { text: ",\n", className: colors.default },

      { text: "  location: ", className: colors.default },
      { text: '"Bialystok, Poland"', className: colors.string },
      { text: ",\n", className: colors.default },

      // --- HOBBY ---
      { text: "  hobbies: [", className: colors.default },
      { text: '"Gym"', className: colors.string },
      { text: ", ", className: colors.default },
      { text: '"Investing"', className: colors.string },
      { text: ", ", className: colors.default },
      { text: '"Petrolhead"', className: colors.string },
      { text: "],\n\n", className: colors.default },

      // --- EDUKACJA ---
      { text: "  education: {\n", className: colors.default },

      { text: "    university: ", className: colors.default },
      {
        text: '"Bialystok University of Technology"',
        className: colors.string,
      },
      { text: ",\n", className: colors.default },

      { text: "    major: ", className: colors.default },
      { text: '"Computer Science"', className: colors.string },
      { text: ",\n", className: colors.default },

      { text: "    status: ", className: colors.default },
      { text: '"In Progress (Year 3)"', className: colors.string },
      { text: "\n  },\n\n", className: colors.default },

      // --- STACK ---

      { text: "  stack: {\n", className: colors.default },

      { text: "    frontend: [", className: colors.default },
      { text: '"Next.js"', className: colors.string },
      { text: ", ", className: colors.default },
      { text: '"React"', className: colors.string },
      { text: ", ", className: colors.default },
      { text: '"Vue"', className: colors.string },
      { text: "],\n", className: colors.default },

      { text: "    backend:  [", className: colors.default },
      { text: '"Node.js"', className: colors.string },
      { text: ", ", className: colors.default },
      { text: '".NET Core"', className: colors.string },
      { text: "],\n", className: colors.default },

      { text: "  },", className: colors.default },
    ],
    []
  );

  const totalLength = useMemo(() => {
    return codeTokens.reduce((acc, token) => acc + token.text.length, 0);
  }, [codeTokens]);

  // --- LOGIKA PISANIA ---
  useEffect(() => {
    if (!isInView) return;

    setCharsTyped(0);

    const interval = setInterval(() => {
      setCharsTyped((prev) => {
        if (prev < totalLength) {
          // 2 znaki na cykl
          return prev + 2;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 25); // Prędkość pisania

    return () => clearInterval(interval);
  }, [isInView, totalLength]);

  const renderColoredCode = () => {
    let currentOffset = 0;
    const renderedTokens = [];

    for (let i = 0; i < codeTokens.length; i++) {
      const token = codeTokens[i];
      const tokenStart = currentOffset;
      const tokenEnd = currentOffset + token.text.length;

      if (charsTyped > tokenStart) {
        let textToShow = token.text;

        if (charsTyped < tokenEnd) {
          textToShow = token.text.substring(0, charsTyped - tokenStart);
        }

        renderedTokens.push(
          <span key={i} className={token.className}>
            {textToShow}
          </span>
        );
      }

      currentOffset = tokenEnd;

      if (currentOffset > charsTyped) break;
    }
    return renderedTokens;
  };

  return (
    <section id="about-me" className="flex items-center justify-center py-20">
      <div className="max-w-4xl w-full px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="text-white">About </span>
          <span className="text-primary text-glow-primary">Me</span>
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className=""
        >
          <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-primary/20 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 mix-blend-overlay" />

            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-gray-800 relative z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-sm text-white/50 ml-4 font-mono">
                patryk.config.ts
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm md:text-base bg-[#0a0a0a] min-h-[470px] relative z-10 leading-relaxed">
              <pre className="whitespace-pre-wrap">
                {renderColoredCode()}

                {/* Kursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-5 bg-secondary ml-1 align-sub"
                />
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
