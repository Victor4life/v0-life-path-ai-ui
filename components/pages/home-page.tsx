"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"

export default function HomePage({ onStartAssessment }: { onStartAssessment: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <LanguageSelector />
        <Link href="/auth/login">
          <Button variant="outline" className="rounded-lg bg-white/60 backdrop-blur-sm border-0">
            Sign In
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">LifePath AI</h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
            AI-powered life assessment and personalized 30-day transformation plan.
          </p>
          <Button
            onClick={onStartAssessment}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full"
          >
            Start My Life Assessment
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What You'll Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-8 bg-gradient-to-br from-purple-100 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Life Diagnosis</h3>
              <p className="text-foreground/70 leading-relaxed">
                Get deep insights into your challenges, strengths, and emotional well-being with voice support.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 bg-gradient-to-br from-orange-100 to-orange-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">30-Day Plan</h3>
              <p className="text-foreground/70 leading-relaxed">
                Receive a custom week-by-week roadmap with PDF export and progress tracking.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 bg-gradient-to-br from-accent/20 to-accent/5 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">AI Features</h3>
              <p className="text-foreground/70 leading-relaxed">
                Daily companion, future self chat, AI journal, and multi-language support.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
