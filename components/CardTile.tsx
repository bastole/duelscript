"use client"

import { motion } from "framer-motion"
import { YgoCard } from "@/types"

interface Props {
  card: YgoCard
  onSelect?: (card: YgoCard) => void
  small?: boolean
}

export default function CardTile({ card, onSelect, small }: Props) {
  const img = card.card_images[0]
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect?.(card)}
      className={`flex flex-col items-center gap-1 rounded-lg border bg-card p-1 text-left transition-shadow hover:shadow-md focus:outline-none ${small ? "w-[72px]" : "w-[100px]"}`}
    >
      <img
        src={small ? img.image_url_small : img.image_url_small}
        alt={card.name}
        className={`rounded object-cover ${small ? "h-[100px] w-[72px]" : "h-[138px] w-[100px]"}`}
        loading="lazy"
      />
      <span className="line-clamp-2 w-full text-center text-[10px] leading-tight text-muted-foreground">
        {card.name}
      </span>
    </motion.button>
  )
}
