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
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=2000&auto=format&fit=crop')" }}
    >
      {/* Light subtle overlay to keep text readable but let the gorgeous ocean shine through */}
      <div className="fixed inset-0 z-[0] bg-white/30 backdrop-blur-[2px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full overflow-hidden">
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
