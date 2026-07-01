"use client"

import { YgoCard } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Props {
  card: YgoCard | null
  open: boolean
  onClose: () => void
  onAddToDeck?: (card: YgoCard) => void
}

export default function CardModal({ card, open, onClose, onAddToDeck }: Props) {
  if (!card) return null
  const img = card.card_images[0]

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">{card.name}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <img
            src={img.image_url}
            alt={card.name}
            className="h-[220px] w-[160px] rounded-lg object-cover shadow"
          />
          <div className="flex flex-1 flex-col gap-2 text-sm">
            <Badge variant="outline">{card.type}</Badge>
            {card.attribute && <span className="text-muted-foreground">{card.attribute} / {card.race}</span>}
            {card.level !== undefined && <span>Level {card.level}</span>}
            {card.atk !== undefined && (
              <span>ATK {card.atk} / DEF {card.def}</span>
            )}
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-6">{card.desc}</p>
          </div>
        </div>
        {onAddToDeck && (
          <Button onClick={() => { onAddToDeck(card); onClose() }} className="w-full mt-2">
            Add to deck
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
