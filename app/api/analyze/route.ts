import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const analysisSchema = z.object({
  clarity_summary: z.string().describe("A warm, compassionate summary of the person's current situation"),
  emotional_state: z.string().describe("A gentle description of their emotional state"),
  root_causes: z.array(z.string()).describe("2-4 underlying root causes of their challenges"),
  strengths: z.array(z.string()).describe("3-5 personal strengths to build upon"),
  priority_actions: z.array(z.string()).describe("3-5 specific, actionable next steps"),
  raw_analysis: z.string().describe("Full detailed analysis"),
})

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const body = await req.json()
    const { answers, transcription, language = "en" } = body

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

    const prompt = `You are a compassionate life coach and therapist. ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.en}

Assessment Answers:
${JSON.stringify(answers, null, 2)}

${transcription ? `Additional Context from Transcription:\n${transcription}\n` : ""}

Provide a thorough, gentle analysis that:
1. Summarizes their current situation with clarity and compassion
2. Identifies their emotional state without judgment
3. Uncovers 2-4 root causes of their challenges
4. Highlights 3-5 of their strengths and positive qualities
5. Suggests 3-5 specific, actionable priority actions

Be encouraging, supportive, and realistic. Focus on their potential for growth.`

    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: analysisSchema,
      prompt,
      maxOutputTokens: 3000,
      temperature: 0.7,
    })

    if (user) {
      await supabase.from("assessments").insert({
        user_id: user.id,
        assessment_data: answers,
        transcription,
        clarity_summary: object.clarity_summary,
        emotional_state: object.emotional_state,
        root_causes: object.root_causes,
        strengths: object.strengths,
        priority_actions: object.priority_actions,
        raw_analysis: object.raw_analysis,
      })
    }

    return Response.json(object)
  } catch (error) {
    console.error("[v0] Error in /api/analyze:", error)
    return Response.json({ error: "Failed to generate analysis" }, { status: 500 })
  }
}
