import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
