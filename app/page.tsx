"use client";
import { useState } from "react";
import TiltCard from "@/components/TiltCard";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// Added subtitles to match the new Project Card UI
const portfolioVideos = [
  { id: "1", title: "Cinematic Reel", subtitle: "Directing / Edit", videoId: "bCwL8aaZtnY" },
  { id: "2", title: "Tech Glow", subtitle: "Visual Effects", videoId: "SOvPUsw2kGo" },
  { id: "3", title: "Night Vibes", subtitle: "Color Grading", videoId: "q0fS1HQPuaM" },
  { id: "4", title: "Media Flow", subtitle: "Brand Story", videoId: "tTBnn4TGFSk" },
  { id: "5", title: "Production", subtitle: "Motion Graphics", videoId: "WexXhORkCKk" },
  { id: "6", title: "Final Cut", subtitle: "Post Production", videoId: "-9uqcSNDEc0" },
  { id: "7", title: "Final Cut", subtitle: "Post Production", videoId: "0AtbaKrLTDo" },
  { id: "8", title: "Final Cut", subtitle: "Post Production", videoId: "9kKlZQGEOto" },

];

export default function Home() {
  // Track which video ID is currently playing
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <main className="bg-black min-h-screen overflow-x-hidden text-white">
      <Hero />

<section className="w-full py-10 md:py-20 px-4 flex justify-center bg-white text-black">
  {/* Single column stack. max-w-[900px] keeps the 'big screen' size sharp and focused */}
  <div className="flex flex-col gap-16 md:gap-24 w-full max-w-[900px]">
    {portfolioVideos.map((video, index) => (
      <TiltCard 
        key={video.id} 
        {...video} 
        side={index % 2 === 0 ? "left" : "right"}
        activePlayingId={playingId}
        setPlayingId={setPlayingId}
      />
    ))}
  </div>
</section>
      <Footer />
    </main>
  );
}