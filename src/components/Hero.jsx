import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden bg-[#021B2B]">
      {/* moving water gradient */}
      <div className="absolute inset-0 water-move"></div>

      {/* floating fish */}
      <div className="fish fish1">🐟</div>
      <div className="fish fish2">🐠</div>
      <div className="fish fish3">🐡</div>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* content */}
      <div className="relative text-center z-10 px-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          Premium Seafood in Salem
        </h1>

        <p className="mt-3 text-lg">
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
