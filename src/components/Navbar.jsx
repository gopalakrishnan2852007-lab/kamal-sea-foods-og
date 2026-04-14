import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar shadow-sm transition-all">
      <div className="logo-h1">Kamal Sea Food</div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-10 text-sm font-bold uppercase tracking-widest text-[#1f3b4d]">
        <a href="#about" className="hover:text-secondary transition-colors">About</a>
        <a href="#retail" className="hover:text-secondary transition-colors">Products</a>
        <a href="#trust" className="hover:text-secondary transition-colors">Why Choose Us</a>
        <a href="#contact" className="hover:text-secondary transition-colors">Contact</a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#1f3b4d] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined menu-icon">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#e9eff3]/95 backdrop-blur-md border-b border-gray-100 absolute w-full shadow-lg">
          <div className="px-6 py-6 flex flex-col space-y-6 text-sm font-bold uppercase tracking-widest text-[#1f3b4d]">
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
