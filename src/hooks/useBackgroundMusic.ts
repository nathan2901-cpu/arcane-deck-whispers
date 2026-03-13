import { useRef, useState, useCallback, useEffect } from "react";

const MUSIC_SRC = "/audio/mystical-bg.mp3";
const DEFAULT_VOLUME = 0.15;
const FADE_DURATION = 600; // ms
const FADE_STEPS = 30;

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userEnabled, setUserEnabled] = useState(true);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeTo = useCallback((targetVolume: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();

    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    const stepTime = FADE_DURATION / FADE_STEPS;
    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step++;
      const progress = step / FADE_STEPS;
      // ease-in-out
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      audio.volume = Math.max(0, Math.min(1, startVolume + diff * eased));

      if (step >= FADE_STEPS) {
        clearFade();
        audio.volume = targetVolume;
        onDone?.();
      }
    }, stepTime);
  }, [clearFade]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => {
      setIsPlaying(true);
      fadeTo(DEFAULT_VOLUME);
    }).catch(() => {
      // Autoplay blocked — will retry on user interaction
    });
  }, [fadeTo]);

  const fadeOutAndPause = useCallback(() => {
    fadeTo(0, () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    });
  }, [fadeTo]);

  const fadeInAndResume = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !userEnabled) return;
    audio.volume = 0;
    audio.play().then(() => {
      setIsPlaying(true);
      fadeTo(DEFAULT_VOLUME);
    }).catch(() => {});
  }, [fadeTo, userEnabled]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      setUserEnabled(false);
      fadeOutAndPause();
    } else {
      setUserEnabled(true);
      play();
    }
  }, [isPlaying, fadeOutAndPause, play]);

  // Try autoplay on first user interaction
  useEffect(() => {
    if (!userEnabled) return;

    const tryPlay = () => {
      if (audioRef.current && !isPlaying) {
        play();
      }
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };

    // Try immediate autoplay
    play();

    // Fallback: play on first interaction
    document.addEventListener("click", tryPlay);
    document.addEventListener("touchstart", tryPlay);

    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isPlaying,
    toggle,
    fadeOutAndPause,
    fadeInAndResume,
  };
}
