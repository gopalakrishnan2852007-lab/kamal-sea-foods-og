import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import WhatsAppOrder from '../components/WhatsAppOrder';

export default function HomePage() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
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
  );
}
