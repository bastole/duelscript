"use client"

import { useState, useEffect, useRef } from "react"
import { ComboStep, YgoCard } from "@/types"
import { useCardStore } from "@/store/useCardStore"
import ZoneSelector, { ALL_ZONES, COMBO_ACTIONS } from "./ZoneSelector"
import { Button } from "@/components/ui/button"

interface Props {
  onAdd: (step: Omit<ComboStep, "id">) => void
  onUpdate?: (step: ComboStep) => void
  editingStep?: ComboStep | null
  onCancelEdit?: () => void
}

export default function ComboStepForm({ onAdd, onUpdate, editingStep, onCancelEdit }: Props) {
  const { results, loading, search } = useCardStore()
  const [query, setQuery] = useState("")
  const [selectedCard, setSelectedCard] = useState<YgoCard | null>(null)
  const [action, setAction] = useState<string | null>(null)
  const [fromZone, setFromZone] = useState<string | null>(null)
  const [toZone, setToZone] = useState<string | null>(null)
  const [note, setNote] = useState("")
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pre-fill form when editingStep changes
  useEffect(() => {
    if (editingStep) {
      setSelectedCard({
        id: editingStep.cardId,
        name: editingStep.cardName,
        card_images: [{ id: editingStep.cardId, image_url: editingStep.cardImageSmall, image_url_small: editingStep.cardImageSmall }],
        type: "", desc: "", race: "",
      })
      setQuery(editingStep.cardName)
      setAction(editingStep.action)
      setFromZone(editingStep.fromZone)
      setToZone(editingStep.toZone)
      setNote(editingStep.note)
    } else {
      setSelectedCard(null)
      setQuery("")
      setAction(null)
      setFromZone(null)
      setToZone(null)
      setNote("")
    }
  }, [editingStep])

  useEffect(() => {
    if (!query.trim() || selectedCard) return
    if (debounce.current) clearTimeout(debounce.current)
    debounce.current = setTimeout(() => search(query), 400)
    return () => { if (debounce.current) clearTimeout(debounce.current) }
  }, [query, selectedCard, search])

  const handleSubmit = () => {
    if (!selectedCard || !action || !fromZone || !toZone) return
    const stepData = {
      cardId: selectedCard.id,
      cardName: selectedCard.name,
      cardImageSmall: selectedCard.card_images[0].image_url_small,
      action,
      fromZone,
      toZone,
      note,
    }
    if (editingStep && onUpdate) {
      onUpdate({ ...stepData, id: editingStep.id })
    } else {
      onAdd(stepData)
    }
    setSelectedCard(null)
    setQuery("")
    setAction(null)
    setFromZone(null)
    setToZone(null)
    setNote("")
  }

  const isEditing = !!editingStep

  return (
    <div className={`rounded-lg border bg-card p-4 flex flex-col gap-3 ${isEditing ? "border-primary" : ""}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{isEditing ? "Edit step" : "Add a step"}</p>
        {isEditing && onCancelEdit && (
          <button onClick={onCancelEdit} className="text-xs text-muted-foreground hover:text-foreground">
            Cancel
          </button>
        )}
      </div>

      {/* Card search */}
      {!selectedCard ? (
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Search for a card…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-lg border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {loading && <p className="text-xs text-muted-foreground">Searching…</p>}
          {results.length > 0 && (
            <div className="flex flex-wrap gap-1 max-h-[160px] overflow-y-auto">
              {results.slice(0, 20).map((card) => (
                <button
                  key={card.id}
                  onClick={() => { setSelectedCard(card); setQuery(card.name) }}
                  className="flex items-center gap-1 rounded border bg-muted px-2 py-1 text-xs hover:bg-accent"
                >
                  <img src={card.card_images[0].image_url_small} alt="" className="h-6 w-4 rounded object-cover" />
                  {card.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <img src={selectedCard.card_images[0].image_url_small} alt="" className="h-10 w-7 rounded object-cover" />
          <span className="text-sm flex-1">{selectedCard.name}</span>
          <button onClick={() => { setSelectedCard(null); setQuery("") }} className="text-xs text-muted-foreground hover:text-foreground">
            change
          </button>
        </div>
      )}

      {/* Action */}
      <ZoneSelector value={action} onChange={setAction} placeholder="Action" options={COMBO_ACTIONS} />

      {/* Zones */}
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">From</p>
          <ZoneSelector value={fromZone} onChange={setFromZone} placeholder="From zone" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">To</p>
          <ZoneSelector value={toZone} onChange={setToZone} placeholder="To zone" />
        </div>
      </div>

      {/* Note */}
      <textarea
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        className="rounded-lg border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
      />

      <Button
        onClick={handleSubmit}
        disabled={!selectedCard || !action || !fromZone || !toZone}
        size="sm"
      >
        {isEditing ? "Save changes" : "Add step"}
      </Button>
    </div>
  )
}
