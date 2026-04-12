import React from 'react';

const WHATSAPP_NUMBER = "919865668125";

const products = [
  {
    id: 1,
    name: "Crab Lollipop",
    type: "Ready-to-cook",
    weight: "1 kg",
    emoji: "🦀",
    message: "Hi Kamal Sea Food! 👋 I'm interested in ordering *Crab Lollipop* (Ready-to-cook, 1 kg). Could you please share today's availability and confirm my order? Thank you!"
  },
  {
    id: 2,
    name: "Vanjaram",
    type: "Frozen ready-to-cook",
    weight: "1 kg",
    emoji: "🐟",
    message: "Hi Kamal Sea Food! 👋 I'd like to order *Vanjaram* (Frozen ready-to-cook, 1 kg). Please confirm availability and process my order. Thank you!"
  },
  {
    id: 3,
    name: "Nethli",
    type: "Frozen ready-to-cook",
    weight: "1 kg",
    emoji: "🐠",
    message: "Hi Kamal Sea Food! 👋 I want to order *Nethli* (Frozen ready-to-cook, 1 kg). Please check availability and confirm my order. Thank you!"
  },
  {
    id: 4,
    name: "Basha",
    type: "Frozen ready-to-cook",
    weight: "1 kg",
    emoji: "🐡",
    message: "Hi Kamal Sea Food! 👋 I'm interested in ordering *Basha Fish* (Frozen ready-to-cook, 1 kg). Please confirm stock and process my order. Thank you!"
  },
  {
    id: 5,
    name: "I Cube Prawn",
    type: "Frozen ready-to-cook",
    weight: "1 kg",
    emoji: "🦐",
    message: "Hi Kamal Sea Food! 👋 I'd like to order *I Cube Prawn* (Frozen ready-to-cook, 1 kg). Kindly confirm availability and process my order. Thank you!"
  },
  {
    id: 6,
    name: "Small Prawn",
    type: "Frozen ready-to-cook",
    weight: "1 kg",
    emoji: "🦐",
    message: "Hi Kamal Sea Food! 👋 I want to order *Small Prawn* (Frozen ready-to-cook, 1 kg). Please check stock and confirm my order. Thank you!"
  },
  {
    id: 7,
    name: "Medium Prawn",
    type: "Frozen ready-to-cook",
    weight: "1 kg",
    emoji: "🦐",
    message: "Hi Kamal Sea Food! 👋 I'd like to place an order for *Medium Prawn* (Frozen ready-to-cook, 1 kg). Please confirm availability. Thank you!"
  },
  {
    id: 8,
    name: "Boneless Fish",
    type: "Frozen ready-to-cook",
    weight: "1 kg",
    emoji: "🐟",
    message: "Hi Kamal Sea Food! 👋 I'm interested in *Boneless Fish* (Frozen ready-to-cook, 1 kg). Please confirm stock and process my order. Thank you!"
  },
  {
    id: 9,
    name: "Mathi",
    type: "Frozen ready-to-cook",
    weight: "1 kg",
    emoji: "🐠",
    message: "Hi Kamal Sea Food! 👋 I want to order *Mathi* (Frozen ready-to-cook, 1 kg). Please check availability and confirm. Thank you!"
  },
  {
    id: 10,
    name: "Fish Finger",
    type: "Ready-to-cook",
    weight: "1 kg",
    emoji: "🍤",
    message: "Hi Kamal Sea Food! 👋 I'd like to order *Fish Finger* (Ready-to-cook, 1 kg). Please confirm stock and process my order. Thank you!"
  }
];

const openWhatsApp = (message) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

