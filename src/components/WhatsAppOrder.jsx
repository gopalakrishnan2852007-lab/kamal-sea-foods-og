import React from 'react';
import ScrollReveal from './ScrollReveal';

import { SYMBOLS, openWhatsApp } from '../utils/whatsappUtils';

const bulkMessage = [
  `Hi Kamal Sea Food! ${SYMBOLS.WAVE} I'm interested in a *BULK ORDER* ${SYMBOLS.PACKAGE}`,
  ``,
  `My Details:`,
  `${SYMBOLS.BULLET} Business Name: `,
  `${SYMBOLS.BULLET} Location: `,
  `${SYMBOLS.BULLET} Products Needed: `,
  `${SYMBOLS.BULLET} Quantity Required: `,
  ``,
  `Please share wholesale pricing and availability! ${SYMBOLS.PRAY}`
].join('\n');

export default function WhatsAppOrder() {
  return (
    <>
      <section className="py-20 px-4 bg-slate-50/70 backdrop-blur-md relative overflow-hidden">
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

      {/* Professional Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-[200] flex items-center group">
        {/* Tooltip Label */}
        <span className="mr-4 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-xl pointer-events-none">
          Chat with us! 💬
        </span>

        <button 
          onClick={() => openWhatsApp(`Hi Kamal Sea Food! ${SYMBOLS.WAVE}`)}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Contact on WhatsApp"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40"></span>
          
          <svg className="w-9 h-9 relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72 1.039 3.655 1.587 5.713 1.587h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
