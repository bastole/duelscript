"use client"

import { ComboStep } from "@/types"
import { Trash2, GripVertical, Pencil } from "lucide-react"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function StepRow({
  step,
  index,
  onDelete,
  onEdit,
  isEditing,
}: {
  step: ComboStep
  index: number
  onDelete: () => void
  onEdit: (step: ComboStep) => void
  isEditing: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: step.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2 rounded-lg border bg-card px-3 py-2 transition-colors ${isEditing ? "border-primary bg-primary/5" : ""}`}
    >
      <button {...attributes} {...listeners} className="mt-1 cursor-grab text-muted-foreground">
        <GripVertical size={14} />
      </button>
      <span className="mt-1 text-xs font-bold text-muted-foreground w-5 shrink-0">{index + 1}.</span>
      <img src={step.cardImageSmall} alt="" className="h-10 w-7 rounded object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{step.cardName}</p>
        <p className="text-xs text-muted-foreground">
          <span className="text-foreground">{step.action}</span> · {step.fromZone} → {step.toZone}
        </p>
        {step.note && <p className="text-xs text-muted-foreground mt-0.5 italic">{step.note}</p>}
      </div>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onEdit(step)}
        className="mt-1 text-muted-foreground hover:text-foreground"
        title="Edit step"
      >
        <Pencil size={13} />
      </button>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onDelete}
        className="mt-1 text-muted-foreground hover:text-destructive"
        title="Delete step"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

interface Props {
  steps: ComboStep[]
  editingStepId?: string | null
  onDelete: (id: string) => void
  onEdit: (step: ComboStep) => void
  onReorder: (steps: ComboStep[]) => void
}

export default function ComboStepList({ steps, editingStepId, onDelete, onEdit, onReorder }: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = steps.findIndex((s) => s.id === active.id)
    const newIdx = steps.findIndex((s) => s.id === over.id)
    onReorder(arrayMove(steps, oldIdx, newIdx))
  }

  if (steps.length === 0) return <p className="text-sm text-muted-foreground">No steps yet. Add one below.</p>

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {steps.map((step, i) => (
            <StepRow
              key={step.id}
              step={step}
              index={i}
              isEditing={editingStepId === step.id}
              onDelete={() => onDelete(step.id)}
              onEdit={onEdit}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
