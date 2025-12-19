'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './ui/Logo';

const Footer = () => {
    const pathname = usePathname();

    const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            
            if ((window as any).lenis) {
                (window as any).lenis.scrollTo(0);
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string ) => {
        if (pathname === "/") {
            e.preventDefault();
    
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
    };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/pamix00", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/patryk-czech-2ab07a394/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:patrykczech00@gmail.com", label: "Email" },
  ];

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about-me" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative border-t border-border/40 bg-background/50 backdrop-blur-[2px] pt-12 pb-8 overflow-hidden z-10">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-4 md:mb-12">
          
          <div className="text-center md:text-left space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xl md:max-w-[200px]">
              Building digital experiences with code and creativity.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.90 }}
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary/20"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          
          <div className="flex items-center gap-1">
            &copy; {currentYear} Patryk Czech. All rights reserved. 
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-primary cursor-pointer"
          >
            Back to Top
            <ChevronUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;