import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, userName = "User" } = body

    const doc = new jsPDF()
    let yPos = 20

    // Title
    doc.setFontSize(22)
    doc.text("30-Day Transformation Plan", 20, yPos)
    yPos += 15

    // User Summary
    doc.setFontSize(12)
    doc.text(`For: ${userName}`, 20, yPos)
    yPos += 10
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPos)
    yPos += 15

    // Weekly Goals
    doc.setFontSize(16)
    doc.text("Weekly Goals", 20, yPos)
    yPos += 10
    doc.setFontSize(11)

    const weeks = ["week1", "week2", "week3", "week4"]
    weeks.forEach((week, index) => {
      const text = `Week ${index + 1}: ${plan.weekly_goals[week]}`
      const lines = doc.splitTextToSize(text, 170)
      doc.text(lines, 20, yPos)
      yPos += lines.length * 7
    })
    yPos += 10

    // Daily Tasks
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFontSize(16)
    doc.text("30-Day Tasks", 20, yPos)
    yPos += 10
    doc.setFontSize(10)

    plan.daily_tasks.forEach((task: string, index: number) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      const text = `Day ${index + 1}: ${task}`
      const lines = doc.splitTextToSize(text, 170)
      doc.text(lines, 20, yPos)
      yPos += lines.length * 6
    })

    // Habits
    doc.addPage()
    yPos = 20
    doc.setFontSize(16)
    doc.text("Habits to Build", 20, yPos)
    yPos += 10
    doc.setFontSize(11)
    plan.habits_to_build.forEach((habit: string) => {
      const lines = doc.splitTextToSize(`• ${habit}`, 170)
      doc.text(lines, 20, yPos)
      yPos += lines.length * 7
    })
    yPos += 10

    doc.setFontSize(16)
    doc.text("Habits to Break", 20, yPos)
    yPos += 10
    doc.setFontSize(11)
    plan.habits_to_break.forEach((habit: string) => {
      const lines = doc.splitTextToSize(`• ${habit}`, 170)
      doc.text(lines, 20, yPos)
      yPos += lines.length * 7
    })

    // Motivation Message
    doc.addPage()
    yPos = 20
    doc.setFontSize(16)
    doc.text("Motivation Message", 20, yPos)
    yPos += 10
    doc.setFontSize(11)
    const motivationLines = doc.splitTextToSize(plan.motivation_message, 170)
    doc.text(motivationLines, 20, yPos)
    yPos += motivationLines.length * 7 + 10

    // Future Self Message
    doc.setFontSize(16)
    doc.text("From Your Future Self", 20, yPos)
    yPos += 10
    doc.setFontSize(11)
    const futureLines = doc.splitTextToSize(plan.future_self_message, 170)
    doc.text(futureLines, 20, yPos)

    // Generate PDF buffer
    const pdfBuffer = doc.output("arraybuffer")

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="30-day-plan.pdf"',
      },
    })
  } catch (error) {
    console.error("[v0] PDF export error:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
