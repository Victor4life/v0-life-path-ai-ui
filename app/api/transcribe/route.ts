import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Send audio to OpenAI Whisper API
    const openaiFormData = new FormData()
    openaiFormData.append("file", audioFile)
    openaiFormData.append("model", "whisper-1")

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: openaiFormData,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] OpenAI transcription error:", error)
      return NextResponse.json({ error: "Transcription failed" }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json({
      transcription: data.text,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Transcription error:", error)
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 })
  }
}
