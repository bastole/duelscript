"use client"

import { useState, useEffect, useRef } from "react"
import { useCardStore } from "@/store/useCardStore"
import { YgoCard } from "@/types"
import CardTile from "@/components/CardTile"
import CardModal from "@/components/CardModal"

export default function CardsPage() {
  const { results, loading, search } = useCardStore()
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<YgoCard | null>(null)
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!query.trim()) return
    if (debounce.current) clearTimeout(debounce.current)
    debounce.current = setTimeout(() => search(query), 400)
    return () => { if (debounce.current) clearTimeout(debounce.current) }
  }, [query, search])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Card browser</h1>
      <input
        type="text"
        placeholder="Search by card name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 w-full max-w-md rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      {loading && (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-[170px] w-[100px] animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {results.map((card) => (
            <CardTile key={card.id} card={card} onSelect={setSelected} />
          ))}
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-muted-foreground">No cards found for &quot;{query}&quot;</p>
      )}

      {!query && (
        <p className="text-muted-foreground">Type a card name above to start searching.</p>
      )}

      <CardModal card={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  )
}
