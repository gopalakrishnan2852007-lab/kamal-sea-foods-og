import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '', style = {}, delay = 0, threshold = 0.1 }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        } else {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin: '0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${isRevealed ? 'revealed' : ''} ${className}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}
