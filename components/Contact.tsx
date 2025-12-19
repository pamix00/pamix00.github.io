'use client'
import React, { useRef, useState } from 'react'
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import Button from './ui/Button';
import { sendEmail } from '@/actions/sendEmail';
import toast from 'react-hot-toast';

const socialLinks = [
  { icon: Github, label: "GitHub", url: "https://github.com/pamix00" },
  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/patryk-czech-2ab07a394/"},
  { icon: Mail, label: "Email", url: "mailto:patrykczech00@gmail.com" },
];

const Contact = () => {

    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
    const formRef = useRef(null);
    const isFormInView = useInView(formRef, { once: true, amount: 0.1 });

    const detailsRef = useRef(null);
    const isDetailsInView = useInView(detailsRef, { once: true, amount: 0.1 });

    const [focused, setFocused] = useState("");
    const [pending, setPending] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = formData.get("name")?.toString().trim();
        const senderEmail = formData.get("senderEmail")?.toString().trim();
        const subject = formData.get("subject")?.toString().trim();
        const message = formData.get("message")?.toString().trim();

        if (!name) { toast.error("Please enter your name.", {id: 'contact-error'}); return; }
        if (!senderEmail) { toast.error("Please enter your email.", {id: 'contact-error'}); return; }
        if (!subject) { toast.error("Please enter a subject.", {id: 'contact-error'}); return; }
        if (!message) { toast.error("Please enter your message.", {id: 'contact-error'}); return; }

        setPending(true);

        await new Promise(resolve => setTimeout(resolve, 200));

        const result = await sendEmail(formData);

        if (result?.error) {
            toast.error(result.error || "Something went wrong.", {id: 'contact-error'});
        } else {
            toast.success("Message sent successfully!", {id: 'contact-error'});
            form.reset();
        }
        setPending(false);
    };

  return (
    <section id="contact" className="flex items-center justify-center py-20">
        <div className="max-w-4xl w-full px-4">
            <motion.h2
              ref={headerRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-center mb-12"
            >
              <span className="text-white">Get in </span>
              <span className="text-primary text-glow-primary">Touch</span>
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="">
                    <div>
                        <h3 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        <motion.span 
                            ref={formRef}
                            initial={{ opacity: 0, x: -100 }}
                            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-glow-primary block">
                                Let's Build
                        </motion.span>
                        <motion.span 
                            ref={formRef}
                            initial={{ opacity: 0, x: -100 }}
                            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-glow-secondary block">
                            Something
                            </motion.span>
                        <motion.span 
                            ref={formRef}
                            initial={{ opacity: 0, x: -100 }}
                            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-foreground block">
                            Amazing
                        </motion.span>
                        </h3>
                    </div>

                    <motion.div 
                        ref={detailsRef}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isDetailsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.7 }}
                        className='space-y-8'>
                        <motion.p 
                            className="text-lg text-muted-foreground leading-relaxed">
                            Have a project in mind? Let's collaborate and create something extraordinary together.
                        </motion.p>
                    
                    
                        <motion.div className='space-y-4'>
                            <h4 className="text-sm text-muted-foreground leading-tight uppercase font-semibold">
                                Connect with me
                            </h4>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                    className={`
                                        group flex items-center justify-center w-14 h-14 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground 
                                        hover:border-primary hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_-5px_var(--primary)] transition-colors duration-300
                                    `}
                                    >
                                    <social.icon 
                                        className="w-6 h-6 transition-all duration-300 group-hover:scale-110  group-hover:drop-shadow-[0_0_8px_currentColor]" 
                                    />
                                    </motion.a>
                                ))}
                            </div>
                            <div className="space-y-3 pt-8 border-t border-border">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <span>patrykczech00@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                                    <span>Available for freelance work</span>
                                </div>
                            </div>  
                            
                        </motion.div>
                    </motion.div>
                        
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={isDetailsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.7 }}
                    className="bg-card/50 border border-border rounded-2xl p-6"
                >
                    <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                name='name'
                                placeholder="Name" 
                                onFocus={() => setFocused("name")}
                                onBlur={() => setFocused("")}
                                className={`w-full p-4 bg-background/50 border border-border rounded-2xl placeholder:muted-foreground focus:outline-none transition-all duration-200 ${
                                    focused === "name" ? "border-primary glow-primary" : "border-border hover:border-primary/50"}`}
                            >
                            </input>
                        </div>
                        <div>
                            <input
                                type="email"
                                name='senderEmail'
                                placeholder="Email" 
                                onFocus={() => setFocused("email")}
                                onBlur={() => setFocused("")}
                                className={`w-full p-4 bg-background/50 border border-border rounded-2xl placeholder:muted-foreground focus:outline-none transition-all duration-200 ${
                                    focused === "email" ? "border-primary glow-primary" : "border-border hover:border-primary/50"}`}
                            >
                            </input>
                        </div>
                        <div>
                            <input
                                type="text"
                                name='subject'
                                placeholder="Subject" 
                                onFocus={() => setFocused("subject")}
                                onBlur={() => setFocused("")}
                                className={`w-full p-4 bg-background/50 border border-border rounded-2xl placeholder:muted-foreground focus:outline-none transition-all duration-200 ${
                                    focused === "subject" ? "border-primary glow-primary" : "border-border hover:border-primary/50"}`}
                            >
                            </input>
                        </div>
                        <div className="">
                            <textarea
                                name='message'
                                placeholder="Your Message" 
                                rows={6}
                                onFocus={() => setFocused("message")}
                                onBlur={() => setFocused("")}
                                data-lenis-prevent
                                className={`w-full p-4 bg-background/50 border border-border rounded-2xl placeholder:muted-foreground focus:outline-none transition-all duration-200 resize-none overflow-y-auto overscroll-y-contain ${
                                    focused === "message" ? "border-primary glow-primary" : "border-border hover:border-primary/50"}`}
                            >
                            </textarea>
                        </div>
                        <Button className='flex gap-2 items-center justify-center w-full font-bold' variant="primary" type="submit" disabled={pending}>
                            {pending ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </Button>
                        

                    </form>
                </motion.div>
            </div>
        </div>
    </section>
  )
}

export default Contact