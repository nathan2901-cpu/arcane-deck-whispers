import { useState, useRef } from "react";
import { useDeck } from "@/hooks/useDeck";
import { CardData } from "@/lib/cardData";
import { MagicParticles } from "@/components/MagicParticles";
import { DrawButton } from "@/components/DrawButton";
import { CardReveal } from "@/components/CardReveal";
import { VideoOverlay } from "@/components/VideoOverlay";
import { ManageCardsModal } from "@/components/ManageCardsModal";
import { Settings, Film } from "lucide-react";
import bgNebula from "@/assets/bg-nebula.jpg";

const Index = () => {
  const { cards, addCard, editCard, deleteCard, drawCard, videoUrl, setVideo } = useDeck();
  const [drawnCard, setDrawnCard] = useState<CardData | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [pendingCard, setPendingCard] = useState<CardData | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleDraw = () => {
    const card = drawCard();
    if (!card) return;

    if (videoUrl) {
      setPendingCard(card);
      setShowVideo(true);
    } else {
      setDrawnCard(card);
    }
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setDrawnCard(pendingCard);
    setPendingCard(null);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideo(url);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgNebula})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-nebula opacity-80" />

      <MagicParticles />

      {/* Title */}
      <div className="relative z-10 text-center mb-8 md:mb-12 px-4">
        <h1 className="font-display text-3xl md:text-5xl text-gold-light tracking-wide mb-2 animate-fade-in-up">
          Baralho das Surpresas
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          22 cartas de destino aguardam sua escolha
        </p>
      </div>

      {/* Draw Button */}
      <div className="relative z-10">
        <DrawButton onClick={handleDraw} disabled={cards.length === 0} />
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-between px-6 z-10">
        <button
          onClick={() => setShowManage(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground hover:border-gold transition-all bg-card/50 backdrop-blur-sm"
        >
          <Settings size={16} />
          <span className="hidden sm:inline">Gerenciar Cartas</span>
        </button>

        <button
          onClick={() => videoInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground hover:border-gold transition-all bg-card/50 backdrop-blur-sm"
        >
          <Film size={16} />
          <span className="hidden sm:inline">Alterar Vídeo</span>
        </button>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
        />
      </div>

      {/* Card count */}
      <div className="relative z-10 mt-8">
        <p className="font-body text-sm text-muted-foreground">{cards.length} cartas no baralho</p>
      </div>

      {/* Modals */}
      {showVideo && videoUrl && (
        <VideoOverlay videoUrl={videoUrl} onEnded={handleVideoEnd} />
      )}

      {drawnCard && (
        <CardReveal card={drawnCard} onClose={() => setDrawnCard(null)} />
      )}

      {showManage && (
        <ManageCardsModal
          cards={cards}
          onAdd={addCard}
          onEdit={editCard}
          onDelete={deleteCard}
          onClose={() => setShowManage(false)}
        />
      )}
    </div>
  );
};

export default Index;
