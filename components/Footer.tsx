"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* LOGO AREA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12 flex flex-col items-center"
        >
          <img 
            src="/iGear Logo.png" 
            alt="igearmeedia logo" 
            className="h-16 w-auto mb-4"
          />
          <h2 className="text-xl font-black italic text-white tracking-tighter">
            iGEAR<span className="text-brand-teal">MEDIA</span>
          </h2>
        </motion.div>

        {/* FOOTER LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full text-center mb-16 max-w-2xl">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase text-brand-orange tracking-widest mb-2">Socials</p>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm uppercase font-bold">Instagram</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm uppercase font-bold">YouTube</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase text-brand-orange tracking-widest mb-2">Inquiries</p>
            <a href="mailto:hello@igearmeedia.com" className="text-zinc-500 hover:text-white transition-colors text-sm uppercase font-bold">Email Us</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm uppercase font-bold">WhatsApp</a>
          </div>
        </div>

        {/* BACK TO TOP BUTTON */}
        <button 
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 mb-10 transition-all"
        >
          <div className="w-px h-12 bg-gradient-to-t from-brand-teal to-transparent group-hover:h-16 transition-all duration-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-brand-teal">Back to Top</span>
        </button>

        {/* COPYRIGHT & LEGAL */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 gap-4">
          <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
            © 2026 IGearMeedia. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] text-zinc-700 font-bold uppercase cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="text-[10px] text-zinc-700 font-bold uppercase cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-brand-teal opacity-20 shadow-[0_0_100px_40px_rgba(58,141,168,0.1)]" />
    </footer>
  );
}