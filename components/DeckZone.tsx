"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { YgoCard } from "@/types"
import DeckCardSlot from "./DeckCardSlot"
import { Badge } from "@/components/ui/badge"

interface Props {
  id: string
  label: string
  cards: YgoCard[]
  limit: number
  onRemove: (index: number) => void
  onZoom?: (card: YgoCard) => void
}

export default function DeckZone({ id, label, cards, limit, onRemove, onZoom }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const itemIds = cards.map((_, i) => `${id}-${i}`)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        <Badge variant={cards.length >= limit ? "destructive" : "secondary"}>
          {cards.length} / {limit}
        </Badge>
      </div>
      <div
        ref={setNodeRef}
        className={`min-h-[100px] rounded-lg border-2 border-dashed p-2 transition-colors ${
          isOver ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        <SortableContext items={itemIds} strategy={rectSortingStrategy}>
          <div className="flex flex-wrap gap-1">
            {cards.map((card, i) => (
              <DeckCardSlot
                key={`${id}-${i}-${card.id}`}
                id={`${id}-${i}`}
                card={card}
                onRemove={() => onRemove(i)}
                onZoom={onZoom}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}
