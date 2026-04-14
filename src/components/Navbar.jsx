import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all">
      <ScrollReveal className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tight text-primary">Kamal Sea Food</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-sm font-bold uppercase tracking-widest text-[#021B2B]">
          <a href="#about" className="hover:text-secondary transition-colors">About</a>
          <a href="#retail" className="hover:text-secondary transition-colors">Products</a>
          <a href="#trust" className="hover:text-secondary transition-colors">Why Choose Us</a>
          <a href="#contact" className="hover:text-secondary transition-colors">Contact</a>
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
          <div className="px-6 py-6 flex flex-col space-y-6 text-sm font-bold uppercase tracking-widest text-[#021B2B]">
            <a 
              href="#about" 
              onClick={() => setIsOpen(false)}
              className="hover:text-secondary transition-colors"
            >
              About
            </a>
            <a 
              href="#retail" 
              onClick={() => setIsOpen(false)}
              className="hover:text-secondary transition-colors"
            >
              Products
            </a>
            <a 
              href="#trust" 
              onClick={() => setIsOpen(false)}
              className="hover:text-secondary transition-colors"
            >
              Why Choose Us
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="hover:text-secondary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
