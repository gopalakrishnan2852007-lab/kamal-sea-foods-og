import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="relative pt-32 pb-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#021B2B] via-[#052d47] to-[#021B2B] text-white scroll-mt-32">
      {/* Subtle Floating Bubbles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              animation: `bubbleUp ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 gap-4 lg:gap-16 items-start">
          
          {/* Left Side: Content */}
          <ScrollReveal direction="left">
            <div className="glass-card p-4 md:p-12 rounded-[1.5rem] md:rounded-[2rem]">
              <p className="text-secondary font-bold uppercase tracking-widest text-[8px] md:text-xs mb-2 md:mb-4">Our Legacy</p>
              <h2 className="text-xl md:text-5xl font-black tracking-tight mb-4 md:mb-8 leading-tight">About Kamal Sea Food</h2>
              
              <div className="space-y-3 md:space-y-6 text-gray-200 text-[10px] md:text-lg leading-relaxed font-medium">
                <p>
                  At Kamal Sea Food, we supply premium quality frozen seafood for both retail and bulk customers. 
                  We focus on quality, hygiene, and reliable delivery.
                </p>
                <p>
                  Our products are carefully selected and properly frozen at ultra-low temperatures right after catch 
                  to maintain natural flavor, texture, and nutritional value.
                </p>
                <p className="hidden sm:block">
                  We serve restaurants, retailers, and individual customers with competitive pricing and consistent supply, 
                  ensuring the best seafood experience in Salem.
                </p>
              </div>

              <div className="mt-6 md:mt-10 flex flex-wrap gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
                  <span className="material-symbols-outlined text-secondary text-sm md:text-base">verified</span>
                  <span className="text-[8px] md:text-sm font-bold uppercase tracking-tight">Quality Assured</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
                  <span className="material-symbols-outlined text-secondary text-sm md:text-base">eco</span>
                  <span className="text-[8px] md:text-sm font-bold uppercase tracking-tight">100% Hygienic</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side: Visuals */}
          <div className="relative mt-0 lg:mt-0">
            <ScrollReveal direction="right" delay={300}>
              <motion.div 
                className="relative z-20 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white/5"
                animate={typeof window !== 'undefined' && window.innerWidth > 768 ? { y: [0, -15, 0] } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="/images/about-seafood.png" 
                  alt="Premium Seafood selection" 
                  className="w-full aspect-[4/5] object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </ScrollReveal>

            {/* Decorative background element scaled down for mobile */}
            <div className="absolute -top-5 -right-5 w-32 h-32 md:w-64 md:h-64 bg-secondary/20 rounded-full blur-[40px] md:blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-5 -left-5 w-32 h-32 md:w-64 md:h-64 bg-primary/20 rounded-full blur-[40px] md:blur-[100px] pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
