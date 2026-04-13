import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Physically scroll background down at 20% speed
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // Fast text scrolling for massive 3D depth
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  return (
    <section 
      ref={ref}
      className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden bg-gray-900"
    >
      {/* Background layer */}
      <motion.div 
        className="absolute inset-0 z-0 origin-top"
        style={{
          y: backgroundY,
          scale: 1.15, // Scale to hide edges during parallax translation
          backgroundImage: "url('https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=2000&auto=format&fit=crop')", // Ultra-premium moody dark ocean
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10"></div>

      {/* Content */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-20 text-center px-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight drop-shadow-xl shadow-black">
          Fresh Seafood in Salem
        </h1>

        <p className="mt-4 text-lg md:text-xl font-medium tracking-wide opacity-90 drop-shadow-md">
          Fish • Prawn • Crab
        </p>

        <button 
          onClick={() => document.getElementById('retail')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 bg-[#0B3C5D] text-white px-10 py-4 rounded-xl font-black text-lg tracking-wide shadow-[0_15px_30px_rgba(11,60,93,0.4)] hover:bg-[#0077B6] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Order Now
        </button>
      </motion.div>
    </section>
  );
}
