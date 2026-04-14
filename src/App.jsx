import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import EntranceReveal from "./components/EntranceReveal";
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CartSystem from './components/CartSystem';

export default function App() {
  const [animDone, setAnimDone] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <Helmet>
          <title>Kamal Sea Food | Premium Frozen Seafood Supplier in Salem</title>
          <meta name="description" content="Kamal Sea Food in Salem supplies premium frozen fish, prawns, crab, and seafood for wholesale and retail. Call 9865668125." />
          <meta name="keywords" content="fish shop salem, seafood salem, frozen fish salem, wholesale fish salem, kamal sea food, fish delivery salem" />
          <meta property="og:title" content="Kamal Sea Food Salem" />
          <meta property="og:description" content="Premium Frozen Fish Wholesale & Retail — Salem" />
          <meta property="og:url" content="https://kamal-sea-food.vercel.app" />
        </Helmet>

        {/* Main app always renders — never blocked for LCP */}
        <main 
          style={{ 
            opacity: animDone ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            visibility: animDone ? 'visible' : 'hidden'
          }}
        >
          <CartSystem />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        {/* Animation is overlay — doesn't block content loading */}
        {!animDone && (
          <div className="fixed inset-0 z-[9999]">
            <EntranceReveal onComplete={() => setAnimDone(true)} />
          </div>
        )}
      </BrowserRouter>
    </CartProvider>
  );
}
