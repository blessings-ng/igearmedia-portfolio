"use client";
import React from "react";

const brands = [
  { name: "Steady Bow", count: "10k+ Followers", color: "bg-orange-500" },
  { name: "Ari the Creator", count: "5k subscribers", color: "bg-white text-black" },
  { name: "Essetino Media", count: "63k Subscribers", color: "bg-purple-600" },
  { name: "Brandoxel", count: "2k+ Subscribers", color: "bg-orange-600" }
];

export default function Brands({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section className={`w-full py-12 px-4 flex flex-col items-center border-t transition-colors duration-500 ${isDarkMode ? "border-white/10 bg-black" : "border-zinc-100 bg-white"}`}>
      <p className={`text-[10px] uppercase tracking-[0.3em] mb-10 font-bold ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
        Brands we've worked with
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-5xl">
        {brands.map((brand) => (
          <div key={brand.name} className="flex flex-col items-center gap-3 group">
            <div className={`w-full aspect-square border-2 flex items-center justify-center transition-all duration-300 ${isDarkMode ? "border-white/10" : "border-zinc-100"}`}>
               <div className={`w-12 h-12 flex items-center justify-center font-black ${brand.color}`}>{brand.name[0]}</div>
            </div>
            <p className="font-bold text-sm">{brand.name}</p>
            <span className="text-[9px] px-3 py-1 border border-brand-teal text-brand-teal font-bold rounded-full uppercase">{brand.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}