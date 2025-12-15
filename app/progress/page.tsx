"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"

interface ProgressItem {
  day_number: number
  completed: boolean
  notes?: string
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressItem[]>([])
  const [planId, setPlanId] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [notes, setNotes] = useState("")

  useEffect(() => {
    // TODO: Get plan_id from localStorage or context
    const storedPlanId = localStorage.getItem("current_plan_id")
    if (storedPlanId) {
      setPlanId(storedPlanId)
      fetchProgress(storedPlanId)
    }
  }, [])

  const fetchProgress = async (id: string) => {
    try {
      const response = await fetch(`/api/progress?plan_id=${id}`)
      const data = await response.json()
      setProgress(data.progress || [])
    } catch (error) {
      console.error("[v0] Failed to fetch progress:", error)
    }
  }

  const toggleDay = async (dayNumber: number, completed: boolean) => {
    if (!planId) return

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_id: planId,
          day_number: dayNumber,
          completed,
          notes: notes || null,
        }),
      })
      fetchProgress(planId)
      setSelectedDay(null)
      setNotes("")
    } catch (error) {
      console.error("[v0] Failed to update progress:", error)
    }
  }

  const getDayProgress = (dayNumber: number) => {
    return progress.find((p) => p.day_number === dayNumber)
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">30-Day Progress</h1>
          <p className="text-foreground/60">Track your transformation journey day by day</p>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-8">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const dayProgress = getDayProgress(day)
            const isCompleted = dayProgress?.completed || false

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                  isCompleted
                    ? "bg-primary text-primary-foreground shadow-md"
                    : selectedDay === day
                      ? "bg-accent border-2 border-primary"
                      : "bg-white/60 hover:bg-accent"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : day}
              </button>
            )
          })}
        </div>

        {selectedDay && (
          <Card className="p-6 bg-white/60 backdrop-blur-sm border-0">
            <h2 className="text-2xl font-bold mb-4">Day {selectedDay}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`day-${selectedDay}`}
                  checked={getDayProgress(selectedDay)?.completed || false}
                  onCheckedChange={(checked) => toggleDay(selectedDay, checked as boolean)}
                />
                <label htmlFor={`day-${selectedDay}`} className="text-base font-medium cursor-pointer">
                  Mark as completed
                </label>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Notes (optional)</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did today go? Any reflections?"
                  className="min-h-24 rounded-lg"
                />
              </div>
              <Button onClick={() => toggleDay(selectedDay, true)} className="w-full rounded-lg py-6">
                Save Progress
              </Button>
            </div>
          </Card>
        )}

        <div className="mt-8 text-center">
          <p className="text-foreground/60">{progress.filter((p) => p.completed).length} of 30 days completed</p>
        </div>
      </div>
    </div>
  )
}
