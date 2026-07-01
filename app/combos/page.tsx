"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useComboStore } from "@/store/useComboStore"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CombosPage() {
  const { combos, load, createCombo, deleteCombo } = useComboStore()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => { load() }, [load])

  const handleCreate = () => {
    if (!name.trim()) return
    createCombo(name.trim())
    setName("")
    setOpen(false)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My combos</h1>
        <Button onClick={() => setOpen(true)}>New combo</Button>
      </div>

      {combos.length === 0 && (
        <p className="text-muted-foreground">No combos yet. Create one to start scripting plays.</p>
      )}

      <div className="flex flex-col gap-3">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
          >
            <div>
              <p className="font-medium">{combo.name}</p>
              <p className="text-xs text-muted-foreground">{combo.steps.length} steps</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/combo/${combo.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Edit</Link>
              <Button variant="destructive" size="sm" onClick={() => deleteCombo(combo.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New combo</DialogTitle>
          </DialogHeader>
          <input
            autoFocus
            type="text"
            placeholder="Combo name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button onClick={handleCreate} disabled={!name.trim()}>
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
