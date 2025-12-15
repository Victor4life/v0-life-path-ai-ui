import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { createClient } from "@/lib/supabase/server"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const body = await req.json()
    const { messages, language = "en" }: { messages: UIMessage[]; language?: string } = body

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

    const systemPrompt = `You are the user's future self, one year from now. ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.en}

You have:
- Achieved the goals they're working toward
- Developed the habits they're building
- Overcome the challenges they're facing
- Gained wisdom, perspective, and inner peace

Your role:
- Speak with warmth, confidence, and deep understanding
- Share insights from having walked their path
- Offer encouragement and reassurance
- Remind them of their strength and potential
- Keep responses conversational and heartfelt (2-4 paragraphs)

Be wise, calm, motivating, and authentically supportive as their future self.`

    const result = streamText({
      model: "gpt-5",
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      maxOutputTokens: 1000,
      temperature: 0.8,
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Future self chat error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
