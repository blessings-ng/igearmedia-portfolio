"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";

// Define types for the props
interface TiltCardProps {
  id: string;
  title: string;
  subtitle: string;
  videoId: string;
  side: "left" | "right";
  activePlayingId: string | null;
  setPlayingId: (id: string | null) => void;
  isDarkMode: boolean;
}

export default function TiltCard({ 
  id, title, subtitle, videoId, side, activePlayingId, setPlayingId, isDarkMode 
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlaying = activePlayingId === id;
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const xMove = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], side === "left" ? [-80, 0, 0, -80] : [80, 0, 0, 80]);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleInput = (clientX: number, clientY: number) => {
    if (isPlaying || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((clientX - rect.left) / rect.width - 0.5);
    y.set((clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div ref={containerRef} style={{ perspective: "1500px" }} className="w-full flex flex-col items-center">
      <motion.div
        style={{ x: xMove, scale, opacity, rotateX: isPlaying ? 0 : rotateX, rotateY: isPlaying ? 0 : rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => handleInput(e.clientX, e.clientY)}
        onClick={() => !isPlaying && setPlayingId(id)}
        className="relative w-full aspect-video group"
      >
        <div className={`absolute inset-0 transition-all duration-700 opacity-0 blur-[60px] -z-10 scale-95 ${isDarkMode ? 'group-hover:opacity-40 group-hover:scale-110' : ''} ${isPlaying && isDarkMode ? 'opacity-60 scale-125 bg-red-600' : 'bg-brand-teal'}`} />

        <div className={`relative w-full h-full overflow-hidden border-[1px] transition-all duration-500 bg-black ${isPlaying ? 'border-red-600' : isDarkMode ? 'border-zinc-900' : 'border-zinc-200 bg-zinc-50'}`}>
          {!isPlaying ? (
            <div className="relative w-full h-full">
              <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} className="h-full w-full object-cover group-hover:opacity-80 transition-all" alt={title} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
                    <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </div>
              </div>
            </div>
          ) : (
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} className="w-full h-full border-none" allow="autoplay; fullscreen" />
          )}
        </div>
      </motion.div>
      <motion.div style={{ x: xMove, opacity }} className="mt-8 text-center">
        <p className={`text-base md:text-2xl font-medium ${isDarkMode ? "text-zinc-300" : "text-zinc-900"}`}>{subtitle} <span className="font-bold">({title})</span></p>
      </motion.div>
    </div>
  );
}