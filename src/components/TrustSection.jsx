import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function TrustSection() {
  const cards = [
    {
      icon: 'ac_unit',
      title: 'Frozen at source to lock freshness',
      description: 'Instantly processed at ultra-low temperatures right after catch to maintain peak flavor and nutritional quality.'
    },
    {
      icon: 'severe_cold',
      title: 'Stored and maintained at -18°C cold chain',
      description: 'Maintained flawless cold storage quality from the processing facility all the way to your door.'
    },
    {
      icon: 'inventory_2',
      title: 'Available in 1kg packs only',
      description: 'Standardized 1kg premium packaging for perfectly portioned home cooking and seamless retail consistency.'
    },
    {
      icon: 'local_shipping',
      title: 'Bulk orders available in multiple 1kg packs',
      description: 'Efficient wholesale supply fulfilled by easily manageable multiple 1kg boxes for scaling demands.'
    },
    {
      icon: 'storefront',
      title: 'Supply for hotels, restaurants and resellers',
      description: 'Dedicated and reliable B2B supply chains built for restaurant kitchens, leading chefs, and verified resellers.'
    },
    {
      icon: 'skillet',
      title: 'Ready-to-cook options available',
      description: 'Pre-cleaned, correctly prepped, and ready to go instantly straight from your freezer to your pan.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* About Kamal Sea Food — SEO description block */}
        <ScrollReveal className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl px-8 py-10 text-center max-w-3xl mx-auto shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3">About Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Kamal Sea Food, Salem</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
              Kamal Sea Food is a Salem-based seafood supplier providing frozen seafood for retail and bulk orders.
              We specialize in fish, prawns, crab, and ready-to-cook seafood items with quality assurance and fast delivery.
              Contact us for wholesale and retail enquiries.
            </p>
          </div>
        </ScrollReveal>

        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Why Choose Kamal Sea Food</h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">We prioritize quality, hygiene, and convenience to bring you the best seafood experience.</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {cards.map((card, idx) => (
            <ScrollReveal 
              key={idx} 
              delay={idx * 100} 
              className="premium-card p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col"
            >
              <ScrollReveal delay={idx * 100 + 100}>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={idx * 100 + 200}>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{card.title}</h3>
              </ScrollReveal>
              
              <ScrollReveal delay={idx * 100 + 300}>
                <p className="text-gray-600 text-sm font-medium">{card.description}</p>
              </ScrollReveal>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
