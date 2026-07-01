"use client"

import { YgoCard } from "@/types"

export interface FieldPlacement {
  zone: string
  card: YgoCard
}

interface Props {
  placements: FieldPlacement[]
  highlightZone?: string
  showOpponent?: boolean
}

function ZoneSlot({
  zone,
  placement,
  highlight,
  label,
  color = "border-border",
  size = "w-[52px] h-14",
}: {
  zone: string
  placement?: FieldPlacement
  highlight: boolean
  label: string
  color?: string
  size?: string
}) {
  return (
    <div
      title={zone}
      className={`relative flex items-center justify-center rounded border text-[8px] font-medium text-center leading-tight select-none transition-colors shrink-0
        ${size}
        ${highlight ? "ring-2 ring-yellow-400 border-yellow-400 bg-yellow-400/10" : `${color} bg-card`}
        ${placement ? "border-solid" : "border-dashed opacity-70"}`}
    >
      {placement ? (
        <img
          src={placement.card.card_images[0].image_url_small}
          alt={placement.card.name}
          className="absolute inset-0 h-full w-full rounded object-cover"
        />
      ) : (
        <span className="text-muted-foreground px-0.5 leading-snug">{label}</span>
      )}
    </div>
  )
}

function PlayerSide({
  prefix,
  placements,
  highlightZone,
  flipped = false,
}: {
  prefix: string
  placements: FieldPlacement[]
  highlightZone?: string
  flipped?: boolean
}) {
  const byZone = Object.fromEntries(placements.map((p) => [p.zone, p]))

  const s = (zone: string, label: string, color?: string, size?: string) => (
    <ZoneSlot
      key={zone}
      zone={zone}
      placement={byZone[zone]}
      highlight={highlightZone === zone}
      label={label}
      color={color}
      size={size}
    />
  )

  const row1 = (
    <div className="flex gap-1.5 items-center justify-center">
      {s(`${prefix}Side Deck`, "Side\nDeck", "border-amber-400/60", "w-12 h-[50px]")}
      <div className="w-3" />
      {s(`${prefix}Extra Monster Zone 1`, "EMZ 1", "border-sky-400/70", "w-[52px] h-14")}
      <div className="w-6 text-center text-[9px] text-muted-foreground font-bold leading-none">YGO</div>
      {s(`${prefix}Extra Monster Zone 2`, "EMZ 2", "border-sky-400/70", "w-[52px] h-14")}
      <div className="w-3" />
      {s(`${prefix}Banished`, "Banished", "border-zinc-400/60", "w-12 h-[50px]")}
    </div>
  )

  const row2 = (
    <div className="flex gap-1.5 items-center justify-center">
      {s(`${prefix}Field Zone`, "Field\nZone", "border-green-400/70", "w-[52px] h-14")}
      {[1,2,3,4,5].map((n) => s(`${prefix}Monster Zone ${n}`, `M${n}`, "border-amber-400/60", "w-[52px] h-14"))}
      {s(`${prefix}Graveyard`, "GY", "border-zinc-400/60", "w-[52px] h-14")}
    </div>
  )

  const row3 = (
    <div className="flex gap-1.5 items-center justify-center">
      {s(`${prefix}Extra Deck`, "Extra\nDeck", "border-purple-400/70", "w-[52px] h-14")}
      {[1,2,3,4,5].map((n) => s(`${prefix}Spell/Trap Zone ${n}`, `ST${n}`, "border-teal-400/60", "w-[52px] h-14"))}
      {s(`${prefix}Deck`, "Deck", "border-red-400/60", "w-[52px] h-14")}
    </div>
  )

  const rows = flipped ? [row3, row2, row1] : [row1, row2, row3]

  return (
    <div className={`flex flex-col gap-1.5 ${flipped ? "rotate-180" : ""}`}>
      {rows[0]}
      {rows[1]}
      {rows[2]}
    </div>
  )
}

export default function FieldBoard({ placements, highlightZone, showOpponent = false }: Props) {
  const yourPlacements = placements.filter((p) => !p.zone.startsWith("Opp:"))
  const oppPlacements = placements.filter((p) => p.zone.startsWith("Opp:")).map((p) => ({ ...p, zone: p.zone.slice(4) }))

  return (
    <div className="w-full rounded-xl border bg-muted/20 p-3 overflow-x-auto">
      <div className="flex flex-col gap-2 min-w-[480px]">
        {showOpponent && (
          <>
            <p className="text-[10px] text-center text-muted-foreground">Opponent</p>
            <PlayerSide
              prefix="Opp:"
              placements={oppPlacements}
              highlightZone={highlightZone?.startsWith("Opp:") ? highlightZone.slice(4) : undefined}
              flipped
            />
            <div className="border-t border-dashed border-border my-1" />
          </>
        )}
        <p className="text-[10px] text-center text-muted-foreground">Your side</p>
        <PlayerSide
          prefix=""
          placements={yourPlacements}
          highlightZone={highlightZone}
        />
      </div>
    </div>
  )
}
