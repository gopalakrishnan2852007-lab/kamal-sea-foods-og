import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function HomePage({ showApp }) {
  return (
    <div 
      className="font-sans text-gray-900 bg-white min-h-screen"
      style={{
        opacity: showApp ? 1 : 0,
        transition: "opacity 0.8s ease",
        visibility: showApp ? "visible" : "hidden"
      }}
    >
      <h1 className="sr-only">Kamal Sea Food</h1>
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
