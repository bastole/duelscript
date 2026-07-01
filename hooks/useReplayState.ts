import { useState, useMemo } from "react"
import { Combo, ComboStep } from "@/types"
import { FieldPlacement } from "@/components/FieldBoard"

const GRAVEYARD_ZONES = new Set(["Graveyard", "Banished", "Deck", "Extra Deck"])

function deriveFieldState(steps: ComboStep[], upToIndex: number): FieldPlacement[] {
  const field: Map<string, FieldPlacement> = new Map()

  for (let i = 0; i <= upToIndex; i++) {
    const step = steps[i]
    if (!step) continue
    const card = { id: step.cardId, name: step.cardName, card_images: [{ id: step.cardId, image_url: step.cardImageSmall, image_url_small: step.cardImageSmall }], type: "", desc: "", race: "" }

    field.delete(step.fromZone)
    if (!GRAVEYARD_ZONES.has(step.toZone)) {
      field.set(step.toZone, { zone: step.toZone, card: card as never })
    }
  }

  return Array.from(field.values())
}

export function useReplayState(combo: Combo) {
  const [currentStep, setCurrentStep] = useState(0)
  const total = combo.steps.length

  const fieldState = useMemo(
    () => deriveFieldState(combo.steps, currentStep),
    [combo.steps, currentStep]
  )

  return {
    step: combo.steps[currentStep] ?? null,
    stepIndex: currentStep,
    total,
    fieldState,
    next: () => setCurrentStep((i) => Math.min(i + 1, total - 1)),
    prev: () => setCurrentStep((i) => Math.max(i - 1, 0)),
    goTo: (i: number) => setCurrentStep(Math.max(0, Math.min(i, total - 1))),
    reset: () => setCurrentStep(0),
  }
}
