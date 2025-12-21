"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/language-context"
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
  Menu,
  X,
} from "lucide-react"

export default function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              {t("nav_features")}
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav_how_it_works")}
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("nav_testimonials")}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/auth/login" className="hidden md:inline-block">
              <Button variant="ghost" size="sm">
                {t("nav_sign_in")}
              </Button>
            </Link>
            <Link href="/auth/sign-up" className="hidden md:inline-block">
              <Button size="sm" className="rounded-full">
                {t("nav_get_started")}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav_features")}
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav_how_it_works")}
              </a>
              <a
                href="#testimonials"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav_testimonials")}
              </a>
              <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="w-full">
                    {t("nav_sign_in")}
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button size="sm" className="w-full rounded-full">
                    {t("nav_get_started")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 -z-10" />

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            {t("hero_badge")}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            {t("hero_title_1")} <span className="text-primary">{t("hero_title_2")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("hero_description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => onNavigate("assessment")}
              size="lg"
              className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              {t("hero_cta_primary")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full bg-transparent">
                {t("hero_cta_secondary")}
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">{t("hero_disclaimer")}</div>
        </div>
      </section>

      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <div className="text-sm text-muted-foreground">{t("stats_transformed")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">94%</div>
              <div className="text-sm text-muted-foreground">{t("stats_success")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-sm text-muted-foreground">{t("stats_rating")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground">{t("stats_languages")}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("features_title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{t("features_subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_analysis_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_analysis_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_plan_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_plan_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_companion_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_companion_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_voice_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_voice_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_journal_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_journal_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_future_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_future_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_progress_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_progress_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_pdf_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_pdf_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("feature_multilang_title")}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("feature_multilang_desc")}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                {t("learn_more")} <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("how_title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{t("how_subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("how_step1_title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("how_step1_desc")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-2xl font-bold text-secondary-foreground mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("how_step2_title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("how_step2_desc")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl font-bold text-accent-foreground mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("how_step3_title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("how_step3_desc")}</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => onNavigate("assessment")} size="lg" className="px-8 py-6 text-lg rounded-full">
              {t("hero_cta_primary")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("testimonials_title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{t("testimonials_subtitle")}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("cta_title")}</h2>
          <p className="text-xl text-muted-foreground mb-12 text-pretty">{t("cta_subtitle")}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              onClick={() => onNavigate("assessment")}
              size="lg"
              className="px-8 py-6 text-lg rounded-full shadow-lg"
            >
              {t("hero_cta_primary")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full bg-transparent">
                {t("cta_demo")}
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              {t("cta_no_card")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              {t("cta_time")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              {t("cta_instant")}
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
                    {t("nav_features")}
                  </a>
                </div>
                <div>
                  <a href="#how-it-works" className="hover:text-foreground transition-colors">
                    {t("nav_how_it_works")}
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
                    {t("nav_sign_in")}
                  </Link>
                </div>
                <div>
                  <Link href="/auth/sign-up" className="hover:text-foreground transition-colors">
                    {t("nav_get_started")}
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
