import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import TrustSection from '../components/TrustSection';
import ProductGrid from '../components/ProductGrid';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppOrder from '../components/WhatsAppOrder';

export default function HomePage() {
  return (
    <div className="font-sans text-textprimary bg-background min-h-screen relative overflow-x-hidden">
      <div className="relative w-full">
        <h1 className="sr-only">Kamal Sea Food</h1>
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <WhatsAppOrder />
          <ProductGrid />
          <TrustSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
