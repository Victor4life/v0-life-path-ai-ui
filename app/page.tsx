"use client"

import { useState } from "react"
import HomePage from "@/components/pages/home-page"
import AssessmentPage from "@/components/pages/assessment-page"
import ResultsPage from "@/components/pages/results-page"
import PlanPage from "@/components/pages/plan-page"
import CompanionPage from "@/components/pages/companion-page"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"

export default function Page() {
  const [currentPage, setCurrentPage] = useState("home")
  const [assessmentData, setAssessmentData] = useState(null)
  const [resultsData, setResultsData] = useState(null)
  const { language } = useLanguage()
  const { setThemeFromMood } = useTheme()

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page)
    if (data) {
      if (page === "results") {
        setResultsData(data)
        if (data.emotional_state) {
          setThemeFromMood(data.emotional_state)
        }
      }
    }
  }

  const handleAssessmentSubmit = async (data: any) => {
    setAssessmentData(data)

    let transcription = ""
    if (data.voiceNote) {
      const formData = new FormData()
      formData.append("audio", data.voiceNote)

      try {
        const response = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        })
        const transcriptData = await response.json()
        transcription = transcriptData.transcription || ""
      } catch (error) {
        console.error("[v0] Transcription failed:", error)
      }
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: data,
          transcription,
          language,
        }),
      })
      const analysisResults = await response.json()
      handleNavigate("results", analysisResults)
    } catch (error) {
      console.error("[v0] Analysis failed:", error)
    }
  }

  const handleGeneratePlan = async () => {
    if (!resultsData) return

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clarity_summary: (resultsData as any).clarity_summary,
          root_causes: (resultsData as any).root_causes,
          priority_actions: (resultsData as any).priority_actions,
          language,
        }),
      })
      const planData = await response.json()
      handleNavigate("plan", { ...resultsData, ...planData })
    } catch (error) {
      console.error("[v0] Plan generation failed:", error)
    }
  }

  const handleStartOver = () => {
    setAssessmentData(null)
    setResultsData(null)
    setCurrentPage("home")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      {currentPage !== "home" && (
        <div className="fixed top-4 right-4 z-50">
          <LanguageSelector />
        </div>
      )}
      {currentPage === "home" && <HomePage onStartAssessment={() => handleNavigate("assessment")} />}
      {currentPage === "assessment" && (
        <AssessmentPage onSubmit={handleAssessmentSubmit} onBack={() => handleNavigate("home")} />
      )}
      {currentPage === "results" && (
        <ResultsPage data={resultsData} onGeneratePlan={handleGeneratePlan} onStartOver={handleStartOver} />
      )}
      {currentPage === "plan" && (
        <PlanPage
          data={resultsData}
          onOpenCompanion={() => handleNavigate("companion")}
          onBack={() => handleNavigate("results")}
        />
      )}
      {currentPage === "companion" && <CompanionPage onReturnToPlan={() => handleNavigate("plan")} />}
    </main>
  )
}
