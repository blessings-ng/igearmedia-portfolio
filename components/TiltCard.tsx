"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";

export default function TiltCard({ 
  id, title, subtitle, videoId, side, activePlayingId, setPlayingId 
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlaying = activePlayingId === id;

  // 1. POP-IN / POP-OUT ANIMATION
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const xMove = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    side === "left" ? [-80, 0, 0, -80] : [80, 0, 0, 80]
  );

  // 2. SHARP TILT (Direct Mapping)
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
      {/* THE MOTHER CARD - SHARP 16:9 BOX */}
      <motion.div
        style={{ 
          x: xMove, scale, opacity, rotateX: isPlaying ? 0 : rotateX, rotateY: isPlaying ? 0 : rotateY, transformStyle: "preserve-3d" 
        }}
        onMouseMove={(e) => handleInput(e.clientX, e.clientY)}
        onTouchMove={(e) => handleInput(e.touches[0].clientX, e.touches[0].clientY)}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        onTouchEnd={() => { x.set(0); y.set(0); }}
        onClick={() => !isPlaying && setPlayingId(id)}
        // SHARP EDGES (no rounding) to match your documentary style
        className={`relative w-full aspect-video bg-zinc-100 overflow-hidden cursor-pointer border-2 transition-colors duration-300 ${
          isPlaying ? 'border-red-600 shadow-2xl' : 'border-transparent hover:border-zinc-200'
        }`}
      >
        <div className="absolute inset-0">
          {!isPlaying ? (
            <div className="relative w-full h-full group">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                className="h-full w-full object-cover" 
                alt={title} 
              />
              {/* YouTube Style Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <svg className="ml-1 h-8 w-8 md:h-10 md:w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                 </div>
              </div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`}
              className="w-full h-full border-none"
              allow="autoplay; encrypted-media; fullscreen"
            />
          )}
        </div>

        {isPlaying && (
          <button 
            onClick={(e) => { e.stopPropagation(); setPlayingId(null); }}
            className="absolute top-4 right-4 z-[100] bg-black text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider"
          >
            Close
          </button>
        )}
      </motion.div>

      {/* THE DESCRIPTION SECTION (Matching your Mobile/Desktop Reference) */}
      <motion.div 
        style={{ x: xMove, opacity }} 
        className="mt-6 md:mt-8 flex flex-col items-center text-center max-w-[80%] md:max-w-full"
      >
        <p className="text-base md:text-2xl font-medium text-zinc-900 leading-snug">
          {subtitle} <span className="font-bold">({title})</span>
        </p>
      </motion.div>
    </div>
  );
}