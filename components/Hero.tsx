'use client';
import React, { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    //filter: "blur(10px)",
  }, 
  visible: { 
    opacity: 1, 
    y: 0,
    //filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
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
    <section className="hero-section flex items-center justify-center min-h-screen">
        <div className="max-w-6xl w-full">
            <div className='text-center space-y-4'>
               
               <motion.h1
                    className="text-6xl md:text-7xl xl:text-8xl font-bold text-white flex flex-wrap gap-x-4 justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span variants={itemVariants}>
                        Hi,
                    </motion.span>

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
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-3xl md:text-4xl xl:text-5xl font-display text-secondary text-glow-secondary">
                        {displayText || '\u00A0'}
                    </p>
                </motion.div>

                <motion.p 
                    className="text-base xl:text-lg text-white/70 max-w-2xs xl:max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.8 }}

                >
                    Building the future of the web. I engineer modern, full-stack applications using <span className="text-secondary text-glow-secondary">Next.js</span>, <span className="text-secondary text-glow-secondary">Vue.js</span>, <span className="text-secondary text-glow-secondary">.NET</span> and <span className="text-secondary text-glow-secondary">Node.js</span>.
                </motion.p>

            </div>
        </div>
    </section>
  )
}

export default Hero