"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const ALL_ZONES = [
  "Hand",
  "Deck",
  "Extra Deck",
  "Side Deck",
  "Field Zone",
  "Monster Zone 1",
  "Monster Zone 2",
  "Monster Zone 3",
  "Monster Zone 4",
  "Monster Zone 5",
  "Extra Monster Zone 1",
  "Extra Monster Zone 2",
  "Spell/Trap Zone 1",
  "Spell/Trap Zone 2",
  "Spell/Trap Zone 3",
  "Spell/Trap Zone 4",
  "Spell/Trap Zone 5",
  "Graveyard",
  "Banished",
  "Opp:Hand",
  "Opp:Monster Zone 1",
  "Opp:Monster Zone 2",
  "Opp:Monster Zone 3",
  "Opp:Monster Zone 4",
  "Opp:Monster Zone 5",
  "Opp:Extra Monster Zone 1",
  "Opp:Extra Monster Zone 2",
  "Opp:Graveyard",
  "Opp:Banished",
]

export const COMBO_ACTIONS = [
  "Normal Summon",
  "Special Summon",
  "Tribute Summon",
  "Activate",
  "Set",
  "Equip",
  "Chain",
  "Search",
  "Draw",
  "Send to GY",
  "Banish",
  "Add to Hand",
  "Return to Deck",
  "Attach as Material",
  "Detach Material",
  "Tribute",
  "Flip",
]

interface Props {
  value: string | null
  onChange: (val: string | null) => void
  placeholder?: string
  options?: string[]
}

export default function ZoneSelector({ value, onChange, placeholder = "Select zone", options = ALL_ZONES }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((z) => (
          <SelectItem key={z} value={z}>{z}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
