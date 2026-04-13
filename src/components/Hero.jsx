import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background moves down 30% while scrolling (creates depth)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Text moves down intensely while scrolling (creates floating effect)
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={ref}
      className="relative w-full h-[80vh] flex items-center justify-center text-white overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 z-0 origin-top"
        style={{
          y: backgroundY,
          scale: 1.15, // scale up slightly to hide borders when moving
          backgroundImage: "url('https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=2000&auto=format&fit=crop')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      <div className="bg-black/50 absolute inset-0 z-10"></div>

      <motion.div 
        style={{ y: textY }}
        className="relative z-20 text-center px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md">
          Fresh Seafood in Salem
        </h1>
        <p className="mt-4 text-lg font-semibold tracking-wide drop-shadow-md text-white/90">
          Fish • Prawn • Crab
        </p>

        <button 
          onClick={() => document.getElementById('retail')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-primary mt-8 shadow-lg hover:scale-105 active:scale-95 transition-all outline-none"
        >
          Order Now
        </button>
      </motion.div>
    </section>
  );
}
