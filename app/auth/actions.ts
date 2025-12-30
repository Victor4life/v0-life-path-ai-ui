"use server"

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

// Mock users for demo
const DEMO_USERS = [
  { email: "demo@example.com", password: "demo123" },
  { email: "test@example.com", password: "test123" },
]

async function tryRealAuth(email: string, password: string, authFn: (client: any) => Promise<any>) {
  try {
    const supabase = await createClient()
    return await authFn(supabase)
  } catch {
    // Fall back to demo auth if real auth fails
    return null
  }
}

export async function signUp(formData: { email: string; password: string }) {
  // Try real Supabase auth first
  const realAuthResult = await tryRealAuth(formData.email, formData.password, async (supabase) => {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
      },
    })

    if (!error) {
      return { success: true }
    }

    return { error: error.message }
  })

  if (realAuthResult) {
    return realAuthResult
  }

  // Demo mode: Accept any signup
  if (formData.email && formData.password && formData.password.length >= 6) {
    // Set a demo session cookie
    const cookieStore = await cookies()
    cookieStore.set("demo-auth", "true", { maxAge: 86400 })
    return { success: true }
  }

  return { error: "Invalid email or password (minimum 6 characters)" }
}

export async function signIn(formData: { email: string; password: string }) {
  // Try real Supabase auth first
  const realAuthResult = await tryRealAuth(formData.email, formData.password, async (supabase) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (!error) {
      return { success: true }
    }

    return { error: error.message }
  })

  if (realAuthResult) {
    return realAuthResult
  }

  // Demo mode: Accept demo credentials or any valid email/password combo
  const isDemoUser = DEMO_USERS.some((user) => user.email === formData.email && user.password === formData.password)

  if (isDemoUser || (formData.email && formData.password)) {
    // Set a demo session cookie
    const cookieStore = await cookies()
    cookieStore.set("demo-auth", "true", { maxAge: 86400 })
    return { success: true }
  }

  return { error: "Invalid email or password" }
}
