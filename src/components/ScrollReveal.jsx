import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '', style = {} }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        } else {
          // Optional: Remove to trigger animation only once
          setIsRevealed(false);
        }
      },
      { threshold: 0, rootMargin: '0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${isRevealed ? 'revealed' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
