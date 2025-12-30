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
import { toast } from "react-toastify"

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
    toast.info("Processing your assessment...", { autoClose: 2000 })

    let transcription = ""
    if (data.voiceNote) {
      try {
        const formData = new FormData()
        formData.append("audio", data.voiceNote)

        const response = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        })
        const transcriptData = await response.json()
        transcription = transcriptData.transcription || ""
        toast.success("Voice transcription completed", { autoClose: 2000 })
      } catch (error) {
        console.error("[v0] Transcription failed:", error)
        toast.warning("Voice transcription skipped", { autoClose: 2000 })
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

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze")
      }

      const analysisResults = await response.json()
      toast.success("Analysis complete!", { autoClose: 2000 })
      handleNavigate("results", analysisResults)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      toast.error(errorMessage, { autoClose: 4000 })
    }
  }

  const handleGeneratePlan = async () => {
    if (!resultsData) return

    toast.info("Generating your personalized plan...", { autoClose: 2000 })

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

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate plan")
      }

      const planData = await response.json()
      toast.success("Plan generated successfully!", { autoClose: 2000 })
      handleNavigate("plan", { ...resultsData, ...planData })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      toast.error(errorMessage, { autoClose: 4000 })
    }
  }

  const handleStartOver = () => {
    setAssessmentData(null)
    setResultsData(null)
    setCurrentPage("home")
    toast.info("Starting fresh", { autoClose: 2000 })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
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
