import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <header className="hero-dark-glow min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Abstract gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Text Content */}
        <div className="text-center lg:text-left max-w-2xl py-10 lg:py-0">
          <ScrollReveal className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-blue-200 text-xs font-bold tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Hygienically Frozen
          </ScrollReveal>
          
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl lg:text-[4.5rem] font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Premium Frozen &<br />Ready-to-Cook <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 drop-shadow-md">Seafood</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal>
            <p className="text-gray-400 text-lg md:text-xl font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Cold storage maintained perfectly for retail and hotel supply. Frozen at source to lock freshness,
              processed at ultra-low temps, and delivered straight to your door.
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#retail" className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-900 rounded-xl font-black hover:bg-gray-100 transition-transform duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-center">
              Explore Products
            </a>
            <a href="https://wa.me/919865668125" className="w-full sm:w-auto px-8 py-3.5 bg-gray-800/80 backdrop-blur-md text-white border border-gray-700 rounded-xl font-bold hover:bg-gray-700 transition-transform duration-300 hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-green-400 text-[20px]">chat</span> Bulk Enquiries
            </a>
          </ScrollReveal>
        </div>

        {/* Right Visual: Floating Product Card & Image */}
        <ScrollReveal className="relative w-full lg:w-1/2 justify-center lg:justify-end hidden md:flex pb-10 lg:pb-0">
          {/* Background Image Card */}
          <div className="relative w-[340px] h-[460px] rounded-[32px] overflow-hidden shadow-2xl animate-float border-[3px] border-white/5 group">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10 hover:opacity-90 transition-opacity"></div>
            <img src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=800&auto=format&fit=crop" alt="frozen prawn" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute bottom-8 left-8 right-8 z-20 transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="text-white font-black text-2xl tracking-tight shadow-sm mb-1 leading-tight">Ocean Fresh<br />Tiger Prawns</h3>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-2">Frozen Premium Cut</p>
            </div>
          </div>

          {/* Floating Abstract Stats Card */}
          <div className="absolute -bottom-8 -left-6 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-5 rounded-2xl shadow-2xl animate-float-delay z-30 group hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">ac_unit</span>
              </div>
              <div>
                <p className="text-white font-black text-lg">Ultra Low Temp</p>
                <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">Cold Chain Integrity</p>
              </div>
            </div>
          </div>

          {/* Floating Abstract Stock Card */}
          <div className="absolute top-12 -right-10 bg-gray-900/80 backdrop-blur-xl border border-gray-700 px-5 py-4 rounded-xl shadow-xl animate-float-delay z-30 flex items-center gap-3" style={{ animationDelay: '2s' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
            <p className="text-white font-bold text-sm tracking-wide">Wholesale & Retail ready</p>
          </div>
        </ScrollReveal>
      </div>
    </header>
  );
}
