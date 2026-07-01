import { create } from "zustand"
import { YgoCard } from "@/types"
import { searchCards } from "@/lib/ygopro"

interface CardStore {
  results: YgoCard[]
  loading: boolean
  error: string | null
  search: (query: string) => Promise<void>
  clear: () => void
}

export const useCardStore = create<CardStore>((set) => ({
  results: [],
  loading: false,
  error: null,
  search: async (query) => {
    set({ loading: true, error: null })
    const results = await searchCards(query)
    set({ results, loading: false })
  },
  clear: () => set({ results: [], error: null }),
}))
