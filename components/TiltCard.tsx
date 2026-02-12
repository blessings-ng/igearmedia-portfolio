"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";

export default function TiltCard({ title, videoId, side }: { title: string, videoId: string, side: "left" | "right" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Parallax Slide
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const xMove = useTransform(scrollYProgress, [0, 1], side === "left" ? [-40, 40] : [40, -40]);

  // DIRECT values for SHARP response (No Spring = No Lag)
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
    <div ref={containerRef} style={{ perspective: "1200px" }} className="w-full py-4 touch-none">
      <motion.div
        onMouseMove={(e) => handleInput(e.clientX, e.clientY)}
        onTouchMove={(e) => handleInput(e.touches[0].clientX, e.touches[0].clientY)}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        onTouchEnd={() => { x.set(0); y.set(0); }}
        onClick={() => setIsPlaying(true)}
        style={{ 
          x: xMove, rotateX: isPlaying ? 0 : rotateX, rotateY: isPlaying ? 0 : rotateY, transformStyle: "preserve-3d" 
        }}
        className={`group relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-black border-2 transition-all duration-150 ${
          isPlaying ? 'border-brand-orange shadow-[0_0_40px_rgba(249,168,62,0.6)]' : 'border-white/10 hover:shadow-[0_0_50px_#3a8da8]'
        }`}
      >
        <div className="absolute inset-0 pointer-events-none scale-150 opacity-40 group-hover:opacity-100">
          <iframe
            src={isPlaying 
              ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1` 
              : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`
            }
            className={`w-full h-full border-none ${isPlaying ? 'pointer-events-auto' : 'pointer-events-none'}`}
          />
        </div>

        {/* Floating Text */}
        {!isPlaying && (
          <div style={{ transform: "translateZ(80px)" }} className="absolute bottom-4 left-4 z-30 pointer-events-none">
            <p className="text-[10px] font-black text-brand-orange [text-shadow:0_0_10px_#f9a83e] uppercase">igearmeedia</p>
            <h3 className="text-lg font-black italic text-white uppercase">{title}</h3>
          </div>
        )}

        {isPlaying && (
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
            className="absolute top-4 right-4 z-[60] bg-brand-orange text-black font-bold px-3 py-1 rounded-full text-xs"
          >
            EXIT
          </button>
        )}
      </motion.div>
    </div>
  );
}