"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Deck } from "@/types"
import { exportDeck, importDeck } from "@/lib/storage"

interface Props {
  deck: Deck
  onImport: (deck: Deck) => void
}

export default function ExportImport({ deck, onImport }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const imported = await importDeck(file)
      onImport(imported)
    } catch {
      alert("Could not read that file. Make sure it's a DuelScript deck JSON.")
    }
    e.target.value = ""
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => exportDeck(deck)}>
        Export JSON
      </Button>
      <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
        Import JSON
      </Button>
      <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
    </div>
  )
}
