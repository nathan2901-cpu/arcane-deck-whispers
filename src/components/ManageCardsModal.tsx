import { useState } from "react";
import { CardData } from "@/lib/cardData";
import { X, Plus, Pencil, Trash2 } from "lucide-react";

interface Props {
  cards: CardData[];
  onAdd: (card: Omit<CardData, "id">) => boolean;
  onEdit: (id: string, updates: Partial<Omit<CardData, "id">>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function ManageCardsModal({ cards, onAdd, onEdit, onDelete, onClose }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!formName.trim()) return;
    onAdd({ name: formName, description: formDesc, image: formImage });
    setFormName(""); setFormDesc(""); setFormImage(""); setShowAdd(false);
  };

  const startEdit = (card: CardData) => {
    setEditingId(card.id);
    setFormName(card.name);
    setFormDesc(card.description);
    setFormImage(card.image);
    setShowAdd(false);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    onEdit(editingId, { name: formName, description: formDesc, image: formImage });
    setEditingId(null); setFormName(""); setFormDesc(""); setFormImage("");
  };

  const isEditing = editingId !== null;
  const showForm = showAdd || isEditing;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <div className="bg-card border-ornate rounded-lg w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display text-xl text-gold-light">Gerenciar Cartas</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {showForm && (
            <div className="border border-border rounded-lg p-4 space-y-3 bg-muted/30">
              <h3 className="font-display text-sm text-lilac">
                {isEditing ? "Editar Carta" : "Nova Carta"}
              </h3>
              <input
                type="text"
                placeholder="Nome da carta"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="w-full bg-input border border-border rounded px-3 py-2 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lilac"
              />
              <textarea
                placeholder="Descrição da carta"
                value={formDesc}
                onChange={e => setFormDesc(e.target.value)}
                rows={3}
                className="w-full bg-input border border-border rounded px-3 py-2 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lilac resize-none"
              />
              <div>
                <label className="block text-sm text-muted-foreground mb-1 font-body">Imagem da carta</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-muted-foreground font-body" />
                {formImage && (
                  <img src={formImage} alt="Preview" className="mt-2 w-20 h-28 object-cover rounded border border-border" />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={isEditing ? handleSaveEdit : handleAdd}
                  className="px-4 py-2 bg-lilac text-primary-foreground rounded font-display text-sm hover:opacity-90 transition-opacity"
                >
                  {isEditing ? "Salvar" : "Adicionar"}
                </button>
                <button
                  onClick={() => { setShowAdd(false); setEditingId(null); setFormName(""); setFormDesc(""); setFormImage(""); }}
                  className="px-4 py-2 border border-border rounded text-muted-foreground font-display text-sm hover:text-foreground transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Card List */}
          {cards.map(card => (
            <div key={card.id} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
              <div className="w-10 h-14 rounded bg-muted overflow-hidden flex-shrink-0">
                {card.image && <img src={card.image} alt={card.name} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm text-gold-light truncate">{card.name}</p>
                <p className="text-xs text-muted-foreground font-body truncate">{card.description}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => startEdit(card)} className="p-2 text-muted-foreground hover:text-lilac transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => onDelete(card.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {cards.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-8">Nenhuma carta no baralho.</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-body">{cards.length}/22 cartas</span>
          {!showForm && cards.length < 22 && (
            <button
              onClick={() => { setShowAdd(true); setEditingId(null); setFormName(""); setFormDesc(""); setFormImage(""); }}
              className="flex items-center gap-1 px-3 py-2 bg-lilac/20 text-lilac rounded font-display text-sm hover:bg-lilac/30 transition-colors"
            >
              <Plus size={14} /> Adicionar Carta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
