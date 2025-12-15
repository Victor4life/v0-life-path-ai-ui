"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormStep = 1 | 2 | 3 | 4 | 5

interface AssessmentFormData {
  // Step 1
  biggestChallenge: string
  emotionalWellbeing: string
  // Step 2
  thirtyDayGoals: string
  longTermGoals: string
  // Step 3
  holdingBackHabits: string
  buildHabits: string
  // Step 4
  strengths: string
  proud: string
  // Step 5
  voiceNote?: File
  fileUpload?: File
}

export default function AssessmentPage({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: AssessmentFormData) => void
  onBack: () => void
}) {
  const [step, setStep] = useState<FormStep>(1)
  const [formData, setFormData] = useState<AssessmentFormData>({
    biggestChallenge: "",
    emotionalWellbeing: "",
    thirtyDayGoals: "",
    longTermGoals: "",
    holdingBackHabits: "",
    buildHabits: "",
    strengths: "",
    proud: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "voiceNote" | "fileUpload") => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }))
    }
  }

  const handleNext = () => {
    if (step < 5) setStep((step + 1) as FormStep)
  }

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as FormStep)
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const steps = [
    { number: 1, title: "Basic Reflection" },
    { number: 2, title: "Goals" },
    { number: 3, title: "Habits" },
    { number: 4, title: "Strengths" },
    { number: 5, title: "Optional Upload" },
  ]

  return (
    <div className="min-h-screen flex flex-col px-4 py-12">
      <div className="max-w-2xl mx-auto w-full">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex-1 h-2 rounded-full transition-colors ${s.number <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Step {step}: {steps[step - 1]?.title}
          </h1>
          <p className="text-foreground/60 mt-2">
            {step} of {steps.length}
          </p>
        </div>

        {/* Form Content */}
        <Card className="p-8 bg-white/60 backdrop-blur-sm border-0 mb-8">
          {/* Step 1 - Basic Reflection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="biggestChallenge" className="text-base font-semibold">
                  What is your biggest challenge right now?
                </Label>
                <Textarea
                  id="biggestChallenge"
                  name="biggestChallenge"
                  value={formData.biggestChallenge}
                  onChange={handleInputChange}
                  placeholder="Share what's been on your mind..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="emotionalWellbeing" className="text-base font-semibold">
                  How would you describe your emotional well-being?
                </Label>
                <Textarea
                  id="emotionalWellbeing"
                  name="emotionalWellbeing"
                  value={formData.emotionalWellbeing}
                  onChange={handleInputChange}
                  placeholder="Share your emotional state..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Step 2 - Goals */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="thirtyDayGoals" className="text-base font-semibold">
                  What goals do you want to achieve in the next 30 days?
                </Label>
                <Textarea
                  id="thirtyDayGoals"
                  name="thirtyDayGoals"
                  value={formData.thirtyDayGoals}
                  onChange={handleInputChange}
                  placeholder="Share your 30-day goals..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="longTermGoals" className="text-base font-semibold">
                  What long-term goals matter to you?
                </Label>
                <Textarea
                  id="longTermGoals"
                  name="longTermGoals"
                  value={formData.longTermGoals}
                  onChange={handleInputChange}
                  placeholder="Share your long-term vision..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Step 3 - Habits */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="holdingBackHabits" className="text-base font-semibold">
                  What habits are holding you back?
                </Label>
                <Textarea
                  id="holdingBackHabits"
                  name="holdingBackHabits"
                  value={formData.holdingBackHabits}
                  onChange={handleInputChange}
                  placeholder="Share habits you want to break..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="buildHabits" className="text-base font-semibold">
                  What habits do you want to build?
                </Label>
                <Textarea
                  id="buildHabits"
                  name="buildHabits"
                  value={formData.buildHabits}
                  onChange={handleInputChange}
                  placeholder="Share positive habits to develop..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Step 4 - Strengths */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="strengths" className="text-base font-semibold">
                  What strengths do you have?
                </Label>
                <Textarea
                  id="strengths"
                  name="strengths"
                  value={formData.strengths}
                  onChange={handleInputChange}
                  placeholder="Share your strengths..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="proud" className="text-base font-semibold">
                  What are you proud of?
                </Label>
                <Textarea
                  id="proud"
                  name="proud"
                  value={formData.proud}
                  onChange={handleInputChange}
                  placeholder="Share your accomplishments..."
                  className="mt-2 min-h-32 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Step 5 - Optional Upload */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="voiceNote" className="text-base font-semibold">
                  Voice Note Upload (Optional)
                </Label>
                <Input
                  id="voiceNote"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange(e, "voiceNote")}
                  className="mt-2 rounded-lg"
                />
                {formData.voiceNote && (
                  <p className="text-sm text-foreground/60 mt-2">Selected: {formData.voiceNote.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="fileUpload" className="text-base font-semibold">
                  File Upload - Journal, Text, or Screenshots (Optional)
                </Label>
                <Input
                  id="fileUpload"
                  type="file"
                  onChange={(e) => handleFileChange(e, "fileUpload")}
                  className="mt-2 rounded-lg"
                />
                {formData.fileUpload && (
                  <p className="text-sm text-foreground/60 mt-2">Selected: {formData.fileUpload.name}</p>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button onClick={onBack} variant="outline" className="flex-1 py-6 rounded-lg bg-transparent">
            Back to Home
          </Button>
          {step > 1 && (
            <Button onClick={handleBack} variant="outline" className="flex-1 py-6 rounded-lg bg-transparent">
              Back
            </Button>
          )}
          {step < 5 ? (
            <Button
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-lg"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-lg"
            >
              Analyze My Life Situation
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
