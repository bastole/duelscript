import { Deck, Combo } from "@/types"

export function loadDecks(): Deck[] {
  try {
    const raw = localStorage.getItem("duelscript_decks")
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveDecks(decks: Deck[]): void {
  try {
    localStorage.setItem("duelscript_decks", JSON.stringify(decks))
  } catch {}
}

export function loadCombos(): Combo[] {
  try {
    const raw = localStorage.getItem("duelscript_combos")
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCombos(combos: Combo[]): void {
  try {
    localStorage.setItem("duelscript_combos", JSON.stringify(combos))
  } catch {}
}

export function exportDeck(deck: Deck): void {
  const blob = new Blob([JSON.stringify(deck, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${deck.name.replace(/\s+/g, "_")}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importDeck(file: File): Promise<Deck> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const deck = JSON.parse(e.target?.result as string) as Deck
        resolve(deck)
      } catch {
        reject(new Error("Invalid deck file"))
      }
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}
