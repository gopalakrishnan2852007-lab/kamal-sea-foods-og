import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import WhatsAppOrder from '../components/WhatsAppOrder';

export default function HomePage() {
  return (
    <div 
      className="font-sans text-gray-900 bg-fixed bg-cover bg-center min-h-screen relative overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=2000&auto=format&fit=crop')" }}
    >
      <div className="fixed inset-0 z-[0] bg-gray-900/90 mix-blend-multiply pointer-events-none"></div>
      
      <div className="relative z-10">
        <h1 className="sr-only">Kamal Sea Food</h1>
        <Navbar />
        <main>
        <Hero />
        <WhatsAppOrder />
        <ProductGrid />
        <TrustSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
