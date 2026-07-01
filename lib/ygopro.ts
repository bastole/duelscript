import { YgoCard } from "@/types"

export async function searchCards(query: string): Promise<YgoCard[]> {
  if (!query.trim()) return []
  try {
    const res = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(query)}`
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.data as YgoCard[]
  } catch {
    return []
  }
}

export async function getCardById(id: number): Promise<YgoCard | null> {
  try {
    const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.data[0] as YgoCard
  } catch {
    return null
  }
}
