"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

const Button = ({ children, className = "", variant = "primary", ...props }: ButtonProps) => {
  
  const baseStyle = "rounded-lg font-bold transition-colors duration-300 shadow-lg cursor-pointer";
  
  const variants = {
    primary: "px-6 py-3 glow-primary bg-primary text-primary-foreground",
    outline: "px-6 py-3 border border-primary text-primary hover:bg-primary/10",
    skills: "relative px-6 py-2.5 text-sm rounded-full font-medium",
  };

  return (
    <motion.button
      transition={{ duration: 0.2 }} 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      
      className={`${baseStyle} ${variants[variant]} ${className}`}
      
      {...props} 
    >
      {children}
    </motion.button>
  );
};

export default Button;