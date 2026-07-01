"use client"

import { Combo } from "@/types"
import { useReplayState } from "@/hooks/useReplayState"
import FieldBoard from "./FieldBoard"
import StepAnnotation from "./StepAnnotation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

interface Props {
  combo: Combo
}

export default function ReplayPlayer({ combo }: Props) {
  const { step, stepIndex, total, fieldState, next, prev, reset } = useReplayState(combo)

  if (total === 0) return <p className="text-sm text-muted-foreground">Add steps in the Edit tab to see the replay.</p>

  const progress = ((stepIndex + 1) / total) * 100

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <FieldBoard placements={fieldState} highlightZone={step?.toZone} showOpponent />

      {step && <StepAnnotation step={step} stepIndex={stepIndex} />}

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={reset}><RotateCcw size={15} /></Button>
        <Button variant="outline" size="icon" onClick={prev} disabled={stepIndex === 0}><ChevronLeft size={15} /></Button>
        <Button variant="outline" size="icon" onClick={next} disabled={stepIndex === total - 1}><ChevronRight size={15} /></Button>
        <span className="text-sm text-muted-foreground ml-2">Step {stepIndex + 1} of {total}</span>
      </div>
    </div>
  )
}
