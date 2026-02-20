"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Define the interface for the component props
interface ReviewsProps {
  isDarkMode: boolean;
}

const TESTIMONIALS = [
  { id: 1, quote: "We entrusted Rahmon & his team with our YouTube channel and was BLOWN with their execution!...", name: "Daniel", role: "CEO, BRANDOXEL" },
  { id: 2, quote: "Working with Rahmon and his team completely leveled up our YouTube videos...", name: "Auret", role: "Essetino Media" },
  { id: 4, quote: "Rahmon is an extremely enthusiastic and fun character to work with...", name: "Niel", role: "Founder BBR" }
];

export default function Reviews({ isDarkMode }: ReviewsProps) {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className={`w-full py-20 px-4 flex flex-col items-center transition-colors duration-500 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <h2 className={`text-2xl md:text-4xl font-bold mb-12 uppercase text-center ${isDarkMode ? "text-white" : "text-black"}`}>
        What our clients say about us:
      </h2>
      
      <div className={`relative w-full max-w-[900px] border-[1px] p-10 md:p-16 flex flex-col items-center text-center ${isDarkMode ? "border-zinc-800 text-white" : "border-zinc-100 text-black shadow-sm"}`}>
        <Quote className="text-brand-teal mb-8 opacity-50" size={40} />
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={current} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            className="flex flex-col items-center"
          >
            <p className="text-lg md:text-2xl font-medium italic leading-relaxed mb-10">
              "{TESTIMONIALS[current].quote}"
            </p>
            <p className="font-bold text-xl">{TESTIMONIALS[current].name}</p>
            <p className="text-brand-teal text-xs uppercase font-black tracking-widest mt-2">
              {TESTIMONIALS[current].role}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 -translate-y-1/2 w-full left-0 px-4 flex justify-between pointer-events-none">
          <button 
            onClick={prev} 
            className="pointer-events-auto text-brand-teal hover:scale-125 transition-transform"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          <button 
            onClick={next} 
            className="pointer-events-auto text-brand-teal hover:scale-125 transition-transform"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
}