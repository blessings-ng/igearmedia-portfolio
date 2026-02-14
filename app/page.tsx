"use client";
import { useState } from "react";
import TiltCard from "@/components/TiltCard";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// Added subtitles to match the new Project Card UI
const portfolioVideos = [
  { id: "1", title: "Cinematic Reel", subtitle: "Directing / Edit", videoId: "3SxvR6M1f4U" },
  { id: "2", title: "Tech Glow", subtitle: "Visual Effects", videoId: "dQw4w9WgXcQ" },
  { id: "3", title: "Night Vibes", subtitle: "Color Grading", videoId: "5v87YI-Nq5o" },
  { id: "4", title: "Media Flow", subtitle: "Brand Story", videoId: "9Wd-m00vQ90" },
  { id: "5", title: "Production", subtitle: "Motion Graphics", videoId: "L_LUpnqyT9Y" },
  { id: "6", title: "Final Cut", subtitle: "Post Production", videoId: "2Vv-BfVoq4g" },
];

export default function Home() {
  // Track which video ID is currently playing
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <main className="bg-black min-h-screen overflow-x-hidden text-white">
      <Hero />

<section className="w-full py-10 px-4 md:px-10 flex justify-center bg-black">
  {/* max-w-[1000px] ensures the 2-column cards stay "medium" size on desktop */}
  <div className="grid grid-cols-2 gap-6 md:gap-12 w-full max-w-[1000px]">
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