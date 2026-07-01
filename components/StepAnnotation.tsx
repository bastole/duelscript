"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ComboStep } from "@/types"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface Props {
  step: ComboStep
  stepIndex: number
}

export default function StepAnnotation({ step, stepIndex }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="rounded-lg border bg-card p-4 flex gap-4 items-start"
      >
        <img
          src={step.cardImageSmall}
          alt={step.cardName}
          className="h-16 w-11 rounded object-cover border border-border shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge>{step.action}</Badge>
            <span className="font-medium text-sm truncate">{step.cardName}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{step.fromZone}</span>
            <ArrowRight size={12} />
            <span>{step.toZone}</span>
          </div>
          {step.note && (
            <p className="mt-1.5 text-xs text-muted-foreground italic">{step.note}</p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
