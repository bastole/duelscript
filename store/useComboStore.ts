import { create } from "zustand"
import { Combo, ComboStep } from "@/types"
import { loadCombos, saveCombos } from "@/lib/storage"

interface ComboStore {
  combos: Combo[]
  loaded: boolean
  load: () => void
  createCombo: (name: string, deckId?: string) => Combo
  deleteCombo: (id: string) => void
  updateCombo: (combo: Combo) => void
  addStep: (comboId: string, step: Omit<ComboStep, "id">) => void
  updateStep: (comboId: string, step: ComboStep) => void
  deleteStep: (comboId: string, stepId: string) => void
  reorderSteps: (comboId: string, steps: ComboStep[]) => void
}

export const useComboStore = create<ComboStore>((set, get) => ({
  combos: [],
  loaded: false,
  load: () => {
    if (get().loaded) return
    set({ combos: loadCombos(), loaded: true })
  },
  createCombo: (name, deckId) => {
    const combo: Combo = { id: crypto.randomUUID(), name, deckId, steps: [] }
    const combos = [...get().combos, combo]
    set({ combos })
    saveCombos(combos)
    return combo
  },
  deleteCombo: (id) => {
    const combos = get().combos.filter((c) => c.id !== id)
    set({ combos })
    saveCombos(combos)
  },
  updateCombo: (combo) => {
    const combos = get().combos.map((c) => (c.id === combo.id ? combo : c))
    set({ combos })
    saveCombos(combos)
  },
  addStep: (comboId, step) => {
    const combo = get().combos.find((c) => c.id === comboId)
    if (!combo) return
    const newStep: ComboStep = { ...step, id: crypto.randomUUID() }
    get().updateCombo({ ...combo, steps: [...combo.steps, newStep] })
  },
  updateStep: (comboId, step) => {
    const combo = get().combos.find((c) => c.id === comboId)
    if (!combo) return
    get().updateCombo({ ...combo, steps: combo.steps.map((s) => (s.id === step.id ? step : s)) })
  },
  deleteStep: (comboId, stepId) => {
    const combo = get().combos.find((c) => c.id === comboId)
    if (!combo) return
    get().updateCombo({ ...combo, steps: combo.steps.filter((s) => s.id !== stepId) })
  },
  reorderSteps: (comboId, steps) => {
    const combo = get().combos.find((c) => c.id === comboId)
    if (!combo) return
    get().updateCombo({ ...combo, steps })
  },
}))
