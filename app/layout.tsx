import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });
const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani"
});

export const metadata: Metadata = {
  title: "Patryk Czech - Web Developer Portfolio",
  description: "Welcome to my portfolio website! I'm Patryk Czech, a passionate web developer specializing in creating stunning and functional websites. Explore my projects, skills, and get in touch to collaborate on your next web development venture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="fixed inset-0 z-0 pointer-events-none" >
          <ParticlesBackground /> 
        </div>
        <SmoothScroll />
        <Navbar />
        <main className="grow flex flex-col relative z-10">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'rgba(5, 5, 5, 0.5)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid #262626',
              color: '#fff',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '14px',
            },
            
            success: {
              iconTheme: {
                primary: '#00f0ff',
                secondary: '#000',
              },
              style: {
                border: '1px solid #00f0ff',
              }
            },

            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#000',
              },
              style: {
                border: '1px solid #ef4444',
              }
            },
          }}
        />
      </body>
    </html>
  );
}
