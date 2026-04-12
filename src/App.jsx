import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import EntranceReveal from "./components/EntranceReveal";
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CartSystem from './components/CartSystem';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <CartProvider>
      <BrowserRouter>
        <Helmet>
          <title>Kamal Sea Food Salem | Fresh Fish Wholesale & Retail</title>
          <meta name="description" content="Kamal Sea Food Salem - Fresh Fish Wholesale & Retail. Order Vanjaram, Prawns, Crab online. Free delivery above 2kg in Salem. WhatsApp: 9865668125" />
          <meta name="keywords" content="fish shop salem, seafood salem, fresh fish salem, wholesale fish salem, kamal sea food, fish delivery salem" />
        </Helmet>

        {/* Animation Overlay */}
        {showAnimation && (
          <EntranceReveal onComplete={() => {
            setShowAnimation(false);
            setAppReady(true);
          }} />
        )}

        {/* App content rendered behind or after animation */}
        <div style={{ visibility: (appReady || !showAnimation) ? 'visible' : 'hidden' }}>
          <CartSystem />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
