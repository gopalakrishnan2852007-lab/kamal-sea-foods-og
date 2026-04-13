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
    <section id="about" className="py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* About Kamal Sea Food — SEO description block */}
        <ScrollReveal className="mb-16">
          <div className="bg-altbg border border-gray-100 rounded-2xl px-8 py-10 text-center max-w-3xl mx-auto shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-textprimary tracking-tight mb-4">Kamal Sea Food – Salem, Tamil Nadu</h2>
            <p className="text-textsecondary text-base md:text-lg leading-relaxed font-medium">
              We supply fresh fish, prawns, crab, and frozen seafood for retail and wholesale customers in Salem. Bulk orders available. Contact: +91 9865668125.
            </p>
          </div>
        </ScrollReveal>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-textprimary tracking-tight mb-4">Why Choose Kamal Sea Food</h2>
          <p className="text-textsecondary text-lg font-medium max-w-2xl mx-auto">We prioritize quality, hygiene, and convenience to bring you the best seafood experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="premium-card p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col hover:border-gray-200"
            >
              <div className="w-12 h-12 bg-altbg text-secondary rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              
              <h3 className="text-lg font-bold mb-2 text-textprimary">{card.title}</h3>
              
              <p className="text-textsecondary text-sm font-medium leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
