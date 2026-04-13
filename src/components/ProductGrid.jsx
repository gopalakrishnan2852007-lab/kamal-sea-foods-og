import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import ScrollReveal from './ScrollReveal';
import { useCart } from '../context/CartContext';
import { SYMBOLS, getWhatsAppLink } from '../utils/whatsappUtils';

// Dynamically generates message from Supabase product data
const getLocalizedWhatsAppLink = (product, type = "order") => {
  let message = [];

  if (type === "order") {
    message = [
      `Hi Kamal Sea Food! ${SYMBOLS.WAVE}`,
      ``,
      `I'd like to order the following:`,
      ``,
      `${SYMBOLS.FISH} *Product:* ${product.name}`,
      `${SYMBOLS.PACKAGE} *Type:* ${product.type || "Ready-to-cook"}`,
      `${SYMBOLS.SCALE} *Weight:* ${product.weight || "1 kg"}`,
      ``,
      `Please confirm availability and process my order.`,
      `Thank you! ${SYMBOLS.PRAY}`
    ];
  }

  if (type === "bulk") {
    message = [
      `Hi Kamal Sea Food! ${SYMBOLS.WAVE} I'm interested in a *BULK ORDER* ${SYMBOLS.PACKAGE}`,
      ``,
      `${SYMBOLS.FISH} *Product:* ${product.name}`,
      `${SYMBOLS.PACKAGE} *Type:* ${product.type || "Ready-to-cook"}`,
      `${SYMBOLS.SCALE} *Weight:* ${product.weight || "1 kg"}`,
      ``,
      `My Details:`,
      `${SYMBOLS.BULLET} Business Name: `,
      `${SYMBOLS.BULLET} Location: `,
      `${SYMBOLS.BULLET} Quantity Required: `,
      ``,
      `Please share wholesale pricing and availability! ${SYMBOLS.PRAY}`
    ];
  }

  if (type === "inquiry") {
    message = [
      `Hi Kamal Sea Food! ${SYMBOLS.WAVE}`,
      ``,
      `I have an inquiry about *${product.name}*`,
      `${SYMBOLS.PACKAGE} Type: ${product.type || "Ready-to-cook"}`,
      ``,
      `Could you share more details and today's availability?`,
      `Thank you! ${SYMBOLS.PRAY}`
    ];
  }

  const messageText = message.join('\n');
  return getWhatsAppLink(messageText);
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
    let subscription;
    try {
      subscription = supabase
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
    } catch (err) {
      console.warn('Realtime updates unavailable:', err);
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
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
    <section id="retail" className="py-24 bg-altbg relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-textprimary tracking-tight mb-2">Our Collection</h2>
            <p className="text-textsecondary text-lg font-medium">Finest cuts and whole selections.</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          
          {loading ? (
            // Skeleton Loading State
            Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full shadow-sm">
                <div className="aspect-[4/3] w-full relative shimmer-wrapper"></div>
                <div className="p-3 sm:p-6 flex flex-col flex-grow bg-white">
                  <div className="h-4 shimmer-wrapper rounded w-3/4 mb-4"></div>
                  <div className="h-3 shimmer-wrapper rounded w-full mb-2"></div>
                  <div className="h-3 shimmer-wrapper rounded w-5/6 mb-6"></div>
                  <div className="flex justify-between items-end border-t border-gray-100 pt-3 sm:pt-5 mt-auto">
                    <div className="h-8 sm:h-10 w-full shimmer-wrapper rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-500 py-12 font-bold">{error}</div>
          ) : products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-12 font-medium">No products available at the moment.</p>
          ) : (
            products.map((p, idx) => {
              const stock = p.stock || 0;
              const isOut = stock === 0;
              const isLow = stock > 0 && stock <= 5;
              const currentQty = localQuantities[p.id] || 1;

              return (
                <ScrollReveal 
                  key={p.id} 
                  className={`premium-card bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full group hover:border-gray-300 ${isOut ? 'opacity-80' : ''}`}
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    {isOut ? (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm z-10 tracking-widest">Out of Stock</span>
                    ) : isLow ? (
                      <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm z-10 tracking-widest animate-pulse">Low Stock: {stock}kg</span>
                    ) : (
                      <span className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm z-10 tracking-widest text-opacity-90">In Stock: {stock}kg</span>
                    )}
                    
                    <img 
                      src={p.image_url} 
                      alt={p.name} 
                      loading={idx === 0 ? "eager" : "lazy"}
                      fetchpriority={idx === 0 ? "high" : "auto"}
                      decoding="async"
                      width="300"
                      height="300"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      className={`transition-transform duration-700 ${isOut ? 'grayscale opacity-70' : 'group-hover:scale-125'}`} 
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <ScrollReveal delay={150}>
                      <h3 className={`text-base font-bold text-textprimary mb-1 leading-tight ${isOut ? 'text-gray-400' : ''}`}>
                        {p.name}
                      </h3>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={300}>
                      <p className="text-xs text-textsecondary mb-4 sm:mb-5 font-medium flex-grow line-clamp-2">
                        {p.description}
                      </p>
                    </ScrollReveal>
                    <div className="space-y-4 mt-auto border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-semibold text-textsecondary uppercase tracking-widest leading-none mb-1">Price</p>
                          <p className={`text-lg font-bold text-textprimary leading-none ${isOut ? 'text-gray-400' : ''}`}>
                            ₹{p.price_per_kg}<span className="text-xs text-textsecondary font-medium ml-1">/kg</span>
                          </p>
                        </div>
                        
                        {!isOut && (
                          <div className="flex items-center gap-2 bg-gray-50 p-1 border border-gray-200 rounded-md">
                            <button 
                              onClick={() => updateLocalQty(p.id, -1, stock)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-secondary font-bold hover:bg-gray-100 transition-colors"
                            >
                              −
                            </button>
                            <span className="text-sm font-semibold w-4 text-center text-textprimary">{currentQty}</span>
                            <button 
                              onClick={() => updateLocalQty(p.id, 1, stock)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-secondary font-bold hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>

                      {isOut ? (
                        <button disabled className="w-full bg-gray-100 text-gray-400 py-3 rounded-lg text-sm font-bold cursor-not-allowed">
                          Currently unavailable
                        </button>
                      ) : (
                        <button 
                          onClick={() => addToCart(p, currentQty)}
                          className="w-full bg-primary text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#082a42] active:scale-[0.98] transition-colors shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
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
