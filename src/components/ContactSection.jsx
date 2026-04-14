import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { SYMBOLS, getWhatsAppLink } from '../utils/whatsappUtils';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the message
    const message = [
      `Hi Kamal Sea Food! ${SYMBOLS.WAVE} I have a new enquiry from the website:`,
      ``,
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*Message:* ${formData.message}`,
      ``,
      `Please get back to me. Thank you! ${SYMBOLS.PRAY}`
    ].join('\n');

    // Open WhatsApp
    const waLink = getWhatsAppLink(message);
    window.open(waLink, '_blank');
    
    // Also trigger email if possible (as a separate action or info)
    // We show success message anyway
    setSubmitted(true);
    
    // Auto-reset after some time
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 10000);
  };

  return (
    <section id="contact" className="relative pt-32 pb-16 md:py-24 overflow-hidden bg-[#021B2B] text-white scroll-mt-32">
      {/* Wave background decorative */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#64c8ff"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left Side: Contact Info */}
          <ScrollReveal direction="left">
            <div>
              <p className="text-secondary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3 md:mb-4">Connect with Us</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 md:mb-8">Get in Touch</h2>
              <p className="text-gray-300 text-lg mb-12 max-w-md font-medium">
                Have questions or need bulk order? Contact us anytime. Our team is ready to assist you with the best seafood solutions.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300 shadow-xl">
                    <span className="material-symbols-outlined text-secondary">call</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Phone Number</p>
                    <a href="tel:9865668125" className="text-xl font-bold hover:text-secondary transition-colors leading-none">+91 9865668125</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300 shadow-xl">
                    <span className="material-symbols-outlined text-secondary">mail</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Email Address</p>
                    <a href="mailto:gopalakrishnan2852007@gmail.com" className="text-xl font-bold hover:text-secondary transition-colors leading-none">gopalakrishnan2852007@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/919865668125" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-secondary text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(100,200,255,0.4)] transition-all active:scale-95 shadow-lg"
                >
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp Us
                </a>
                <a 
                  href="tel:9865668125"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 shadow-lg"
                >
                  <span className="material-symbols-outlined">call</span>
                  Call Now
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side: Form */}
          <ScrollReveal direction="right" delay={300}>
            <div className="glass-card p-8 md:p-10 rounded-[2rem] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="enquiry-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">edit_note</span>
                      Send an Enquiry
                    </h3>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors placeholder:text-gray-600 font-medium" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="98XXXXXX25"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors placeholder:text-gray-600 font-medium" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Message</label>
                      <textarea 
                        required
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Hi, I'm interested in bulk orders of Tiger Prawns..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-secondary transition-colors placeholder:text-gray-600 font-medium resize-none" 
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-secondary to-[#48a6d9] text-white py-5 rounded-xl font-bold text-lg hover:shadow-[0_0_25px_rgba(100,200,255,0.5)] transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-3"
                    >
                      <span className="material-symbols-outlined">send</span>
                      Send via WhatsApp
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                      <span className="material-symbols-outlined text-green-400 text-4xl">check_circle</span>
                    </div>
                    <h3 className="text-3xl font-black mb-4">Thanks!</h3>
                    <p className="text-gray-300 text-lg font-medium leading-relaxed">
                      We will contact you soon. Your enquiry has been forwarded.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-secondary font-bold uppercase tracking-widest text-sm hover:underline"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
