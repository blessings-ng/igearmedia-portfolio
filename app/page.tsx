"use client";
import { useEffect, useRef } from "react";
import TiltCard from "@/components/TiltCard";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const portfolioVideos = [
  { id: 1, title: "Cinematic Reel", videoId: "3SxvR6M1f4U", side: "left" as const },
  { id: 2, title: "Tech Glow", videoId: "dQw4w9WgXcQ", side: "right" as const },
  { id: 3, title: "Night Vibes", videoId: "5v87YI-Nq5o", side: "left" as const },
  { id: 4, title: "Media Flow", videoId: "9Wd-m00vQ90", side: "right" as const },
  { id: 5, title: "Production", videoId: "L_LUpnqyT9Y", side: "left" as const },
  { id: 6, title: "Final Cut", videoId: "2Vv-BfVoq4g", side: "right" as const },
];

export default function Home() {
  const heroRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.play().catch(() => console.log("Hero autoplay blocked"));
    }
  }, []);

  return (
    <main className="bg-black min-h-screen overflow-x-hidden text-white">
      {/* LOCAL HERO VIDEO */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        
        <Hero/>
      </section>

<section className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
  {/* grid-cols-1 for mobile, grid-cols-3 for desktop */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
    {portfolioVideos.map((video) => (
      <TiltCard key={video.id} {...video} />
    ))}
  </div>
</section>

      <section>
        <Footer/>
      </section>
    </main>
  );
}