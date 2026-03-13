import { useEffect, useState } from "react";

interface Props {
  active: boolean;
  onComplete: () => void;
}

export function DrawTransition({ active, onComplete }: Props) {
  const [phase, setPhase] = useState<"idle" | "darkening" | "ready">("idle");

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      return;
    }

    setPhase("darkening");
    const timer = setTimeout(() => {
      setPhase("ready");
      onComplete();
    }, 700);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (phase === "idle") return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          backgroundColor: "hsl(260 40% 3%)",
          opacity: phase === "darkening" ? 1 : 0,
        }}
      />

      {/* Center glow burst */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{ opacity: phase === "darkening" ? 1 : 0 }}
      >
        <div
          className="w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(300 30% 60% / 0.3) 0%, hsl(38 50% 50% / 0.15) 40%, transparent 70%)",
            animation: phase === "darkening" ? "pulse-glow 1s ease-in-out" : "none",
          }}
        />
      </div>

      {/* Floating sparks */}
      {phase === "darkening" && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${40 + Math.random() * 20}%`,
                top: `${40 + Math.random() * 20}%`,
                background: i % 2 === 0 ? "hsl(300 40% 75%)" : "hsl(38 60% 65%)",
                animation: `spark-fly ${0.5 + Math.random() * 0.4}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
