import React from 'react';
import ScrollReveal from './ScrollReveal';

const WHATSAPP_NUMBER = "919865668125";

const bulkMessage = [
  `Hi Kamal Sea Food! 👋 I'm interested in a *BULK ORDER* 📦`,
  ``,
  `My Details:`,
  `• Business Name: `,
  `• Location: `,
  `• Products Needed: `,
  `• Quantity Required: `,
  ``,
  `Please share wholesale pricing and availability! 🙏`
].join('\n');

const openWhatsApp = (message) => {
  const encoded = encodeURIComponent(message)
    .replace(/'/g, '%27')
    .replace(/!/g, '%21');
  
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
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
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.408 2.445 1.103 3.407l-1.167 4.272 4.385-1.15c.928.513 1.99.805 3.123.805 3.665 0 6.637-2.972 6.637-6.637 0-3.665-2.972-6.664-6.637-6.664zM12.03 17.543c-1.182 0-2.279-.355-3.197-.97l-.23-.127-2.431.64.651-2.38-.153-.247c-.759-1.217-1.187-2.659-1.187-4.162 0-3.37 2.735-6.105 6.105-6.105 3.37 0 6.105 2.735 6.105 6.105 0 3.37-2.735 6.105-6.105 6.105zm3.177-4.515c-.174-.087-1.03-.508-1.19-.567-.16-.059-.276-.087-.393.087-.117.174-.452.567-.554.684-.102.117-.204.131-.378.044-.174-.087-.735-.271-1.399-.864-.515-.461-.863-1.031-.965-1.205-.102-.174-.011-.268.076-.354.078-.078.174-.204.262-.306.088-.102.117-.174.175-.292.058-.117.029-.219-.014-.306-.044-.087-.393-.948-.539-1.303-.142-.345-.287-.299-.393-.305-.102-.005-.219-.006-.335-.006-.117 0-.306.044-.466.219-.16.174-.612.598-.612 1.459 0 .86.626 1.691.713 1.808.087.117 1.233 1.882 2.986 2.639.417.181.742.289 1.002.371.42.134.802.115 1.103.07.337-.05.103-.418.103-.418z" />
          </svg>
        </button>
      </div>
    </>
  );
}
