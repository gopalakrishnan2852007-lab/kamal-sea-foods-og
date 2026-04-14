import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: 'linear-gradient(180deg, #021B2B 0%, #052d47 50%, #021B2B 100%)',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '70px',
      }}
    >
      {/* Subtle floating bubbles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              width: `${10 + (i * 7) % 20}px`,
              height: `${10 + (i * 7) % 20}px`,
              left: `${(i * 8.3) % 100}%`,
              bottom: '-50px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              animation: `bubbleUp ${12 + (i * 1.5)}s linear infinite`,
              animationDelay: `${(i * 0.7)}s`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── DESKTOP: side-by-side grid ── */}
        <div className="about-grid">

          {/* Left — Text card */}
          <ScrollReveal direction="left">
            <div className="about-text-card">
              <p style={{
                color: '#64c8ff',
                fontWeight: 700,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: 12,
              }}>
                Our Legacy
              </p>

              <h2 style={{
                color: '#ffffff',
                fontWeight: 900,
                fontSize: 'clamp(24px, 4vw, 40px)',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                marginBottom: 20,
              }}>
                About Kamal Sea Food
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480 }}>
                <p style={{ color: '#cde9f6', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  At Kamal Sea Food, we supply premium quality frozen seafood for both retail and
                  bulk customers. We focus on quality, hygiene, and reliable delivery.
                </p>
                <p style={{ color: '#a8d4ec', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  Our products are carefully selected and properly frozen at ultra-low temperatures
                  right after catch to maintain natural flavor, texture, and nutritional value.
                </p>
                <p className="about-third-para" style={{ color: '#a8d4ec', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  We serve restaurants, retailers, and individual customers with competitive
                  pricing and consistent supply — bringing the best seafood experience to Salem.
                </p>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                <div className="about-badge">
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#64c8ff' }}>verified</span>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e0f4ff' }}>
                    Quality Assured
                  </span>
                </div>
                <div className="about-badge">
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#64c8ff' }}>eco</span>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e0f4ff' }}>
                    100% Hygienic
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Image */}
          <ScrollReveal direction="right" delay={200}>
            <div className="about-image-wrap">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.06)' }}
              >
                <img
                  src="/images/about-seafood.png"
                  alt="Premium Seafood selection"
                  style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(2,27,43,0.5) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }} />
              </motion.div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .about-text-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          padding: 40px;
          height: 100%;
          box-sizing: border-box;
        }

        .about-image-wrap {
          position: relative;
        }

        .about-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 999px;
          padding: 7px 14px;
        }

        /* ── MOBILE ── */
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .about-text-card {
            padding: 24px 20px;
            border-radius: 20px;
          }

          .about-third-para {
            display: none;
          }

          .about-image-wrap {
            width: 100%;
          }

          .about-image-wrap > div {
            border-radius: 20px !important;
          }

          /* Disable float animation on mobile */
          .about-image-wrap .framer-motion-div {
            animation: none !important;
          }
        }

        @media (max-width: 480px) {
          .about-text-card {
            padding: 20px 16px;
          }
        }
      `}</style>
    </section>
  );
}
