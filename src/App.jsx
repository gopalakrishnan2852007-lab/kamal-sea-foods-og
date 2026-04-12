import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import EntranceReveal from "./components/EntranceReveal";
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import WhatsAppOrder from './components/WhatsAppOrder';

export default function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <BrowserRouter>
      <Helmet>
        <title>Kamal Sea Food Salem | Fresh Fish Wholesale & Retail</title>
        <meta name="description" content="Kamal Sea Food Salem - fresh fish, prawns, crab wholesale and retail. Bulk seafood supplier in Salem Tamil Nadu." />
        <meta name="keywords" content="frozen seafood, frozen fish supplier, prawn supplier, seafood wholesale, frozen fish retail, seafood supplier, Kamal Sea Food" />
      </Helmet>

      <Routes>
        {/* Landing Page Route with Animation */}
        <Route path="/" element={
          <>
            {!showApp && <EntranceReveal onComplete={() => setShowApp(true)} />}
            <WhatsAppOrder showApp={showApp} />
            <HomePage showApp={showApp} />
          </>
        } />

        {/* Admin Dashboard Route (Faster access without reveal) */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
