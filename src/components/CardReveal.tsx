import { CardData } from "@/lib/cardData";
import cardBackImg from "@/assets/card-back.jpg";

interface Props {
  card: CardData;
  onClose: () => void;
}

export function CardReveal({ card, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="animate-flip-in max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="border-ornate rounded-lg overflow-hidden bg-card card-reveal-glow">
          {/* Card Image */}
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              src={card.image || cardBackImg}
              alt={card.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, hsl(260 35% 12%) 0%, transparent 40%)",
              }}
            />
          </div>

          {/* Card Info */}
          <div className="p-5 text-center space-y-3">
            <h2 className="font-display text-2xl md:text-3xl text-gold-light tracking-wide">
              {card.name}
            </h2>
            <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="font-body text-foreground text-base md:text-lg leading-relaxed">
              {card.description}
            </p>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full py-3 font-display text-sm tracking-widest uppercase text-lilac hover:text-lilac-glow transition-colors border-t border-border"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
