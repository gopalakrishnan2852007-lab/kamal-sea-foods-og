import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-gray-900 border-t border-gray-800">
      <ScrollReveal className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="lg:col-span-1">
          <div className="text-2xl font-black text-white tracking-tight mb-2">Kamal Sea Food</div>
          <p className="text-blue-400 font-bold text-sm tracking-wide mb-6">Frozen Seafood Retail & Wholesale</p>

          {/* Structured Business Info */}
          <div className="text-gray-400 text-xs leading-relaxed space-y-1 mb-6 border-l-2 border-gray-700 pl-3 py-1">
            <p><strong className="text-gray-300">Kamal Sea Food</strong></p>
            <p>Salem, Tamil Nadu</p>
            <p>Phone: +91 9865668125</p>
            <p>Wholesale & Retail Seafood Supplier</p>
          </div>

          <div className="text-gray-600 text-[10px] uppercase font-bold tracking-widest flex flex-col gap-1.5 mt-2">
            <span>Kamal Sea Food frozen seafood supplier</span>
            <span>Kamal Sea Food retail and wholesale</span>
            <span>Order from Kamal Sea Food</span>
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold mb-4 text-base tracking-wide">Kamal Sea Food Retail</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Direct-to-consumer frozen fish retail with
            rigorous quality checks guaranteeing premium frozen quality and nutrition. Order from Kamal Sea Food
            easily today.
          </p>
        </div>

        <div>
           <h2 className="text-white font-bold mb-4 text-base tracking-wide">Kamal Sea Food Wholesale</h2>
           <p className="text-gray-400 text-sm leading-relaxed mb-4">
             High-volume seafood wholesale provision. We are
             the premier Kamal Sea Food frozen seafood supplier designed specifically for leading commercial
             kitchens and hotels.
           </p>
        </div>

        <div>
          <h2 className="text-white font-bold mb-4 text-base tracking-wide">Ready to Cook</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Hygienically prepped selections built to securely
            save preparation time. Explore the absolute best Kamal Sea Food retail and wholesale prepared items
            available.
          </p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-800">
        <h2 className="text-gray-500 text-sm font-medium">© 2026 Kamal Sea Food – Frozen Seafood Retail & Wholesale. All
          rights reserved.</h2>
        <p className="text-gray-600 text-xs">Kamal Sea Food</p>
      </ScrollReveal>
    </footer>
  );
}
