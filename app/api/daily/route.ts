import { generateObject } from "ai"
import { z } from "zod"

const dailySchema = z.object({
  micro_goal: z.string().describe("A small, achievable goal for today"),
  micro_task: z.string().describe("A 5-minute action they can do right now"),
  motivation: z.string().describe("A short, powerful motivational message"),
  reflection_prompt: z.string().describe("A thoughtful question for evening reflection"),
})

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { day, date, language = "en" } = body

    const dayNumber = day || 1
    const dateString = date || new Date().toLocaleDateString()

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

    const prompt = `You are a supportive daily companion helping someone through their 30-day transformation journey. ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.en}

Day: ${dayNumber} of 30
Date: ${dateString}

Provide today's guidance with:
1. A micro-goal: One small, specific thing they can accomplish today
2. A micro-task: A 5-minute action they can do immediately (be very specific)
3. Motivation: A short, powerful message to energize them (2-3 sentences max)
4. Reflection prompt: One thoughtful question for them to journal about tonight

Keep it concise, actionable, and uplifting. Focus on today only.`

    const { object } = await generateObject({
      model: "gpt-5",
      schema: dailySchema,
      prompt,
      maxOutputTokens: 800,
      temperature: 0.8,
    })

    return Response.json(object)
  } catch (error) {
    console.error("[v0] Error in /api/daily:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to generate daily guidance",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
