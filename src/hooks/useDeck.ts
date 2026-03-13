import { useState, useCallback } from "react";
import { CardData, defaultCards } from "@/lib/cardData";

const STORAGE_KEY = "arcane-deck-cards";
const VIDEO_KEY = "arcane-deck-video";

function loadCards(): CardData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultCards;
}

function saveCards(cards: CardData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function useDeck() {
  const [cards, setCards] = useState<CardData[]>(loadCards);
  const [videoUrl, setVideoUrl] = useState<string | null>(() => localStorage.getItem(VIDEO_KEY));

  const updateCards = useCallback((newCards: CardData[]) => {
    setCards(newCards);
    saveCards(newCards);
  }, []);

  const addCard = useCallback((card: Omit<CardData, "id">) => {
    if (cards.length >= 22) return false;
    const newCard: CardData = { ...card, id: crypto.randomUUID() };
    updateCards([...cards, newCard]);
    return true;
  }, [cards, updateCards]);

  const editCard = useCallback((id: string, updates: Partial<Omit<CardData, "id">>) => {
    updateCards(cards.map(c => c.id === id ? { ...c, ...updates } : c));
  }, [cards, updateCards]);

  const deleteCard = useCallback((id: string) => {
    updateCards(cards.filter(c => c.id !== id));
  }, [cards, updateCards]);

  const drawCard = useCallback((): CardData | null => {
    if (cards.length === 0) return null;
    return cards[Math.floor(Math.random() * cards.length)];
  }, [cards]);

  const setVideo = useCallback((url: string | null) => {
    setVideoUrl(url);
    if (url) localStorage.setItem(VIDEO_KEY, url);
    else localStorage.removeItem(VIDEO_KEY);
  }, []);

  return { cards, addCard, editCard, deleteCard, drawCard, videoUrl, setVideo };
}
