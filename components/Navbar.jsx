"use client";
import React from "react";
import { Instagram, Youtube, Mail } from "lucide-react";

export default function Navbar({ isDarkMode }) {
  return (
    <nav className={`fixed top-0 left-0 w-full z-[150] px-4 md:px-10 py-3 md:py-5 flex justify-between items-center transition-all duration-500 ${
      isDarkMode ? "bg-black/80 backdrop-blur-md text-white" : "bg-white/80 backdrop-blur-md text-black"
    }`}>
      
      {/* RESPONSIVE LOGO */}
      <div className="flex items-center">
        {/* <img 
          src="/iGear Logo.png" 
          alt="Logo" 
          className={`h-6 md:h-10 w-auto object-contain transition-all duration-500 ${isDarkMode ? "invert-0" : "invert"}`} 
        /> */}
        <h1 className="text-xl md:text-2xl font-bold">iGearMedia</h1>
      </div>

      {/* RESPONSIVE SOCIALS */}
      <div className="flex items-center gap-4 md:gap-8">
        <a href="#" className="hover:text-brand-teal transition-colors"><Instagram size={18} className="md:w-5 md:h-5" /></a>
        <a href="#" className="hover:text-brand-teal transition-colors"><Youtube size={20} className="md:w-6 md:h-6" /></a>
        <a href="#" className="hover:text-brand-teal transition-colors"><Mail size={18} className="md:w-5 md:h-5" /></a>
        
        {/* WHATSAPP: LABEL HIDES ON MOBILE TO SAVE SPACE */}
        <a 
          href="https://wa.me/yournumber" 
          className="flex items-center gap-2 px-2 md:px-4 py-1.5 border border-green-500/30 rounded-full bg-green-500/5 hover:bg-green-500/10 transition-all"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:block text-green-500">
            Chat
          </span>
        </a>
      </div>
    </nav>
  );
}