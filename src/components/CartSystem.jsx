import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function CartSystem() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalWeight } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderMode, setOrderMode] = useState(null); // 'delivery' or 'takeaway'
  
  // Address Form State
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [phone, setPhone] = useState('');

  // Floating button should only show if there are items
  if (totalItems === 0 && !isDrawerOpen) return null;

  const handleConfirmOrder = () => {
    setIsDrawerOpen(false);
    setShowCheckoutModal(true);
  };

  const sendWhatsAppOrder = () => {
    const WHATSAPP_NUMBER = "919865668125";
    let message = "";

    if (orderMode === 'delivery') {
      message = `Hi Kamal Sea Food! 👋 I'd like to place an order.

🛵 *Delivery Order*

🛒 *My Order:*
${cart.map(item => `• ${item.name} × ${item.quantity} kg`).join('\n')}

📦 *Total Quantity:* ${totalWeight} kg

🚚 *Delivery Details:*
• Address: ${address}
• Area/Landmark: ${landmark}
• Phone: ${phone}

${totalWeight > 1 ? '💚 *Free delivery as order is above 1 kg within Salem!*' : ''}

Please confirm my order. Thank you! 🙏`;
    } else {
      message = `Hi Kamal Sea Food! 👋 I'd like to place a Takeaway order.

🏪 *Takeaway Order*

🛒 *My Order:*
${cart.map(item => `• ${item.name} × ${item.quantity} kg`).join('\n')}

📦 *Total Quantity:* ${totalWeight} kg

I'll pick it up from your shop.
Please confirm and let me know when it's ready! 🙏`;
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 left-6 z-[100]">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="relative w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all group"
        >
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-black min-w-[24px] h-[24px] flex items-center justify-center rounded-full border-2 border-white animate-bounce-subtle">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Drawer (Overlay) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-stretch sm:justify-start">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          
          <div className="relative w-full sm:w-[400px] bg-white h-[90vh] sm:h-full rounded-t-[40px] sm:rounded-none flex flex-col shadow-2xl animate-slide-up sm:animate-slide-right">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-none">Your Cart</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">{totalItems} items selected</p>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-gray-400">close</span>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-2xl p-4 flex gap-4 border border-gray-100 group">
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                    {item.image_url ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" /> : <span className="text-3xl">🐟</span>}
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-blue-500 font-black text-lg">−</button>
                        <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-blue-500 font-black text-lg">+</button>
                      </div>
                      <p className="font-black text-blue-600">₹{item.price_per_kg * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-white border-t border-gray-100 space-y-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Estimated Weight</span>
                  <span className="text-gray-900 font-black">{totalWeight} kg</span>
                </div>
                {totalWeight > 1 ? (
                  <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-xs font-bold border border-green-100 flex items-center gap-2 animate-pulse">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    You qualify for FREE delivery within Salem!
                  </div>
                ) : (
                  <div className="bg-blue-50 text-blue-400 px-4 py-2 rounded-xl text-[10px] font-bold border border-blue-100 flex items-center gap-2 leading-tight">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Order more than 1 kg for FREE delivery within Salem!
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleConfirmOrder}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Confirm Order <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal (Full Popup) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" onClick={() => setShowCheckoutModal(false)}></div>
          
          <div className="relative bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl animate-pop">
            {!orderMode ? (
              <div className="p-10 text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-4">How would you like it?</h2>
                <p className="text-gray-500 mb-10 font-medium">Choose your preferred fulfillment method</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setOrderMode('delivery')}
                    className="flex flex-col items-center gap-4 p-8 rounded-[32px] border-2 border-gray-50 bg-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <span className="text-5xl group-hover:scale-125 transition-transform">🛵</span>
                    <span className="font-black text-gray-900">Delivery</span>
                  </button>
                  <button 
                    onClick={() => setOrderMode('takeaway')}
                    className="flex flex-col items-center gap-4 p-8 rounded-[32px] border-2 border-gray-50 bg-gray-50 hover:border-orange-500 hover:bg-orange-50 transition-all group"
                  >
                    <span className="text-5xl group-hover:scale-125 transition-transform">🏪</span>
                    <span className="font-black text-gray-900">Takeaway</span>
                  </button>
                </div>
              </div>
            ) : orderMode === 'delivery' ? (
              <div className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setOrderMode(null)} className="text-gray-400">
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <h2 className="text-2xl font-black text-gray-900">Delivery Details</h2>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Address</label>
                    <textarea 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, Door No, Building..." 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium h-24 resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Area / Landmark</label>
                    <input 
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      type="text" 
                      placeholder="Near Post Office, etc." 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Phone Number</label>
                    <input 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel" 
                      placeholder="Enter 10 digit mobile" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium font-mono"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 mb-6">
                      <p className="text-[10px] text-blue-600 font-bold flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        Delivery available within Salem area only
                      </p>
                      <p className="text-[10px] text-blue-600 font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">delivery_dining</span>
                        {totalWeight > 1 ? 'FREE delivery applied!' : 'FREE delivery for orders above 1 kg'}
                      </p>
                    </div>
                    
                    <button 
                      disabled={!address || !phone}
                      onClick={sendWhatsAppOrder}
                      className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-lg shadow-lg hover:brightness-110 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3"
                    >
                      Order on WhatsApp <span className="text-xl">💬</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                  <span className="material-symbols-outlined text-4xl">storefront</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">Pick Up Your Order</h2>
                <div className="bg-orange-50 rounded-3xl p-6 text-left mb-10 border border-orange-100">
                  <div className="flex gap-4 mb-4">
                    <span className="material-symbols-outlined text-orange-400">location_on</span>
                    <p className="text-sm font-bold text-gray-700">Kamal Sea Food, Ammapet Main Road, Salem</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-orange-400">schedule</span>
                    <p className="text-sm font-bold text-gray-700">Ready within 30 mins after confirmation</p>
                  </div>
                </div>
                <button 
                  onClick={sendWhatsAppOrder}
                  className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-3"
                >
                  Order on WhatsApp <span className="text-xl">💬</span>
                </button>
                <button onClick={() => setOrderMode(null)} className="mt-6 text-gray-400 font-bold text-xs uppercase tracking-widest">Go Back</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
