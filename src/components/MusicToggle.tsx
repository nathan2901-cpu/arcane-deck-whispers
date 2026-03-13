import { Volume2, VolumeX } from "lucide-react";

interface Props {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicToggle({ isPlaying, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground font-body text-sm hover:text-foreground hover:border-gold transition-all bg-card/50 backdrop-blur-sm"
      title={isPlaying ? "Desativar música" : "Ativar música"}
    >
      {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span className="hidden sm:inline">Música</span>
    </button>
  );
}
