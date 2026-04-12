import React from 'react';
import ScrollReveal from './ScrollReveal';

const WHATSAPP_NUMBER = "919865668125";

const bulkMessage = `Hi Kamal Sea Food! 👋 I'm interested in a *BULK ORDER* 📦

My Details:
• Business Name: 
• Location: 
• Products Needed: 
• Quantity Required: 

Please share wholesale pricing and availability!`;

const openWhatsApp = (message) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

export default function WhatsAppOrder() {
  return (
    <>
      <section className="py-20 px-4 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 px-6">
          {/* Bulk Inquiry Section */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[40px] p-8 md:p-14 text-white text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <ScrollReveal>
                <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6">Wholesale & Export</span>
              </ScrollReveal>
              
              <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">Need a Bulk Order?</h2>
              </ScrollReveal>
              
              <ScrollReveal>
                <p className="text-white/80 text-lg mb-12 font-medium max-w-xl mx-auto">
                  Get special wholesale pricing for restaurants, stores, and large events. Minimum order quantities apply.
                </p>
              </ScrollReveal>
              
              <ScrollReveal>
                <button 
                  onClick={() => openWhatsApp(bulkMessage)}
                  className="bg-white text-emerald-600 px-10 py-5 rounded-[24px] text-lg font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                >
                  <span className="text-2xl">📦</span> Contact Bulk & Wholesale
                </button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sticky Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button 
          onClick={() => openWhatsApp("Hi Kamal Sea Food! 👋")}
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all group"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-8 h-8 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.974-.509-5.712-1.472l-6.181 1.69zm6.014-4.222l.432.256c1.616.958 3.473 1.465 5.39 1.465 5.733 0 10.395-4.661 10.395-10.395s-4.662-10.395-10.395-10.395c-5.732 0-10.394 4.661-10.394 10.395 0 2.053.601 4.05 1.737 5.759l.282.424-1.104 4.035 4.145-1.137zm10.305-6.17c-.337-.17-1.991-.983-2.3-1.096-.309-.113-.533-.17-.757.17-.224.339-.869 1.096-1.066 1.321-.197.225-.394.253-.731.084-.337-.17-1.423-.524-2.71-1.672-1.002-.894-1.678-2.001-1.874-2.339-.197-.338-.021-.521.148-.689.152-.151.338-.395.506-.592.169-.197.225-.338.338-.563.112-.225.056-.423-.028-.592-.084-.169-.757-1.826-1.037-2.503-.273-.659-.551-.57-.757-.581-.196-.011-.421-.013-.646-.013s-.59.084-.899.423c-.309.338-1.18 1.18 2.817 0 1.661 1.208 3.267 1.377 3.493.169.225 2.378 3.631 5.761 5.087.805.347 1.433.553 1.922.709.808.257 1.543.221 2.124.135.647-.094 1.991-.815 2.272-1.603.281-.789.281-1.464.197-1.603-.084-.141-.309-.225-.646-.395z" />
          </svg>
        </button>
      </div>
    </>
  );
}
