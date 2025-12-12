"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      
      <motion.h1
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15 
        }}
        className="text-9xl md:text-[11rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary select-none"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-3xl md:text-4xl font-semibold text-foreground"
      >
        Page not found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-2 text-muted-foreground max-w-[300px] text-md md:text-lg"
      >
        Sorry, the page you are looking for doesn't exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="mt-6 md:mt-8"
      >
        <Link href="/">
          <Button
              variant="primary"
            >
              Back to Home
            </Button>
        </Link>
      </motion.div>

    </div>
  );
}