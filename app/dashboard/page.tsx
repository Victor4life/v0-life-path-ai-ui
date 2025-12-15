"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, MessageSquare, TrendingUp, LogOut } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    checkUser()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/60">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-foreground/60">Continue your transformation journey</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="rounded-lg bg-white/60">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/progress">
            <Card className="p-8 bg-gradient-to-br from-purple-100 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Track Progress</h2>
              </div>
              <p className="text-foreground/70">View and update your 30-day progress tracker</p>
            </Card>
          </Link>

          <Link href="/journal">
            <Card className="p-8 bg-gradient-to-br from-orange-100 to-orange-50 border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">AI Journal</h2>
              </div>
              <p className="text-foreground/70">Write and receive compassionate insights</p>
            </Card>
          </Link>

          <Link href="/future-self">
            <Card className="p-8 bg-gradient-to-br from-accent/20 to-accent/10 border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Future Self Chat</h2>
              </div>
              <p className="text-foreground/70">Talk with your future self for guidance</p>
            </Card>
          </Link>

          <Link href="/">
            <Card className="p-8 bg-gradient-to-br from-green-100 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">New Assessment</h2>
              </div>
              <p className="text-foreground/70">Start a new life assessment and plan</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
