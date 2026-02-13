"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  // Sync state with actual video playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.muted = false; // Unmute on first interaction
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    // Briefly show the icon when toggling
    setShowIcon(true);
  };

  // Auto-hide the center icon when playing
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => setShowIcon(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowIcon(true);
    }
  }, [isPlaying]);

  return (
    <section 
      className="relative h-[100svh] w-full bg-black cursor-pointer overflow-hidden"
      onClick={togglePlay}
    >
      {/* 1. THE MAIN VIDEO - No filters to prevent lag */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[3s] ease-out ${
          isPlaying ? "scale-105" : "scale-100 opacity-60"
        }`}
      >
        <source src="/Essetino Testimonial 2.mp4" type="video/mp4" />
      </video>

      {/* 2. MINIMALIST OVERLAY */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${
        isPlaying ? "bg-black/0" : "bg-black/40"
      }`} />

      {/* 3. CENTER PLAY/PAUSE ICON */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {showIcon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-sm shadow-[0_0_40px_rgba(58,141,168,0.3)]">
                {isPlaying ? (
                  <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="ml-1 h-10 w-10 text-brand-teal drop-shadow-[0_0_15px_#3a8da8]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
              {!isPlaying && (
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.6em] text-white/60">
                  Tap to Experience
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. BRANDING - Edge Anchored */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <h1 className="text-lg font-black italic text-white uppercase tracking-tighter">
          IGEAR<span className="text-brand-teal">MEEDIA</span>
        </h1>
      </div>
    </section>
  );
}