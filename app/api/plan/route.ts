import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const planSchema = z.object({
  weekly_goals: z.object({
    week1: z.string().describe("Goal for week 1"),
    week2: z.string().describe("Goal for week 2"),
    week3: z.string().describe("Goal for week 3"),
    week4: z.string().describe("Goal for week 4"),
  }),
  daily_tasks: z.array(z.string()).length(30).describe("Exactly 30 daily tasks, one for each day"),
  habits_to_build: z.array(z.string()).describe("3-5 positive habits to develop"),
  habits_to_break: z.array(z.string()).describe("2-4 negative patterns to release"),
  motivation_message: z.string().describe("An uplifting message to sustain motivation"),
  future_self_message: z.string().describe("A letter from their future self after completing the 30 days"),
})

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const body = await req.json()
    const { clarity_summary, root_causes, priority_actions, assessment_id, language = "en" } = body

    const languageInstructions = {
      en: "Respond in English.",
      fr: "Réponds en français.",
      es: "Responde en español.",
      ar: "الرد باللغة العربية.",
      sw: "Jibu kwa Kiswahili.",
      ig: "Zaa n'asụsụ Igbo.",
      yo: "Dahun ni ede Yoruba.",
      ha: "Amsa a cikin Hausa.",
    }

    const prompt = `You are a compassionate life coach creating a realistic, actionable 30-day transformation plan. ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.en}

Current Situation:
${clarity_summary}

Root Causes to Address:
${root_causes.join("\n")}

Priority Actions:
${priority_actions.join("\n")}

Create a comprehensive 30-day plan that:
1. Sets achievable weekly goals that build progressively
2. Provides exactly 30 daily tasks (one per day) that are specific and realistic
3. Identifies 3-5 positive habits to build gradually
4. Names 2-4 negative patterns to gently release
5. Includes an uplifting motivation message for tough days
6. Writes a heartfelt letter from their future self (30 days from now)

Make the plan realistic, encouraging, and grounded in small, sustainable changes.`

    const { object } = await generateObject({
      model: "gpt-5",
      schema: planSchema,
      prompt,
      maxOutputTokens: 4000,
      temperature: 0.7,
    })

    if (user) {
      const { data: planData } = await supabase
        .from("plans")
        .insert({
          user_id: user.id,
          assessment_id: assessment_id || null,
          weekly_goals: object.weekly_goals,
          daily_tasks: object.daily_tasks,
          habits_to_build: object.habits_to_build,
          habits_to_break: object.habits_to_break,
          motivation_message: object.motivation_message,
          future_self_message: object.future_self_message,
        })
        .select()
        .single()

      return Response.json({ ...object, plan_id: planData?.id })
    }

    return Response.json(object)
  } catch (error) {
    console.error("[v0] Error in /api/plan:", error)
    return Response.json({ error: "Failed to generate plan" }, { status: 500 })
  }
}
