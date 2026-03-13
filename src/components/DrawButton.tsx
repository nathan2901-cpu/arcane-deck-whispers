import cardBackImg from "@/assets/card-back.jpg";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export function DrawButton({ onClick, disabled }: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Floating card back */}
      <div className="animate-float">
        <div className="w-48 md:w-56 border-ornate rounded-lg overflow-hidden glow-lilac">
          <img src={cardBackImg} alt="Baralho Arcano" className="w-full" />
        </div>
      </div>

      {/* Draw button */}
      <button
        onClick={onClick}
        disabled={disabled}
        className="group relative font-display text-lg md:text-xl tracking-wider px-8 py-4 md:px-12 md:py-5 rounded-lg border-2 border-gold text-gold-light transition-all duration-500 hover:border-lilac hover:text-lilac-glow glow-gold hover:glow-lilac disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, hsl(260 35% 12%) 0%, hsl(270 30% 15%) 100%)",
        }}
      >
        <span className="relative z-10">Retirar Carta do Baralho</span>
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
          background: "linear-gradient(135deg, hsl(300 20% 15% / 0.3), hsl(260 30% 12% / 0.3))",
        }} />
      </button>
    </div>
  );
}
