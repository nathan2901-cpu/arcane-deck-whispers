import { useMemo } from "react";

export function MagicParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 4,
      opacity: Math.random() * 0.4 + 0.1,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0
              ? "hsl(300 30% 80%)"
              : p.id % 3 === 1
              ? "hsl(38 50% 60%)"
              : "hsl(260 40% 70%)",
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: `blur(${p.size > 3 ? 1 : 0}px)`,
          }}
        />
      ))}
    </div>
  );
}
