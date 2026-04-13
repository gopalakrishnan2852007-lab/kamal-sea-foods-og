import React from 'react';

export default function Hero() {
  return (
    <section 
      className="relative h-[80vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=2000&auto=format&fit=crop')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="bg-black/50 absolute inset-0 z-[0]"></div>

      <div className="relative z-10 text-center px-4">
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
      </div>
    </section>
  );
}
