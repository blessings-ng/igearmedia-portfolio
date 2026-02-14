"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";

export default function TiltCard({ 
  id, title, subtitle, videoId, side, activePlayingId, setPlayingId 
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlaying = activePlayingId === id;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const xMove = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    side === "left" ? [-50, 0, 0, -50] : [50, 0, 0, 50]
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleInput = (clientX: number, clientY: number) => {
    if (isPlaying || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((clientX - rect.left) / rect.width - 0.5);
    y.set((clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div ref={containerRef} style={{ perspective: "1200px" }} className="w-full flex justify-center py-4 md:py-8">
      <motion.div
        style={{ 
          x: xMove, scale, opacity, rotateX: isPlaying ? 0 : rotateX, rotateY: isPlaying ? 0 : rotateY, transformStyle: "preserve-3d" 
        }}
        onMouseMove={(e) => handleInput(e.clientX, e.clientY)}
        onTouchMove={(e) => handleInput(e.touches[0].clientX, e.touches[0].clientY)}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        onTouchEnd={() => { x.set(0); y.set(0); }}
        onClick={() => !isPlaying && setPlayingId(id)}
        className={`relative flex flex-col w-full aspect-[4/5] rounded-[30px] md:rounded-[40px] bg-black border-[1px] md:border-2 transition-all duration-300 overflow-hidden ${
          isPlaying ? 'border-brand-orange z-50 ring-2 ring-brand-orange/20' : 'border-white/10 hover:border-brand-teal'
        }`}
      >
        {/* VIDEO CONTENT */}
        <div className={`absolute inset-0 z-10 transition-all duration-500 overflow-hidden ${isPlaying ? 'opacity-100' : 'p-3 md:p-5'}`}>
           <div className={`relative w-full h-full overflow-hidden transition-all duration-500 ${isPlaying ? 'rounded-none' : 'rounded-[20px] md:rounded-[30px]'}`}>
              {!isPlaying ? (
                <>
                  <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} className="h-full w-full object-cover opacity-60" alt={title} />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="h-10 w-10 md:h-14 md:w-14 rounded-full border border-brand-teal bg-black/40 flex items-center justify-center">
                        <svg className="ml-1 h-5 w-5 md:h-7 md:w-7 text-brand-teal" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                     </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0`}
                    className="absolute top-1/2 left-1/2 w-[178%] h-full -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    allow="autoplay; encrypted-media; fullscreen"
                  />
                </div>
              )}
           </div>
        </div>

        {/* UI CONTENT */}
        <div className="mt-auto flex flex-col items-center text-center gap-1 p-6 md:p-10">
          <h3 className="text-base md:text-2xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-[10px] md:text-xs text-zinc-500 font-medium uppercase tracking-widest">({subtitle})</p>
          <button className="mt-4 md:mt-8 w-full max-w-[160px] py-2 md:py-3 rounded-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] active:bg-white active:text-black transition-all">
            View
          </button>
        </div>

        {isPlaying && (
          <button 
            onClick={(e) => { e.stopPropagation(); setPlayingId(null); }}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[100] bg-brand-orange text-black font-black px-4 py-2 rounded-full text-[10px] uppercase shadow-2xl"
          >
            Close
          </button>
        )}
      </motion.div>
    </div>
  );
}