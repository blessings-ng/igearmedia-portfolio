"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;

    if (!hasStarted) {
      video.currentTime = 0;
      video.play().then(() => {
        setHasStarted(true);
        setIsPaused(false);
      }).catch(() => {
        video.muted = true;
        video.play();
      });
    } else {
      if (video.paused) {
        video.play();
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center pt-32 pb-10 px-4 md:px-10 overflow-hidden">
      <div className="text-center mb-8 md:mb-12 max-w-4xl">
        <h1 className="text-2xl md:text-5xl font-bold leading-tight">
         Congratulations! You Just Found Your <br className="hidden md:block" /> 
          <span className="text-white">YouTube Content Production Team!</span>
        </h1>
      </div>

      <div 
        className={`relative aspect-video w-full max-w-6xl overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
          hasStarted && !isPaused ? 'border-brand-teal shadow-[0_0_40px_rgba(20,184,166,0.2)]' : 'border-white/10'
        }`}
        onClick={handleToggle}
      >
        <video
          ref={videoRef} autoPlay muted loop playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hasStarted && !isPaused ? "opacity-100" : "opacity-40"}`}
        >
          <source src="/Essetino Testimonial 2.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 transition-opacity duration-700 ${hasStarted && !isPaused ? "bg-transparent" : "bg-black/40"}`} />
        <div className="relative z-10 flex h-full items-center justify-center">
          <AnimatePresence>
            {(isPaused || !hasStarted) && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-sm">
                <svg className="ml-1 h-8 w-8 md:h-10 md:w-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}