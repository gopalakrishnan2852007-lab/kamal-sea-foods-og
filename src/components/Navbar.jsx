import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#retail' },
    { label: 'Why Choose Us', href: '#trust' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000,
        background: 'rgba(233, 239, 243, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 2px 16px 0 rgba(31,59,77,0.10)' : '0 1px 0 0 rgba(31,59,77,0.07)',
        transition: 'box-shadow 0.3s',
        boxSizing: 'border-box',
      }}
    >
      {/* Main bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '13px 20px',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#1f3b4d',
            letterSpacing: '0.3px',
            textDecoration: 'none',
            lineHeight: 1,
          }}
        >
          Kamal Sea Food
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 32 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#1f3b4d',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#3b9ecf')}
              onMouseLeave={(e) => (e.target.style.color = '#1f3b4d')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#1f3b4d',
            display: 'flex',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          style={{
            background: 'rgba(233,239,243,0.98)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(31,59,77,0.08)',
            boxShadow: '0 8px 24px rgba(31,59,77,0.10)',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#1f3b4d',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
