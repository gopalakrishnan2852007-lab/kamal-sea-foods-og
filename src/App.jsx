import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import EntranceReveal from "./components/EntranceReveal";
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CartSystem from './components/CartSystem';

export default function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <Helmet>
          <title>Kamal Sea Food Salem | Fresh Fish Wholesale & Retail</title>
          <meta name="description" content="Kamal Sea Food Salem - fresh fish, prawns, crab wholesale and retail. Bulk seafood supplier in Salem Tamil Nadu." />
          <meta name="keywords" content="frozen seafood, frozen fish supplier, prawn supplier, seafood wholesale, frozen fish retail, seafood supplier, Kamal Sea Food" />
        </Helmet>

        <CartSystem />

        <Routes>
          {/* Landing Page Route with Animation */}
          <Route path="/" element={
            <>
              {!showApp && <EntranceReveal onComplete={() => setShowApp(true)} />}
              <HomePage showApp={showApp} />
            </>
          } />

          {/* Admin Dashboard Route (Faster access without reveal) */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
