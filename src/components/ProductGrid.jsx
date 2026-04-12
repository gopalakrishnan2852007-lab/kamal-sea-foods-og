import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import ScrollReveal from './ScrollReveal';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = "919865668125";

// Dynamically generates message from Supabase product data
const getWhatsAppLink = (product, type = "order") => {
  let message = [];

  if (type === "order") {
    message = [
      `Hi Kamal Sea Food! 👋`,
      ``,
      `I'd like to order the following:`,
      ``,
      `🐟 *Product:* ${product.name}`,
      `📦 *Type:* ${product.type || "Ready-to-cook"}`,
      `⚖️ *Weight:* ${product.weight || "1 kg"}`,
      ``,
      `Please confirm availability and process my order.`,
      `Thank you! 🙏`
    ];
  }

  if (type === "bulk") {
    message = [
      `Hi Kamal Sea Food! 👋 I'm interested in a *BULK ORDER* 📦`,
      ``,
      `🐟 *Product:* ${product.name}`,
      `📦 *Type:* ${product.type || "Ready-to-cook"}`,
      `⚖️ *Weight:* ${product.weight || "1 kg"}`,
      ``,
      `My Details:`,
      `• Business Name: `,
      `• Location: `,
      `• Quantity Required: `,
      ``,
      `Please share wholesale pricing and availability! 🙏`
    ];
  }

  if (type === "inquiry") {
    message = [
      `Hi Kamal Sea Food! 👋`,
      ``,
      `I have an inquiry about *${product.name}*`,
      `📦 Type: ${product.type || "Ready-to-cook"}`,
      ``,
      `Could you share more details and today's availability?`,
      `Thank you! 🙏`
    ];
  }

  const messageText = message.join('\n');
  const encoded = encodeURIComponent(messageText)
    .replace(/'/g, '%27')
    .replace(/!/g, '%21');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export default function ProductGrid() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Local state to track quantities before adding to cart
  const [localQuantities, setLocalQuantities] = useState({});

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
        
        // Initialize local quantities
        const initialQtys = {};
        (data || []).forEach(p => initialQtys[p.id] = 1);
        setLocalQuantities(initialQtys);
      } catch (err) {
        console.error(err);
        setError('Failed to load catalog. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

    // Subscribe to real-time stock updates
    const subscription = supabase
      .channel('products')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'products' }, 
        (payload) => {
          setProducts(prev => 
            prev.map(p => 
              p.id === payload.new.id ? { ...p, stock: payload.new.stock } : p
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const updateLocalQty = (id, delta, maxStock) => {
    setLocalQuantities(prev => {
      const current = prev[id] || 1;
      const next = current + delta;
      
      if (next < 1) return prev;
      if (next > maxStock) {
        alert(`Only ${maxStock} kg available in stock!`);
        return { ...prev, [id]: maxStock };
      }
      
      return { ...prev, [id]: next };
    });
  };

  return (
    <section id="retail" className="py-24 bg-gray-50 relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">Our Collection</h2>
            <p className="text-gray-500 text-lg font-medium">Finest cuts and whole selections.</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          
          {loading ? (
            // Skeleton Loading State
            Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse shadow-sm">
                <div className="aspect-[4/3] bg-gray-200 w-full relative"></div>
                <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 mb-6"></div>
                  <div className="flex justify-between items-end border-t border-gray-100 pt-3 sm:pt-5 mt-auto">
                    <div className="h-8 sm:h-10 w-full bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-500 py-12 font-bold">{error}</div>
          ) : products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-12 font-medium">No products available at the moment.</p>
          ) : (
            products.map((p) => {
              const stock = p.stock || 0;
              const isOut = stock === 0;
              const isLow = stock > 0 && stock <= 5;
              const currentQty = localQuantities[p.id] || 1;

              return (
                <ScrollReveal 
                  key={p.id} 
                  className={`premium-card bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full group ${isOut ? 'opacity-80' : ''}`}
                >
                  <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative">
                    {isOut ? (
                      <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-lg shadow-sm z-10 tracking-widest">Out of Stock</span>
                    ) : isLow ? (
                      <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-lg shadow-sm z-10 tracking-widest animate-pulse">Low Stock: {stock}kg left!</span>
                    ) : (
                      <span className="absolute top-4 left-4 bg-green-500 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-lg shadow-sm z-10 tracking-widest text-opacity-90">In Stock: {stock}kg</span>
                    )}
                    
                    <img 
                      src={p.image_url} 
                      alt={p.name} 
                      loading="lazy" 
                      decoding="async"
                      width="400"
                      height="300"
                      className={`w-full h-full object-cover transition-transform duration-700 ${isOut ? 'grayscale opacity-70' : 'group-hover:scale-125'}`} 
                    />
                  </div>
                  <div className="p-3 sm:p-6 flex flex-col flex-grow">
                    <ScrollReveal delay={150}>
                      <h3 className={`text-[15px] sm:text-lg font-extrabold text-gray-900 mb-0.5 sm:mb-1 leading-tight ${isOut ? 'text-gray-500' : ''}`}>
                        {p.name}
                      </h3>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={300}>
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6 font-medium flex-grow line-clamp-2">
                        {p.description}
                      </p>
                    </ScrollReveal>
                    <div className="space-y-4 mt-auto border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Price</p>
                          <p className={`text-[13px] sm:text-xl font-black text-gray-900 leading-none ${isOut ? 'text-gray-400' : ''}`}>
                            ₹{p.price_per_kg}<span className="text-[9px] sm:text-xs text-gray-400 font-semibold tracking-normal ml-0.5 sm:ml-1">/kg</span>
                          </p>
                        </div>
                        
                        {!isOut && (
                          <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 p-1.5 sm:p-2 rounded-xl border border-gray-200">
                            <button 
                              onClick={() => updateLocalQty(p.id, -1, stock)}
                              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-blue-600 font-black hover:bg-blue-50 transition-colors"
                            >
                              −
                            </button>
                            <span className="text-xs sm:text-sm font-black w-3 sm:w-4 text-center">{currentQty}</span>
                            <button 
                              onClick={() => updateLocalQty(p.id, 1, stock)}
                              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-blue-600 font-black hover:bg-blue-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>

                      {isOut ? (
                        <button disabled className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl text-xs font-bold cursor-not-allowed">
                          Currently unavailable
                        </button>
                      ) : (
                        <button 
                          onClick={() => addToCart(p, currentQty)}
                          className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-100"
                        >
                          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
