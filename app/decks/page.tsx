"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useDeckStore } from "@/store/useDeckStore"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function DecksPage() {
  const { decks, load, createDeck, deleteDeck } = useDeckStore()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => { load() }, [load])

  const handleCreate = () => {
    if (!name.trim()) return
    createDeck(name.trim())
    setName("")
    setOpen(false)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My decks</h1>
        <Button onClick={() => setOpen(true)}>New deck</Button>
      </div>

      {decks.length === 0 && (
        <p className="text-muted-foreground">No decks yet. Create one to get started.</p>
      )}

      <div className="flex flex-col gap-3">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
          >
            <div>
              <p className="font-medium">{deck.name}</p>
              <p className="text-xs text-muted-foreground">
                {deck.mainDeck.length} main · {deck.extraDeck.length} extra · {deck.sideDeck.length} side
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/deck/${deck.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Edit</Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteDeck(deck.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New deck</DialogTitle>
          </DialogHeader>
          <input
            autoFocus
            type="text"
            placeholder="Deck name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button onClick={handleCreate} disabled={!name.trim()}>
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
