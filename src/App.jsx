import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
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
          <title>Kamal Sea Food Salem | Fresh Fish Wholesale & Retail</title>
          <meta name="description" content="Kamal Sea Food Salem - Fresh Fish Wholesale & Retail. Order Vanjaram, Prawns, Crab online. Free delivery above 2kg in Salem. WhatsApp: 9865668125" />
          <meta name="keywords" content="fish shop salem, seafood salem, fresh fish salem, wholesale fish salem, kamal sea food, fish delivery salem" />
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
