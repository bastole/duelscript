"use client"

import { useEffect } from "react"
import { use } from "react"
import { useDeckStore } from "@/store/useDeckStore"
import { YgoCard } from "@/types"
import DeckSidebar from "@/components/DeckSidebar"
import DeckZone from "@/components/DeckZone"
import ExportImport from "@/components/ExportImport"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

export default function DeckBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { decks, load, addCard, removeCard, updateDeck } = useDeckStore()
  useEffect(() => { load() }, [load])

  const deck = decks.find((d) => d.id === id)
  if (!deck) return <div className="p-8 text-muted-foreground">Deck not found.</div>

  const handleAdd = (card: YgoCard) => {
    const ok = addCard(id, "auto", card)
    if (!ok) alert("That zone is full!")
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const activeStr = active.id as string
    const overStr = over.id as string
    const [activeZone] = activeStr.split("-")
    const [overZone] = overStr.split("-")
    if (activeZone !== overZone) return
    const zone = activeZone as "mainDeck" | "extraDeck" | "sideDeck"
    const cards = [...deck[zone]]
    const oldIdx = parseInt(activeStr.split("-")[1])
    const newIdx = parseInt(overStr.split("-")[1])
    const reordered = arrayMove(cards, oldIdx, newIdx)
    updateDeck({ ...deck, [zone]: reordered })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{deck.name}</h1>
        <ExportImport deck={deck} onImport={(imported) => updateDeck({ ...imported, id: deck.id })} />
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-6">
          <DeckSidebar onAddCard={handleAdd} />
          <div className="flex-1 flex flex-col gap-6">
            <DeckZone
              id="mainDeck"
              label="Main deck"
              cards={deck.mainDeck}
              limit={60}
              onRemove={(i) => removeCard(id, "mainDeck", i)}
            />
            <DeckZone
              id="extraDeck"
              label="Extra deck"
              cards={deck.extraDeck}
              limit={15}
              onRemove={(i) => removeCard(id, "extraDeck", i)}
            />
            <DeckZone
              id="sideDeck"
              label="Side deck"
              cards={deck.sideDeck}
              limit={15}
              onRemove={(i) => removeCard(id, "sideDeck", i)}
            />
          </div>
        </div>
      </DndContext>
    </div>
  )
}
