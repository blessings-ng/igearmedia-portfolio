"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import TiltCard from "@/components/TiltCard";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { Sun, Moon } from "lucide-react";

const portfolioVideos = [
  { id: "1", title: "What Actually Matters", subtitle: "From Book Idea to Media Coverage:", videoId: "bCwL8aaZtnY" },
  { id: "2", title: "Which To Focus on First?", subtitle: "Personal Branding vs Business Branding for Thought Leaders:", videoId: "SOvPUvsw2kGo" },
  { id: "3", title: "The Moment I Stopped", subtitle: "Tying My Self Worth to the Numbers:", videoId: "q0fS1HQPuaM" },
  { id: "4", title: "The Right Way", subtitle: "How To Upload Videos On YouTube:", videoId: "tTBnn4TGFSk" },
  { id: "5", title: "Project Preview", subtitle: "WexXhORkCKk", videoId: "WexXhORkCKk" },
  { id: "6", title: "What Happens When", subtitle: "Kids Lead The Way", videoId: "-9uqcSNDEc0" },
  { id: "7", title: "Risk Register", subtitle: "Build Without Risking Your Sanity:", videoId: "0AtbaKrLTDo" },
  { id: "8", title: "Cash Flow", subtitle: "How to Manage in Your Business:", videoId: "9kKlZQGEOto" },
];

export default function Home() {
  const [playingId, setPlayingId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      
      <Navbar isDarkMode={isDarkMode} />
      
      <Hero />

      <Brands isDarkMode={isDarkMode} />

      {/* THEME TOGGLE: FIXED MIDDLE RIGHT */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-[100] p-4 shadow-2xl transition-all border-y border-l active:scale-95 flex items-center justify-center ${
          isDarkMode 
          ? "bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800" 
          : "bg-white border-zinc-200 text-black hover:bg-zinc-50"
        }`}
      >
        {isDarkMode ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
      </button>

      {/* WORKS SECTION */}
      <section className={`w-full py-16 md:py-32 px-4 flex flex-col items-center transition-colors duration-500 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        
        {/* THE HEADER YOU WERE LOOKING FOR */}
        <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-16 md:mb-24 text-center">
          Check out our works
        </h1>

        <div className="flex flex-col gap-16 md:gap-24 w-full max-w-[900px]">
          {portfolioVideos.map((video, index) => (
            <TiltCard 
              key={video.id} 
              {...video} 
              isDarkMode={isDarkMode}
              side={index % 2 === 0 ? "left" : "right"}
              activePlayingId={playingId}
              setPlayingId={setPlayingId}
            />
          ))}
        </div>
      </section>

      <Reviews isDarkMode={isDarkMode} />

      <Footer />
    </main>
  );
}