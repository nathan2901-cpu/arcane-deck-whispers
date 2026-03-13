import { useState } from "react";

interface Props {
  videoUrl: string;
  onEnded: () => void;
}

export function VideoOverlay({ videoUrl, onEnded }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500"
      style={{
        backgroundColor: "rgba(0,0,0,0.95)",
        opacity: visible ? 1 : 0,
      }}
    >
      <video
        src={videoUrl}
        autoPlay
        onLoadedData={() => setVisible(true)}
        onEnded={onEnded}
        className="max-w-full max-h-full transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
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
