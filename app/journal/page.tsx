"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"

interface JournalInsight {
  emotional_tone: string
  patterns: string[]
  insights: string
  advice: string
}

export default function JournalPage() {
  const [entry, setEntry] = useState("")
  const [insight, setInsight] = useState<JournalInsight | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeEntry = async () => {
    if (!entry.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/journal-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry }),
      })
      const data = await response.json()
      setInsight(data)
    } catch (error) {
      console.error("[v0] Failed to analyze journal:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const newEntry = () => {
    setEntry("")
    setInsight(null)
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">AI Journal</h1>
          <p className="text-foreground/60">Write freely and receive compassionate insights</p>
        </div>

        <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 mb-6">
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="What's on your mind today? Write freely about your thoughts, feelings, and experiences..."
            className="min-h-48 rounded-lg mb-4 text-base"
            disabled={isAnalyzing}
          />
          <Button onClick={analyzeEntry} disabled={isAnalyzing || !entry.trim()} className="w-full rounded-lg py-6">
            <Sparkles className="w-5 h-5 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Get Insights"}
          </Button>
        </Card>

        {insight && (
          <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground/70 mb-2">Emotional Tone</h3>
              <p className="text-foreground">{insight.emotional_tone}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 mb-2">Patterns Noticed</h3>
              <ul className="space-y-2">
                {insight.patterns.map((pattern, i) => (
                  <li key={i} className="text-foreground flex gap-2">
                    <span className="text-primary">•</span>
                    {pattern}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 mb-2">Insights</h3>
              <p className="text-foreground">{insight.insights}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 mb-2">Guidance</h3>
              <p className="text-foreground">{insight.advice}</p>
            </div>

            <Button onClick={newEntry} variant="outline" className="w-full rounded-lg py-6 bg-transparent">
              Write New Entry
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