export default function WhatsAppOrder({ showApp }) {
  if (!showApp) return null;

  return (
    <section className="py-20 px-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-20 -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-4 block">Quick Ordering</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Order via WhatsApp</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Freshness is just a message away. Select your favorites and order directly from our processing unit.
          </p>
        </div>

        {/* Utility Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button 
            onClick={() => openWhatsApp("Hi Kamal Sea Food! 👋\nCould you please send today's *fresh fish price list*? 📋\nThank you!")}
            className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm group"
          >
            <span className="text-xl group-hover:scale-125 transition-transform">📋</span> Daily Price Check
          </button>
          <button 
            onClick={() => openWhatsApp("Hi Kamal Sea Food! 👋 I'd like to place a *Home Delivery Order* 🛵\n\nMy Details:\n• Name: \n• Address: \n• Area/Pincode: \n• Products Needed: \n• Preferred Delivery Time: \n\nPlease confirm delivery availability to my area. Thank you!")}
            className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm group"
          >
            <span className="text-xl group-hover:scale-125 transition-transform">🛵</span> Home Delivery Inquiry
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20 px-2 sm:px-0">
          {products.map((p) => (
            <div 
              key={p.id}
              className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500 hover:shadow-xl"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl mb-5 group-hover:rotate-12 transition-transform duration-500">
                {p.emoji}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">{p.name}</h3>
              <div className="flex flex-col gap-2 mb-6">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {p.type}
                </span>
                <span className="text-slate-400 text-xs font-bold">{p.weight}</span>
              </div>
              <button 
                onClick={() => openWhatsApp(p.message)}
                className="w-full mt-auto bg-slate-900 text-white py-3 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Order on <span className="text-sm">💬</span>
              </button>
            </div>
          ))}
        </div>

        {/* Bulk Inquiry Section */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[40px] p-8 md:p-14 text-white text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6">Wholesale & Export</span>
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">Need a Bulk Order?</h2>
            <p className="text-white/80 text-lg mb-12 font-medium max-w-xl mx-auto">
              Get special wholesale pricing for restaurants, stores, and large events. Minimum order quantities apply.
            </p>
            <button 
              onClick={() => openWhatsApp("Hi Kamal Sea Food! 👋 I'm interested in a *BULK ORDER* 📦\n\nPlease share your wholesale details:\n• Minimum order quantity\n• Bulk pricing & discounts\n• Delivery options & charges\n\nMy Details:\n• Business Name: \n• Location: \n• Products Needed: \n• Quantity Required: \n\nLooking forward to your response!")}
              className="bg-white text-emerald-600 px-10 py-5 rounded-[24px] text-lg font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <span className="text-2xl">📦</span> Contact Bulk & Wholesale
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sticky Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button 
          onClick={() => openWhatsApp("Hi Kamal Sea Food! 👋")}
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all group"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-8 h-8 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.974-.509-5.712-1.472l-6.181 1.69zm6.014-4.222l.432.256c1.616.958 3.473 1.465 5.39 1.465 5.733 0 10.395-4.661 10.395-10.395s-4.662-10.395-10.395-10.395c-5.732 0-10.394 4.661-10.394 10.395 0 2.053.601 4.05 1.737 5.759l.282.424-1.104 4.035 4.145-1.137zm10.305-6.17c-.337-.17-1.991-.983-2.3-1.096-.309-.113-.533-.17-.757.17-.224.339-.869 1.096-1.066 1.321-.197.225-.394.253-.731.084-.337-.17-1.423-.524-2.71-1.672-1.002-.894-1.678-2.001-1.874-2.339-.197-.338-.021-.521.148-.689.152-.151.338-.395.506-.592.169-.197.225-.338.338-.563.112-.225.056-.423-.028-.592-.084-.169-.757-1.826-1.037-2.503-.273-.659-.551-.57-.757-.581-.196-.011-.421-.013-.646-.013s-.59.084-.899.423c-.309.338-1.18 1.155-1.18 2.817 0 1.661 1.208 3.267 1.377 3.493.169.225 2.378 3.631 5.761 5.087.805.347 1.433.553 1.922.709.808.257 1.543.221 2.124.135.647-.094 1.991-.815 2.272-1.603.281-.789.281-1.464.197-1.603-.084-.141-.309-.225-.646-.395z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
