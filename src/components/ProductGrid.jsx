import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import ScrollReveal from './ScrollReveal';

const WHATSAPP_NUMBER = "919865668125";

// Dynamically generates message from Supabase product data
const getWhatsAppLink = (product, type = "order") => {
  let message = "";

  if (type === "order") {
    message =
`Hi Kamal Sea Food! 👋

I'd like to order the following:

🐟 *Product:* ${product.name}
📦 *Type:* ${product.type || "Ready-to-cook"}
⚖️ *Weight:* ${product.weight || "1 kg"}

Please confirm availability and process my order.
Thank you!`;
  }

  if (type === "bulk") {
    message =
`Hi Kamal Sea Food! 👋 I'm interested in a *BULK ORDER* 📦

🐟 *Product:* ${product.name}
📦 *Type:* ${product.type || "Ready-to-cook"}
⚖️ *Weight:* ${product.weight || "1 kg"}

My Details:
• Business Name: 
• Location: 
• Quantity Required: 

Please share wholesale pricing and availability!`;
  }

  if (type === "inquiry") {
    message =
`Hi Kamal Sea Food! 👋

I have an inquiry about *${product.name}*
📦 Type: ${product.type || "Ready-to-cook"}

Could you share more details and today's availability?
Thank you!`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load catalog. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section id="retail" className="py-24 bg-gray-50 relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">Our Collection</h2>
            <p className="text-gray-500 text-lg font-medium">Finest cuts and whole selections.</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          
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
                    <div>
                      <div className="h-2 bg-gray-200 rounded w-8 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-8 sm:h-10 w-16 sm:w-24 bg-gray-200 rounded-xl"></div>
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
              const isOut = p.stock_status === 'Out of Stock';
              const isLow = p.stock_status === 'Low Stock';
              return (
                <ScrollReveal 
                  key={p.id} 
                  className={`premium-card bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full group ${isOut ? 'opacity-80' : ''}`}
                >
                  <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative">
                    {isOut ? (
                      <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-lg shadow-sm z-10 tracking-widest">Sold Out</span>
                    ) : isLow ? (
                      <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-lg shadow-sm z-10 tracking-widest">Low Stock</span>
                    ) : null}
                    
                    <img 
                      src={p.image_url} 
                      alt={p.name} 
                      loading="lazy" 
                      className={`w-full h-full object-cover transition-transform duration-500 ${isOut ? 'grayscale opacity-70' : 'group-hover:scale-110'}`} 
                    />
                  </div>
                  <div className="p-3 sm:p-6 flex flex-col flex-grow">
                    <h3 className={`text-[15px] sm:text-xl font-extrabold text-gray-900 mb-0.5 sm:mb-1 leading-tight ${isOut ? 'text-gray-500' : ''}`}>
                      {p.name}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-gray-500 mb-3 sm:mb-8 font-medium flex-grow line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex items-center sm:items-end justify-between border-t border-gray-100 pt-3 sm:pt-5 mt-auto gap-0 sm:gap-1">
                      <div>
                        <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1.5">Price</p>
                        <p className={`text-[13px] sm:text-2xl font-black text-gray-900 leading-none ${isOut ? 'text-gray-400' : ''}`}>
                          ₹{p.price_per_kg}<span className="text-[9px] sm:text-sm text-gray-400 font-semibold tracking-normal ml-0.5 sm:ml-1">/kg</span>
                        </p>
                      </div>
                      
                      {isOut ? (
                        <button disabled className="bg-gray-100 text-gray-400 px-3 py-2 sm:px-5 sm:py-3 rounded-xl text-[10px] sm:text-sm font-bold flex items-center gap-1 sm:gap-2 cursor-not-allowed">
                          Sold Out
                        </button>
                      ) : (
                        <button 
                          onClick={() => window.open(getWhatsAppLink(p, "order"), "_blank")}
                          className="bg-[#25D366] text-white px-3 py-2 sm:px-5 sm:py-3 rounded-xl text-[10px] sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 hover:-translate-y-0.5 transition-transform shadow-sm hover:shadow-md"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.974-.509-5.712-1.472l-6.181 1.69zm6.014-4.222l.432.256c1.616.958 3.473 1.465 5.39 1.465 5.733 0 10.395-4.661 10.395-10.395s-4.662-10.395-10.395-10.395c-5.732 0-10.394 4.661-10.394 10.395 0 2.053.601 4.05 1.737 5.759l.282.424-1.104 4.035 4.145-1.137zm10.305-6.17c-.337-.17-1.991-.983-2.3-1.096-.309-.113-.533-.17-.757.17-.224.339-.869 1.096-1.066 1.321-.197.225-.394.253-.731.084-.337-.17-1.423-.524-2.71-1.672-1.002-.894-1.678-2.001-1.874-2.339-.197-.338-.021-.521.148-.689.152-.151.338-.395.506-.592.169-.197.225-.338.338-.563.112-.225.056-.423-.028-.592-.084-.169-.757-1.826-1.037-2.503-.273-.659-.551-.57-.757-.581-.196-.011-.421-.013-.646-.013s-.59.084-.899.423c-.309.338-1.18 1.18 2.817 0 1.661 1.208 3.267 1.377 3.493.169.225 2.378 3.631 5.761 5.087.805.347 1.433.553 1.922.709.808.257 1.543.221 2.124.135.647-.094 1.991-.815 2.272-1.603.281-.789.281-1.464.197-1.603-.084-.141-.309-.225-.646-.395z"></path></svg>
                          <span className="hidden sm:inline">Order</span><span className="inline sm:hidden">Buy</span>
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
