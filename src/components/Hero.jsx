import React from 'react';
import ScrollReveal from './ScrollReveal';
import { SYMBOLS, openWhatsApp } from '../utils/whatsappUtils';

export default function Hero() {
  return (
    <header className="bg-gradient-to-br from-primary to-secondary min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Clean subtle light overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Text Content */}
        <div className="text-center lg:text-left max-w-2xl py-10 lg:py-0">
          <ScrollReveal className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Hygienically Frozen
          </ScrollReveal>
          
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl lg:text-[4.5rem] font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Premium Frozen &<br />Ready-to-Cook Seafood
            </h2>
          </ScrollReveal>
          
          <ScrollReveal>
            <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Cold storage maintained perfectly for retail and hotel supply. Frozen at source to lock freshness,
              processed at ultra-low temps, and delivered straight to your door.
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#retail" className="w-full sm:w-auto px-8 py-3.5 bg-accent text-white rounded-lg font-bold hover:bg-teal-600 transition-colors shadow-lg text-center">
              Explore Products
            </a>
            <button 
              onClick={() => {
                const bulkMessageText = [
                  `Hi Kamal Sea Food! ${SYMBOLS.WAVE} I'm interested in a *BULK ORDER* ${SYMBOLS.PACKAGE}`,
                  ``,
                  `My Details:`,
                  `${SYMBOLS.BULLET} Business Name: `,
                  `${SYMBOLS.BULLET} Location: `,
                  `${SYMBOLS.BULLET} Products Needed: `,
                  `${SYMBOLS.BULLET} Quantity Required: `,
                  ``,
                  `Please share wholesale pricing and availability! ${SYMBOLS.PRAY}`
                ].join('\n');
                
                openWhatsApp(bulkMessageText);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">chat</span> Bulk Enquiries
            </button>
          </ScrollReveal>
        </div>

        {/* Right Visual: Floating Product Card & Image */}
        <ScrollReveal className="relative w-full lg:w-1/2 justify-center lg:justify-end hidden md:flex pb-10 lg:pb-0">
          {/* Background Image Card */}
          <div className="relative w-[340px] h-[460px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent z-10 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=60&w=800&auto=format&fit=crop&fm=webp" 
              alt="frozen tiger prawn" 
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="800"
              height="600"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              className="absolute inset-0 transition-transform duration-[2s] group-hover:scale-110" 
            />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <h3 className="text-white font-bold text-2xl tracking-tight mb-1 leading-tight">Ocean Tiger<br />Prawns</h3>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mt-2">Frozen Premium Cut</p>
            </div>
          </div>

          {/* Floating Abstract Stats Card */}
          <div className="absolute -bottom-8 -left-6 bg-white px-6 py-5 rounded-xl shadow-xl z-30 flex items-center gap-4">
            <div className="w-12 h-12 bg-altbg rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">ac_unit</span>
            </div>
            <div>
              <p className="text-textprimary font-bold text-base">Ultra Low Temp</p>
              <p className="text-textsecondary text-[10px] uppercase font-semibold">Cold Chain Integrity</p>
            </div>
          </div>

          {/* Floating Abstract Stock Card */}
          <div className="absolute top-12 -right-10 bg-white px-5 py-4 rounded-xl shadow-xl z-30 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></div>
            <p className="text-textprimary font-bold text-sm">Wholesale & Retail ready</p>
          </div>
        </ScrollReveal>
      </div>
    </header>
  );
}
