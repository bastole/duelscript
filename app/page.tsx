import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-5xl font-bold tracking-tight">DuelScript</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Build Yu-Gi-Oh! decks and script your combo lines — step by step, on the real field.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/cards" className={cn(buttonVariants({ size: "lg" }))}>Browse cards</Link>
        <Link href="/decks" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>My decks</Link>
        <Link href="/combos" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>My combos</Link>
      </div>
    </main>
  )
}
