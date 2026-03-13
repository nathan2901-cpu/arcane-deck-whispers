interface Props {
  videoUrl: string;
  onEnded: () => void;
}

export function VideoOverlay({ videoUrl, onEnded }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
    >
      <video
        src={videoUrl}
        autoPlay
        onEnded={onEnded}
        className="max-w-full max-h-full"
        playsInline
      />
      <button
        onClick={onEnded}
        className="absolute top-4 right-4 font-display text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Pular ✕
      </button>
    </div>
  );
}
