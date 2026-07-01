"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { YgoCard } from "@/types"
import { X } from "lucide-react"

interface Props {
  id: string
  card: YgoCard
  onRemove: () => void
  onZoom?: (card: YgoCard) => void
}

export default function DeckCardSlot({ id, card, onRemove, onZoom }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative flex-shrink-0 cursor-grab active:cursor-grabbing"
    >
      <img
        src={card.card_images[0].image_url_small}
        alt={card.name}
        className="h-[90px] w-[65px] rounded object-cover"
        loading="lazy"
        draggable={false}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onZoom?.(card)}
        style={{ cursor: onZoom ? "pointer" : undefined }}
      />
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onRemove}
        className="absolute right-0.5 top-0.5 hidden rounded-full bg-black/70 p-0.5 text-white group-hover:flex"
      >
        <X size={10} />
      </button>
    </div>
  )
}
