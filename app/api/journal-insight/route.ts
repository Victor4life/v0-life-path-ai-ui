import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const journalInsightSchema = z.object({
  emotional_tone: z.string().describe("The overall emotional tone of the entry"),
  patterns: z.array(z.string()).describe("2-4 patterns or themes noticed in the entry"),
  insights: z.string().describe("Key insights about their thoughts and feelings"),
  advice: z.string().describe("Compassionate advice and encouragement"),
})

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { entry, language = "en" } = body

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

    const prompt = `You are a compassionate therapist analyzing a journal entry. ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.en}

Journal Entry:
${entry}

Provide:
1. Emotional tone: Identify the primary emotional state
2. Patterns: Notice 2-4 recurring themes or patterns
3. Insights: Share key insights about their thoughts and feelings
4. Advice: Offer compassionate guidance and encouragement

Be gentle, understanding, and supportive.`

    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: journalInsightSchema,
      prompt,
      maxOutputTokens: 1500,
      temperature: 0.7,
    })

    // Save journal entry and insights to database
    await supabase.from("journal_entries").insert({
      user_id: user.id,
      entry_text: entry,
      emotional_tone: object.emotional_tone,
      patterns: object.patterns,
      insights: object.insights,
      advice: object.advice,
    })

    return Response.json(object)
  } catch (error) {
    console.error("[v0] Journal insight error:", error)
    return Response.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
