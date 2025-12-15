import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// GET progress for a plan
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const planId = searchParams.get("plan_id")

    if (!planId) {
      return NextResponse.json({ error: "Missing plan_id" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("plan_id", planId)
      .eq("user_id", user.id)
      .order("day_number")

    if (error) throw error

    return NextResponse.json({ progress: data })
  } catch (error) {
    console.error("[v0] Progress GET error:", error)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}

// POST or UPDATE progress for a specific day
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { plan_id, day_number, completed, notes } = body

    const { data, error } = await supabase
      .from("progress")
      .upsert(
        {
          user_id: user.id,
          plan_id,
          day_number,
          completed,
          notes,
          completed_at: completed ? new Date().toISOString() : null,
        },
        { onConflict: "plan_id,day_number" },
      )
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, progress: data })
  } catch (error) {
    console.error("[v0] Progress POST error:", error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}
