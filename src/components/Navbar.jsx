import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const links = [
    { label: 'About',        href: '#about'   },
    { label: 'Products',     href: '#retail'  },
    { label: 'Why Choose Us',href: '#trust'   },
    { label: 'Contact',      href: '#contact' },
  ];

  return (
    <>
      <style>{`
        /* ── Navbar wrapper ── */
        .ksf-nav {
          position: sticky;
          top: 0;
          z-index: 2000;
          width: 100%;
          box-sizing: border-box;
          padding: 0 16px;
          /* floating feel: shadow that deepens on scroll */
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }

        .ksf-nav.scrolled {
          box-shadow: 0 8px 32px rgba(2, 27, 43, 0.45);
        }

        /* ── Inner bar ── */
        .ksf-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          background: rgba(5, 25, 40, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-top: none;
          border-radius: 0 0 20px 20px;
          padding: 0 18px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255,255,255,0.06);
          background-image: linear-gradient(
            135deg,
            rgba(255,255,255,0.04) 0%,
            rgba(255,255,255,0.00) 60%
          );
          transition: box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .ksf-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0 0 20px 20px;
          background: linear-gradient(180deg, rgba(100, 200, 255, 0.04) 0%, transparent 100%);
          pointer-events: none;
        }

        /* ── Logo ── */
        .ksf-logo {
          font-size: 18px;
          font-weight: 600;
          color: #e8f4fb;
          letter-spacing: 0.4px;
          text-decoration: none;
          line-height: 1;
          position: relative;
          z-index: 1;
          transition: color 0.2s;
        }

        .ksf-logo:hover { color: #64c8ff; }

        /* ── Desktop links ── */
        .ksf-desktop-links {
          display: none;
          gap: 28px;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 768px) {
          .ksf-desktop-links { display: flex; }
          .ksf-hamburger      { display: none !important; }
        }

        .ksf-desktop-links a {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: rgba(232, 244, 251, 0.75);
          text-decoration: none;
          transition: color 0.2s;
        }

        .ksf-desktop-links a:hover { color: #64c8ff; }

        /* ── Hamburger button ── */
        .ksf-hamburger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: #e8f4fb;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: background 0.2s, transform 0.2s;
          position: relative;
          z-index: 1;
        }

        .ksf-hamburger:hover   { background: rgba(255,255,255,0.08); }
        .ksf-hamburger:active  { transform: scale(0.92); }

        .ksf-hamburger span {
          font-size: 22px;
          font-variation-settings: 'wght' 500;
        }

        /* ── Mobile dropdown overlay ── */
        .ksf-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 1999;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .ksf-mobile-menu.open {
          pointer-events: all;
          opacity: 1;
        }

        /* dim backdrop */
        .ksf-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(2, 10, 20, 0.60);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* slide-down panel */
        .ksf-panel {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(5, 22, 38, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.09);
          border-radius: 0 0 28px 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.50);
          padding: 72px 24px 32px;
          transform: translateY(-110%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          background-image: linear-gradient(160deg, rgba(100,200,255,0.04) 0%, transparent 60%);
        }

        .ksf-mobile-menu.open .ksf-panel {
          transform: translateY(0);
        }

        .ksf-panel a {
          display: block;
          font-size: 22px;
          font-weight: 700;
          color: rgba(232, 244, 251, 0.85);
          text-decoration: none;
          letter-spacing: -0.3px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s, padding-left 0.2s;
        }

        .ksf-panel a:last-child { border-bottom: none; }

        .ksf-panel a:hover {
          color: #64c8ff;
          padding-left: 6px;
        }

        /* close button inside panel */
        .ksf-panel-close {
          position: absolute;
          top: 14px;
          right: 18px;
          background: rgba(255,255,255,0.07);
          border: none;
          border-radius: 10px;
          color: #e8f4fb;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          transition: background 0.2s, transform 0.2s;
        }

        .ksf-panel-close:hover  { background: rgba(255,255,255,0.14); }
        .ksf-panel-close:active { transform: scale(0.92); }

        .ksf-panel-close span { font-size: 22px; }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`ksf-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="ksf-bar">
          {/* Logo */}
          <a href="/" className="ksf-logo">Kamal Sea Food</a>

          {/* Desktop links */}
          <div className="ksf-desktop-links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="ksf-hamburger"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <div className={`ksf-mobile-menu${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
        {/* Dim backdrop — click to close */}
        <div className="ksf-backdrop" onClick={() => setIsOpen(false)} />

        {/* Slide-down panel */}
        <div className="ksf-panel">
          <button
            className="ksf-panel-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
