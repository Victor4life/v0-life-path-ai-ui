"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ResultsPage({
  data,
  onGeneratePlan,
  onStartOver,
}: {
  data: any
  onGeneratePlan: () => void
  onStartOver: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col px-4 py-12">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-foreground mb-12 text-center">Your Life Analysis</h1>

        {/* Clarity Summary */}
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 border-0 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">Clarity Summary</h2>
          <p className="text-foreground/80 leading-relaxed">{data?.clarity_summary || "Loading your summary..."}</p>
        </Card>

        {/* Emotional Diagnosis */}
        <Card className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 border-0 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">Emotional State</h2>
          <p className="text-foreground/80 leading-relaxed">
            {data?.emotional_state || "Analyzing your emotional state..."}
          </p>
        </Card>

        {/* Root Cause Analysis */}
        <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/20 border-0 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">Root Causes</h2>
          {data?.root_causes && data.root_causes.length > 0 ? (
            <ul className="space-y-3 text-foreground/80">
              {data.root_causes.map((cause: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-primary">•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-foreground/80">Identifying root causes...</p>
          )}
        </Card>

        {/* Your Strengths */}
        <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-0 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">Your Strengths</h2>
          {data?.strengths && data.strengths.length > 0 ? (
            <ul className="space-y-3 text-foreground/80">
              {data.strengths.map((strength: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-primary">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-foreground/80">Identifying your strengths...</p>
          )}
        </Card>

        {/* Priority Actions */}
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-0 mb-12 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">Priority Actions</h2>
          {data?.priority_actions && data.priority_actions.length > 0 ? (
            <ul className="space-y-3 text-foreground/80">
              {data.priority_actions.map((action: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-primary">{i + 1}.</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-foreground/80">Generating priority actions...</p>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button
            onClick={onGeneratePlan}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-lg"
          >
            Generate My 30-Day Plan
          </Button>
          <Button onClick={onStartOver} variant="outline" className="flex-1 py-6 text-lg rounded-lg bg-transparent">
            Start Over
          </Button>
        </div>
      </div>
    </div>
  )
}
