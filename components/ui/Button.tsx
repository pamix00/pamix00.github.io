"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "skills" | "dark" | "circleDark";
}

const Button = ({ children, className = "", variant = "primary", ...props }: ButtonProps) => {
  
  const baseStyle = "transition-colors duration-300 shadow-lg cursor-pointer";
  const isCirlce = variant === "circleDark";
  const hoverScale = isCirlce ? 1.1 : 1.05;
  
  const variants = {
    primary: "px-6 py-3 rounded-lg glow-primary bg-primary text-primary-foreground",
    dark: "px-6 py-3 rounded-lg bg-transparent border border-border text-foreground text-sm font-medium hover:border-primary/50",
    circleDark: "p-3 rounded-full border border-border text-foreground text-sm font-medium hover:border-primary/50",
    outline: "px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10",
    skills: "relative rounded-lg px-6 py-2.5 text-sm rounded-full font-medium",
  };

  return (
    <motion.button
      transition={{ duration: 0.2 }} 
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.95 }}
      
      className={`${baseStyle} ${variants[variant]} ${className}`}
      
      {...props} 
    >
      {children}
    </motion.button>
  );
};

export default Button;