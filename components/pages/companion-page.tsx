"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function CompanionPage({ onReturnToPlan }: { onReturnToPlan: () => void }) {
  const [dayNumber, setDayNumber] = useState(1)
  const [dayData, setDayData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { language } = useLanguage()

  const fetchDailyGuidance = async (day: number) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          date: new Date().toLocaleDateString(),
          language,
        }),
      })
      const data = await response.json()
      setDayData(data)
    } catch (error) {
      console.error("[v0] Failed to fetch daily guidance:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDailyGuidance(dayNumber)
  }, [dayNumber])

  const handleNextDay = () => {
    if (dayNumber < 30) {
      setDayNumber(dayNumber + 1)
    }
  }

  const handlePreviousDay = () => {
    if (dayNumber > 1) {
      setDayNumber(dayNumber - 1)
    }
  }

  if (isLoading || !dayData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/60">Loading your daily guidance...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-12">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-foreground">Day {dayNumber} of 30</h1>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${(dayNumber / 30) * 100}%` }} />
          </div>
        </div>

        {/* Micro-Goal */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-0 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Micro-Goal of the Day</h3>
          <p className="text-foreground/80">{dayData.micro_goal}</p>
        </Card>

        {/* Micro-Task */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Micro-Task (5 minutes)</h3>
          <p className="text-foreground/80">{dayData.micro_task}</p>
        </Card>

        {/* Motivation Boost */}
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/20 border-0 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Motivation Boost</h3>
          <p className="text-lg text-foreground/80 italic">"{dayData.motivation}"</p>
        </Card>

        {/* Reflection Prompt */}
        <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Reflection Prompt</h3>
          <p className="text-foreground/80 mb-4">{dayData.reflection_prompt}</p>
          <textarea
            placeholder="Write your reflection here..."
            className="w-full p-4 rounded-lg bg-white/80 border border-border focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
          />
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button
            onClick={handlePreviousDay}
            disabled={dayNumber === 1}
            variant="outline"
            className="flex-1 py-6 rounded-lg bg-transparent disabled:opacity-50"
          >
            Previous Day
          </Button>
          <Button
            onClick={handleNextDay}
            disabled={dayNumber === 30}
            className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground py-6 rounded-lg"
          >
            {dayNumber === 30 ? "Transformation Complete!" : "Next Day"}
          </Button>
        </div>
        <Button onClick={onReturnToPlan} variant="outline" className="w-full mt-4 py-6 rounded-lg bg-transparent">
          Return to Plan
        </Button>
      </div>
    </div>
  )
}
