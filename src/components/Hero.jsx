import React from 'react';

export default function Hero() {
  return (
    <section 
      className="relative h-[85vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=2000&auto=format&fit=crop')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

      {/* content */}
      <div className="relative text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Fresh Seafood in Salem
        </h1>

        <p className="mt-3 text-lg opacity-90">
          Fish • Prawn • Crab
        </p>

        <button 
          onClick={() => document.getElementById('retail')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-primary mt-6"
        >
          Order Now
        </button>
      </div>
    </section>
  );
}
