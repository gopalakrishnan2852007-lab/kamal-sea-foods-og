import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';

export default function App() {
  return (
    <>
      <Helmet>
        <title>Kamal Sea Food Salem | Fresh Fish Wholesale & Retail</title>
        <meta name="description" content="Kamal Sea Food Salem - fresh fish, prawns, crab wholesale and retail. Bulk seafood supplier in Salem Tamil Nadu." />
        <meta name="keywords" content="frozen seafood, frozen fish supplier, prawn supplier, seafood wholesale, frozen fish retail, seafood supplier, Kamal Sea Food" />
      </Helmet>
      
      <div className="font-sans text-gray-900 bg-white">
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
