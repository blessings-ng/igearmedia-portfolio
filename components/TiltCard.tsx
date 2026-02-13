"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";

export default function TiltCard({ title, videoId, side }: { title: string, videoId: string, side: "left" | "right" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. THE SLIDE-IN (Scroll Parallax)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // This handles the sliding animation as you scroll
  const xMove = useTransform(
    scrollYProgress, 
    [0, 1], 
    side === "left" ? [-100, 100] : [100, -100]
  );

  // 2. THE SHARP TILT (Mouse/Touch)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleInput = (clientX: number, clientY: number) => {
    if (isPlaying || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((clientX - rect.left) / rect.width - 0.5);
    y.set((clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div ref={containerRef} style={{ perspective: "1200px" }} className="w-full py-10 overflow-hidden">
      <motion.div
        onMouseMove={(e) => handleInput(e.clientX, e.clientY)}
        onTouchMove={(e) => handleInput(e.touches[0].clientX, e.touches[0].clientY)}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        onTouchEnd={() => { x.set(0); y.set(0); }}
        onClick={() => !isPlaying && setIsPlaying(true)}
        style={{ 
          x: xMove, // Applies the slide animation
          rotateX: isPlaying ? 0 : rotateX, 
          rotateY: isPlaying ? 0 : rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className={`group relative aspect-video w-full cursor-pointer rounded-2xl bg-black border-2 transition-all duration-300 ${
          isPlaying ? 'border-brand-orange scale-[1.02] z-50' : 'border-white/10'
        }`}
      >
        {/* Thumbnail Preview */}
        {!isPlaying ? (
          <div className="absolute inset-0 h-full w-full pointer-events-none">
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
              className="h-full w-full object-cover opacity-50"
              alt={title}
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="h-14 w-14 rounded-full border border-brand-teal bg-black/40 flex items-center justify-center">
                  <svg className="ml-1 h-8 w-8 text-brand-teal" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
            className="absolute inset-0 h-full w-full border-none"
          />
        )}

        {/* Text */}
        {!isPlaying && (
          <div style={{ transform: "translateZ(50px)" }} className="absolute bottom-6 left-6 z-30 pointer-events-none">
            <p className="text-[10px] font-black uppercase text-brand-orange tracking-widest mb-1">igearmeedia</p>
            <h3 className="text-xl font-black italic text-white uppercase">{title}</h3>
          </div>
        )}
      </motion.div>
    </div>
  );
}