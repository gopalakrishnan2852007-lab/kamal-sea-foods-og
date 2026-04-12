import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import EntranceReveal from "./components/EntranceReveal";

export default function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      <Helmet>
        <title>Kamal Sea Food Salem | Fresh Fish Wholesale & Retail</title>
        <meta name="description" content="Kamal Sea Food Salem - fresh fish, prawns, crab wholesale and retail. Bulk seafood supplier in Salem Tamil Nadu." />
        <meta name="keywords" content="frozen seafood, frozen fish supplier, prawn supplier, seafood wholesale, frozen fish retail, seafood supplier, Kamal Sea Food" />
      </Helmet>

      {!showApp && <EntranceReveal onComplete={() => setShowApp(true)} />}
      
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
        <WhatsAppFAB />
      </div>
    </>
  );
}
