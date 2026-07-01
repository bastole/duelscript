# DuelScript — Dev Log

## 2026-07-01 — Initial Build

### What we built today

Full working app from scratch. Everything below is live on the repo at [github.com/bastole/duelscript](https://github.com/bastole/duelscript).

---

### Stack

- **Next.js 16** (App Router, TypeScript, no src/ dir)
- **Tailwind CSS v4** + **shadcn/ui** (base-ui version — no `asChild` prop on Button, use `buttonVariants` + `<Link>` instead)
- **Zustand** — state management (decks, combos, card search)
- **dnd-kit** — drag and drop in deck builder and combo step list
- **Framer Motion** — card hover animations + combo replay fade
- **YGOPRODeck API** — free, no key needed: `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=<query>`

---

### Pages built

| Route | What it does |
|---|---|
| `/` | Home with links to Cards, Decks, Combos |
| `/cards` | Search cards by name, shows real card art + click for full details |
| `/decks` | List saved decks, create/delete |
| `/deck/[id]` | Deck builder — search sidebar + 3 zones (Main/Extra/Side), drag to reorder, click card to zoom |
| `/combos` | List saved combos, create/delete |
| `/combo/[id]` | Combo editor (Edit tab) + step-by-step replay on real YGO field (Replay tab) |

---

### Files & structure

```
app/
  page.tsx                  — Home
  layout.tsx                — Root layout with Navbar
  cards/page.tsx            — Card browser
  decks/page.tsx            — Deck list
  deck/[id]/page.tsx        — Deck builder
  combos/page.tsx           — Combo list
  combo/[id]/page.tsx       — Combo editor + replay

components/
  Navbar.tsx                — Sticky top nav
  CardTile.tsx              — Card thumbnail with hover scale (Framer Motion)
  CardModal.tsx             — Full card details dialog (shadcn Dialog)
  DeckZone.tsx              — dnd-kit droppable zone (Main/Extra/Side)
  DeckCardSlot.tsx          — Draggable card slot, click to zoom, X to remove
  DeckSidebar.tsx           — Card search sidebar for deck builder
  ExportImport.tsx          — Export deck as JSON / import from JSON file
  ComboStepForm.tsx         — Add/edit a combo step (card search + action + zones + note)
  ComboStepList.tsx         — Draggable step list with edit (pencil) and delete icons
  FieldBoard.tsx            — Real YGO field layout (both sides), CSS grid
  ReplayPlayer.tsx          — Steps through combo on the field with Prev/Next
  StepAnnotation.tsx        — Shows current step action + card + zones + note (animated)
  ZoneSelector.tsx          — shadcn Select for all YGO zones + actions

hooks/
  useReplayState.ts         — Tracks current step index, derives fieldState from steps 0→current

lib/
  ygopro.ts                 — searchCards(query) — calls YGOPRODeck API
  storage.ts                — loadDecks/saveDecks/loadCombos/saveCombos (localStorage) + exportDeck/importDeck

store/
  useCardStore.ts           — Zustand: card search results, loading, error
  useDeckStore.ts           — Zustand: deck CRUD, addCard (auto-detects main/extra), removeCard, limits
  useComboStore.ts          — Zustand: combo CRUD, addStep, updateStep, deleteStep, reorderSteps

types/
  index.ts                  — YgoCard, Deck, ComboStep, Combo
```

---

### Key decisions & gotchas

- **shadcn Button has no `asChild`** in this version (uses `@base-ui/react/button`). Use `<Link className={cn(buttonVariants({ variant, size }))}>` instead.
- **`Select.onValueChange`** passes `string | null`, not `string` — state must be typed accordingly.
- **Auto zone detection** in `useDeckStore.addCard`: Fusion/Synchro/XYZ/Link monsters go to Extra Deck automatically.
- **Extra Deck card images** use `image_url_small` from the API — they're CDN URLs, no local storage needed.
- **Replay field state** is derived by walking steps 0→currentStep and moving cards between zones in a Map. Zones in `GRAVEYARD_ZONES` (GY, Banished, Deck, Extra Deck) don't render on the field.
- **Opponent zones** are prefixed `Opp:` (e.g. `Opp:Monster Zone 1`). The field board strips the prefix and renders them on the top half (rotated 180°).

---

### YGO field layout (correct as of 2026)

```
Top row:    Side Deck | EMZ 1 | [center] | EMZ 2 | Banished
Middle row: Field Zone | Monster 1-5 | Graveyard
Bottom row: Extra Deck | S/T 1-5 | Deck
```

Both sides shown in replay — opponent's side is the mirror on top (CSS `rotate-180`). Your side is on the bottom.

---

### Features shipped

1. **Card browser** — search any card, see full art + ATK/DEF/desc in modal
2. **Deck builder** — drag/drop cards between Main/Extra/Side, 60/15/15 limits, export/import JSON, click any card to zoom
3. **Combo editor** — add steps (card + action + from/to zone + note), reorder by drag, edit existing steps (pencil icon pre-fills form), delete steps
4. **Combo replay** — step through combo one action at a time, real YGO field updates to show where cards are, current step highlighted in yellow

---

### What's next (ideas)

- [ ] Filter cards by type (Monster/Spell/Trap) or attribute in the card browser
- [ ] Show card count stats on the deck builder (e.g. how many monsters vs spells)
- [ ] Link a combo to a specific deck so you can pull cards from it
- [ ] Export combo as a shareable image or PDF
- [ ] Opponent interaction steps in combos (e.g. "Opponent activates Ash Blossom")
- [ ] Keyboard shortcuts for replay (← → arrow keys)
- [ ] Dark mode toggle (Tailwind already supports it)
