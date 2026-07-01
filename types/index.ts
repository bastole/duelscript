export interface YgoCard {
  id: number
  name: string
  type: string
  desc: string
  atk?: number
  def?: number
  level?: number
  race: string
  attribute?: string
  card_images: { id: number; image_url: string; image_url_small: string }[]
}

export interface Deck {
  id: string
  name: string
  mainDeck: YgoCard[]
  extraDeck: YgoCard[]
  sideDeck: YgoCard[]
}

export interface ComboStep {
  id: string
  cardId: number
  cardName: string
  cardImageSmall: string
  action: string
  fromZone: string
  toZone: string
  note: string
}

export interface Combo {
  id: string
  name: string
  deckId?: string
  steps: ComboStep[]
}
