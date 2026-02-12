"use client";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls after 2 seconds of playing
  useEffect(() => {
    if (hasStarted && !isPaused) {
      const timer = setTimeout(() => setShowControls(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowControls(true);
    }
  }, [hasStarted, isPaused]);

  const handleToggle = () => {
    if (!videoRef.current) return;

    if (!hasStarted) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setHasStarted(true);
      setIsPaused(false);
    } else {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-black cursor-pointer"
      onClick={handleToggle}
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] ${
          hasStarted && !isPaused ? "scale-105 opacity-100" : "scale-100 opacity-60"
        }`}
      >
        <source src="/Essetino Testimonial 2.mp4" type="video/mp4" />
      </video>

      {/* Overlay Blur/Dim */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        hasStarted && !isPaused ? "bg-black/10" : "bg-black/60 backdrop-blur-[1px]"
      }`} />

      {/* --- UI CONTROLS --- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        
        {/* 1. Large Central Toggle (Neon Feel) */}
        <div className={`transition-all duration-500 transform ${
          showControls ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}>
          <div className="group flex h-32 w-32 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md shadow-[0_0_30px_rgba(58,141,168,0.2)] hover:border-brand-teal transition-all">
            {isPaused || !hasStarted ? (
              <svg className="ml-2 h-12 w-12 text-brand-teal drop-shadow-[0_0_10px_#3a8da8]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </div>
          {!hasStarted && (
            <p className="mt-6 text-center text-[10px] font-black uppercase tracking-[0.5em] text-brand-orange animate-pulse">
              Click to Experience
            </p>
          )}
        </div>

        {/* 2. Bottom "Brand" Progress Bar (Visual Only) */}
        {hasStarted && (
          <div className={`absolute bottom-0 left-0 h-1 bg-brand-teal transition-all duration-700 ${
            isPaused ? "w-full opacity-50" : "w-0 opacity-0"
          }`} />
        )}
      </div>

      {/* Hero Branding - Stays visible but subtle */}
      <div className="absolute top-12 left-12 z-20 pointer-events-none">
         <h1 className="text-xl font-black italic text-white uppercase tracking-tighter">
            IGEAR<span className="text-brand-teal">MEEDIA</span>
         </h1>
      </div>
    </section>
  );
}