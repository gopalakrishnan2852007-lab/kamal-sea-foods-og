import { useEffect, useState } from "react";

export default function EntranceReveal({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 1900),
      setTimeout(() => setPhase(5), 2400),
      setTimeout(() => setPhase(6), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 6 && onComplete) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${
        phase === 6 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #0d2240 50%, #1a4a6e 100%)" }}
    >
      {/* Animated bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 20 + 8}px`,
              height: `${Math.random() * 20 + 8}px`,
              left: `${10 + i * 8}%`,
              bottom: "-30px",
              background: "rgba(100,200,255,0.1)",
              border: "1px solid rgba(100,200,255,0.25)",
              animation: `bubbleUp ${5 + i * 0.6}s ease-in infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Wave bottom */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          opacity: phase >= 4 ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <svg viewBox="0 0 1440 120" className="w-full" style={{ animation: "waveDrift 8s ease-in-out infinite" }}>
          <path
            d="M0,60 C180,10 360,110 540,60 C720,10 900,110 1080,60 C1260,10 1440,80 1440,60 L1440,120 L0,120 Z"
            fill="rgba(15,51,88,0.95)"
          />
        </svg>
      </div>

      {/* Fish icon */}
      <div
        className="text-6xl mb-6 select-none"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateX(0) rotate(0deg)" : "translateX(-120px) rotate(-20deg)",
          transition: "all 0.9s cubic-bezier(0.34,1.56,0.64,1)",
          filter: "drop-shadow(0 0 20px rgba(64,196,255,0.6))",
        }}
      >
        🐟
      </div>

      {/* Tag line */}
      <p
        className="text-xs font-medium tracking-widest uppercase mb-4"
        style={{
          color: "#64c8ff",
          letterSpacing: "5px",
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s ease",
        }}
      >
        Salem's Finest · Frozen Daily
      </p>

      {/* Brand name */}
      <div className="flex gap-3 mb-4 overflow-hidden">
        {["Kamal", "Sea", "Food"].map((word, i) => (
          <span
            key={word}
            className="font-black"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(40px, 10vw, 88px)",
              color: i === 1 ? "#64c8ff" : "#ffffff",
              opacity: phase >= 3 + i * 0.3 ? 1 : 0,
              transform: phase >= 3 + i * 0.3 ? "translateY(0)" : "translateY(60px)",
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              lineHeight: 1,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Divider line */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #64c8ff, transparent)",
          width: "200px",
          transform: phase >= 4 ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "center center",
          willChange: "transform",
          marginBottom: "16px",
        }}
      />

      {/* Subtitle */}
      <p
        className="text-sm font-light tracking-widest mb-3"
        style={{
          color: "rgba(255,255,255,0.6)",
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.7s ease",
        }}
      >
        Frozen Fish · Wholesale & Retail
      </p>

      {/* Location badge */}
      <div
        className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-widest uppercase"
        style={{
          background: "rgba(100,200,255,0.1)",
          border: "1px solid rgba(100,200,255,0.25)",
          color: "#64c8ff",
          opacity: phase >= 5 ? 1 : 0,
          transform: phase >= 5 ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.7s ease",
        }}
      >
        📍 Ammapet, Salem
      </div>

      <style>{`
        @keyframes bubbleUp {
          0%   { transform: translateY(0) scale(0.5); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
        @keyframes waveDrift {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(-10%); }
        }
      `}</style>
    </div>
  );
}
