"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Logo = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={scrollToTop}
      className="flex items-center font-mono font-bold text-xl md:text-2xl tracking-tight group"
    >
      <span className="text-primary mr-1 group-hover:-translate-x-1 transition-transform duration-300 text-glow-primary">
        {"<"}
      </span>

      <span className="text-white group-hover:text-white/80 transition-colors">
        PC
      </span>

      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 0.5, 1],
        }}
        className="text-secondary mx-0.5 text-glow-secondary"
      >
        _
      </motion.span>
      <span className="text-primary ml-1 group-hover:translate-x-1 transition-transform duration-300 text-glow-primary">
        {"/>"}
      </span>
    </Link>
  );
};

export default Logo;
