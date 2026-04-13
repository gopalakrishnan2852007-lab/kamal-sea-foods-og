import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100 transition-all">
      <ScrollReveal className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tight text-primary">Kamal Sea Food</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold">
          <a href="#retail" className="text-textsecondary hover:text-primary transition-colors">Products</a>
          <a href="#trust" className="text-textsecondary hover:text-primary transition-colors">Why Choose Us</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-textsecondary hover:text-primary focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </ScrollReveal>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg">
          <div className="px-6 py-4 flex flex-col space-y-4 text-sm font-semibold">
            <a 
              href="#retail" 
              onClick={() => setIsOpen(false)}
              className="text-textsecondary hover:text-primary transition-colors"
            >
              Products
            </a>
            <a 
              href="#trust" 
              onClick={() => setIsOpen(false)}
              className="text-textsecondary hover:text-primary transition-colors"
            >
              Why Choose Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
