"use client"

import type React from "react"
import { signUp } from "../actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== repeatPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 4000,
      })
      setIsLoading(false)
      return
    }

    try {
      const result = await signUp({ email, password })
      if (result?.error) {
        toast.error(result.error, {
          position: "top-right",
          autoClose: 4000,
        })
      } else {
        toast.success("Account created successfully! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
        })
        setTimeout(() => {
          router.push("/auth/sign-up-success")
        }, 2000)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-sm">
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl font-semibold text-slate-900">Create Account</CardTitle>
            <CardDescription className="text-slate-600">Start your transformation journey today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-slate-700 font-medium">
                  Name
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Your name"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="rounded-lg border-slate-200"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-slate-200"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border-slate-200"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repeat-password" className="text-slate-700 font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="rounded-lg border-slate-200"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full rounded-lg py-6 font-medium" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
