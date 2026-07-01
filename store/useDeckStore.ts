import { create } from "zustand"
import { Deck, YgoCard } from "@/types"
import { loadDecks, saveDecks } from "@/lib/storage"

type Zone = "mainDeck" | "extraDeck" | "sideDeck"

const EXTRA_TYPES = ["Fusion Monster", "Synchro Monster", "XYZ Monster", "Link Monster"]
const LIMITS: Record<Zone, number> = { mainDeck: 60, extraDeck: 15, sideDeck: 15 }

function inferZone(card: YgoCard): Zone {
  return EXTRA_TYPES.some((t) => card.type.includes(t)) ? "extraDeck" : "mainDeck"
}

interface DeckStore {
  decks: Deck[]
  loaded: boolean
  load: () => void
  createDeck: (name: string) => Deck
  deleteDeck: (id: string) => void
  updateDeck: (deck: Deck) => void
  addCard: (deckId: string, zone: Zone | "auto", card: YgoCard) => boolean
  removeCard: (deckId: string, zone: Zone, index: number) => void
}

export const useDeckStore = create<DeckStore>((set, get) => ({
  decks: [],
  loaded: false,
  load: () => {
    if (get().loaded) return
    set({ decks: loadDecks(), loaded: true })
  },
  createDeck: (name) => {
    const deck: Deck = {
      id: crypto.randomUUID(),
      name,
      mainDeck: [],
      extraDeck: [],
      sideDeck: [],
    }
    const decks = [...get().decks, deck]
    set({ decks })
    saveDecks(decks)
    return deck
  },
  deleteDeck: (id) => {
    const decks = get().decks.filter((d) => d.id !== id)
    set({ decks })
    saveDecks(decks)
  },
  updateDeck: (deck) => {
    const decks = get().decks.map((d) => (d.id === deck.id ? deck : d))
    set({ decks })
    saveDecks(decks)
  },
  addCard: (deckId, zoneArg, card) => {
    const deck = get().decks.find((d) => d.id === deckId)
    if (!deck) return false
    const zone: Zone = zoneArg === "auto" ? inferZone(card) : zoneArg
    if (deck[zone].length >= LIMITS[zone]) return false
    const updated = { ...deck, [zone]: [...deck[zone], card] }
    get().updateDeck(updated)
    return true
  },
  removeCard: (deckId, zone, index) => {
    const deck = get().decks.find((d) => d.id === deckId)
    if (!deck) return
    const arr = [...deck[zone]]
    arr.splice(index, 1)
    get().updateDeck({ ...deck, [zone]: arr })
  },
}))
