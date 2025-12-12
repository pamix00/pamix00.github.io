"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/#about-me" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
      if (pathname === "/" && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }, [pathname]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string ) => {
    if (pathname === "/") {
      e.preventDefault();
      setIsOpen(false);

      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);

      if (element) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(element, { offset: -80 });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    else {
      setIsOpen(false);
    }
  };

  const isFloating = scrolled && !isOpen;

  return (
    <>
      <motion.nav
        layout 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          y: {
            type: "spring",
            stiffness: 60,
            damping: 15,
            mass: 1
          },
        }}

        className={`fixed z-50 max-w-7xl mx-auto
          ${isFloating
            ? "top-4 left-4 right-4 md:top-6 md:max-w-5xl md:mx-auto rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl h-20"
            : "top-0 left-0 right-0 w-full h-20 border-b border-transparent bg-transparent"
          }
          ${isOpen ? "bg-background/50 backdrop-blur-md border-b border-border/50" : ""}
        `}
        
        style={{ transformOrigin: "top center" }} 
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            
            <motion.div layout="position" className="flex-shrink-0"
              animate={{ 
                  x: isFloating ? [-25, 0] : [25, 0] 
                }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 12,
                mass: 1.5
             }}
            >
              <Logo />
            </motion.div>

            {/* DESKTOP MENU */}
            <motion.div layout="position" className="hidden md:block"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 23,
                mass: 1.5
             }}
            >
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:text-glow-primary transition-colors duration-200 px-3 py-2 rounded-md cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* MOBILE TOGGLE */}
            <motion.div layout="position" className="md:hidden"
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                mass: 0.8
             }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-primary transition-colors p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </motion.div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/50 backdrop-blur-sm border-b border-border/50 overflow-hidden absolute top-full left-0 right-0 shadow-2xl rounded-b-2xl"
            >
              <div className="px-4 pt-2 pb-8 space-y-2 flex flex-col items-center">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="block w-full text-center text-lg font-medium text-muted-foreground hover:text-primary hover:bg-white/5 px-3 py-4 rounded-lg transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* BACKDROP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;