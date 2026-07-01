"use client"

import { useState, useEffect, useRef } from "react"
import { useCardStore } from "@/store/useCardStore"
import { YgoCard } from "@/types"
import CardTile from "./CardTile"

interface Props {
  onAddCard: (card: YgoCard) => void
}

export default function DeckSidebar({ onAddCard }: Props) {
  const { results, loading, search } = useCardStore()
  const [query, setQuery] = useState("")
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!query.trim()) return
    if (debounce.current) clearTimeout(debounce.current)
    debounce.current = setTimeout(() => search(query), 400)
    return () => { if (debounce.current) clearTimeout(debounce.current) }
  }, [query, search])

  return (
    <div className="flex flex-col gap-3 w-[220px] shrink-0">
      <span className="text-sm font-medium">Add cards</span>
      <input
        type="text"
        placeholder="Search cards…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-lg border bg-background px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[calc(100vh-220px)]">
        {loading && <p className="text-xs text-muted-foreground">Searching…</p>}
        {results.map((card) => (
          <CardTile key={card.id} card={card} onSelect={onAddCard} small />
        ))}
      </div>
    </div>
  )
}
