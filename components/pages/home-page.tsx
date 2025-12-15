"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import {
  Sparkles,
  Brain,
  Calendar,
  MessageCircle,
  BookOpen,
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  Mic,
  Download,
  BarChart,
  Heart,
} from "lucide-react"

export default function HomePage({ onStartAssessment }: { onStartAssessment: () => void }) {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LifePath AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm" className="rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 -z-10" />

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Life Transformation
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Transform your life in <span className="text-primary">30 days</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
            Get personalized AI-powered insights, a custom transformation plan, and daily guidance to achieve your goals
            and build lasting positive habits.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={onStartAssessment}
              size="lg"
              className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Free Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full bg-transparent">
                Explore Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            No credit card required · 5 min assessment · Instant results
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <div className="text-sm text-muted-foreground">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Everything you need to transform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Powerful AI-driven features designed to support your journey every step of the way
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Life Analysis</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Deep insights into your challenges, emotional patterns, strengths, and growth opportunities through
                advanced AI analysis.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">30-Day Transformation Plan</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Personalized week-by-week roadmap with daily tasks, habit building, and motivational guidance tailored
                to your goals.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Daily AI Companion</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Get bite-sized micro-goals, 5-minute actions, motivation boosts, and reflection prompts every single
                day.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Voice Input</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Express yourself naturally with voice recording and automatic transcription for deeper, more authentic
                insights.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Journal Insights</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Discover emotional patterns, gain perspective, and receive personalized advice from your journal
                entries.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Future Self Chat</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Talk to your wiser future self for guidance, perspective, and motivation when you need it most.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Visualize your journey with daily completion tracking, notes, and progress analytics to stay motivated.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">PDF Export</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Download your complete 30-day plan as a beautiful PDF to print, share, or keep offline.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Language Support</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Access LifePath AI in 8 languages: English, French, Spanish, Arabic, Swahili, Igbo, Yoruba, and Hausa.
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Your transformation in 3 steps</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Simple, powerful, and designed to create lasting change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Take the Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete our 5-step life assessment form in just 5 minutes. Use voice input or typing to share your
                challenges and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-2xl font-bold text-secondary-foreground mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Get Your Plan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive instant AI-powered analysis and a personalized 30-day transformation plan tailored to your
                unique situation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl font-bold text-accent-foreground mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Transform Daily</h3>
              <p className="text-muted-foreground leading-relaxed">
                Follow your plan with daily AI guidance, track progress, journal insights, and chat with your future
                self for support.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button onClick={onStartAssessment} size="lg" className="px-8 py-6 text-lg rounded-full">
              Start Your Transformation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Trusted by thousands</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Real stories from people who transformed their lives with LifePath AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-4">
                "LifePath AI helped me understand myself better and gave me actionable steps. I've built 3 new positive
                habits and feel more focused than ever."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  S
                </div>
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">Software Engineer</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/5 to-background">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-4">
                "The daily companion feature is a game-changer. Small actions every day have led to massive improvements
                in my life. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">
                  M
                </div>
                <div>
                  <div className="font-semibold">Marcus Johnson</div>
                  <div className="text-sm text-muted-foreground">Entrepreneur</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/5 to-background">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-4">
                "I was skeptical at first, but the AI analysis was surprisingly accurate. The 30-day plan was exactly
                what I needed to get unstuck."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                  A
                </div>
                <div>
                  <div className="font-semibold">Amara Okafor</div>
                  <div className="text-sm text-muted-foreground">Teacher</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to transform your life?</h2>
          <p className="text-xl text-muted-foreground mb-12 text-pretty">
            Join thousands who have already started their journey to a better life. Get your personalized plan in
            minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button onClick={onStartAssessment} size="lg" className="px-8 py-6 text-lg rounded-full shadow-lg">
              Start Free Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full bg-transparent">
                View Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              No credit card
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />5 min assessment
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Instant results
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 py-12 bg-muted/30 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg">LifePath AI</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered life transformation for everyone, everywhere.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </div>
                <div>
                  <a href="#how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </a>
                </div>
                <div>
                  <Link href="/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <Link href="/future-self" className="hover:text-foreground transition-colors">
                    Future Self Chat
                  </Link>
                </div>
                <div>
                  <Link href="/journal" className="hover:text-foreground transition-colors">
                    AI Journal
                  </Link>
                </div>
                <div>
                  <Link href="/progress" className="hover:text-foreground transition-colors">
                    Progress Tracker
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <Link href="/auth/login" className="hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                </div>
                <div>
                  <Link href="/auth/sign-up" className="hover:text-foreground transition-colors">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 LifePath AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
