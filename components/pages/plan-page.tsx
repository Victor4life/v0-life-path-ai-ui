"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function PlanPage({
  data,
  onOpenCompanion,
  onBack,
}: {
  data: any
  onOpenCompanion: () => void
  onBack: () => void
}) {
  const { language } = useLanguage()

  const handleExportPDF = async () => {
    try {
      const response = await fetch("/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: {
            weekly_goals: data.weekly_goals,
            daily_tasks: data.daily_tasks,
            habits_to_build: data.habits_to_build,
            habits_to_break: data.habits_to_break,
            motivation_message: data.motivation_message,
            future_self_message: data.future_self_message,
          },
          userName: "User",
        }),
      })

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "30-day-plan.pdf"
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] PDF export failed:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-12">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-foreground mb-2 text-center">Your 30-Day Transformation Plan</h1>
        <p className="text-center text-foreground/60 mb-12">A personalized roadmap designed specifically for you</p>

        {/* Week-by-Week Roadmap */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Week-by-Week Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.weekly_goals &&
              Object.entries(data.weekly_goals).map(([week, goal], idx) => (
                <Card
                  key={idx}
                  className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0 hover:shadow-lg transition-shadow"
                >
                  <p className="text-sm font-semibold text-primary mb-2">Week {idx + 1}</p>
                  <p className="text-foreground/80">{goal as string}</p>
                </Card>
              ))}
          </div>
        </div>

        {/* Daily Tasks */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Daily Tasks (30 Days)</h2>
          <Card className="p-8 bg-white/60 backdrop-blur-sm border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.daily_tasks?.slice(0, 10).map((task: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{task}</p>
                </div>
              ))}
            </div>
            {data?.daily_tasks?.length > 10 && (
              <p className="text-center text-foreground/60 mt-4 text-sm">
                + {data.daily_tasks.length - 10} more tasks (see full plan in PDF)
              </p>
            )}
          </Card>
        </div>

        {/* Habit Plan */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Habit Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-0">
              <h3 className="text-xl font-bold text-foreground mb-4">Habits to Break</h3>
              <ul className="space-y-2 text-foreground/70">
                {data?.habits_to_break?.map((habit: string, i: number) => (
                  <li key={i}>• {habit}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-0">
              <h3 className="text-xl font-bold text-foreground mb-4">Habits to Build</h3>
              <ul className="space-y-2 text-foreground/70">
                {data?.habits_to_build?.map((habit: string, i: number) => (
                  <li key={i}>• {habit}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Motivation Message */}
        <div className="mb-12">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-0">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Motivation</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">{data?.motivation_message}</p>
          </Card>
        </div>

        {/* Message from Future Self */}
        <div className="mb-12">
          <Card className="p-8 bg-gradient-to-r from-accent/10 to-secondary/10 border-0">
            <h2 className="text-2xl font-bold text-foreground mb-4">Message from Your Future Self</h2>
            <p className="text-lg text-foreground/80 leading-relaxed italic">{data?.future_self_message}</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button
            onClick={onOpenCompanion}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-lg"
          >
            Open Daily AI Companion
          </Button>
          <Button onClick={onBack} variant="outline" className="flex-1 py-6 text-lg rounded-lg bg-transparent">
            Back to Results
          </Button>
          <Button onClick={handleExportPDF} variant="outline" className="flex-1 py-6 text-lg rounded-lg bg-transparent">
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
