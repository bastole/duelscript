"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import { useComboStore } from "@/store/useComboStore"
import { ComboStep } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ComboStepList from "@/components/ComboStepList"
import ComboStepForm from "@/components/ComboStepForm"
import ReplayPlayer from "@/components/ReplayPlayer"

export default function ComboEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { combos, load, addStep, updateStep, deleteStep, reorderSteps } = useComboStore()
  const [editingStep, setEditingStep] = useState<ComboStep | null>(null)
  useEffect(() => { load() }, [load])

  const combo = combos.find((c) => c.id === id)
  if (!combo) return <div className="p-8 text-muted-foreground">Combo not found.</div>

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-xl font-bold">{combo.name}</h1>
      <Tabs defaultValue="edit">
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="replay">Replay</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="flex flex-col gap-4">
          <ComboStepList
            steps={combo.steps}
            editingStepId={editingStep?.id}
            onDelete={(stepId) => { deleteStep(id, stepId); if (editingStep?.id === stepId) setEditingStep(null) }}
            onEdit={setEditingStep}
            onReorder={(steps) => reorderSteps(id, steps)}
          />
          <ComboStepForm
            onAdd={(step) => addStep(id, step)}
            editingStep={editingStep}
            onUpdate={(step) => { updateStep(id, step); setEditingStep(null) }}
            onCancelEdit={() => setEditingStep(null)}
          />
        </TabsContent>

        <TabsContent value="replay">
          <ReplayPlayer combo={combo} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
