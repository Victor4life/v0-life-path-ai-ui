"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, Brain, Heart, Target } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const mockResponses = [
  "I'm so proud of you for taking this step today. A year from now, you'll look back and see this moment as the turning point. The challenges you're facing? They're shaping you into someone stronger, wiser, and more resilient.",
  "You know what's amazing? The fact that you're here, asking these questions, shows how far you've already come. Trust the process. The seeds you plant today will bloom in ways you can't even imagine yet.",
  "Let me tell you something - that goal you're hesitant about? Go for it. I've seen how capable you are. The version of you one year ahead is living proof that you can do hard things and come out thriving.",
  "The struggles you're facing right now are temporary, but the lessons you're learning are permanent. Keep going. Future you is grateful for your persistence today.",
  "I wish I could tell you it gets easier, but the truth is - you get stronger. And that's so much better. Keep showing up for yourself, even on the hard days.",
]

export default function FutureSelfPage() {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

  const starterPrompts = [
    {
      icon: Target,
      label: t("future_self_starter_1"),
      prompt: t("future_self_starter_1"),
    },
    {
      icon: Heart,
      label: t("future_self_starter_2"),
      prompt: t("future_self_starter_2"),
    },
    {
      icon: Brain,
      label: t("future_self_starter_3"),
      prompt: t("future_self_starter_3"),
    },
    {
      icon: Sparkles,
      label: t("future_self_starter_4"),
      prompt: t("future_self_starter_4"),
    },
  ]

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt)
    setSelectedPrompt(prompt)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: randomResponse,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-purple-50 via-orange-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {t("future_self_title")}
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{t("future_self_subtitle")}</p>
        </div>

        {messages.length === 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground/60 mb-3 text-center">Start with a question:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {starterPrompts.map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  onClick={() => handlePromptSelect(item.prompt)}
                  className="h-auto py-4 px-5 justify-start text-left hover:bg-white/80 hover:border-purple-300 transition-all group"
                >
                  <item.icon className="w-5 h-5 mr-3 text-purple-500 group-hover:text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-purple-600 text-sm line-clamp-2">
                      {item.label}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        <Card className="p-6 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-xl mb-6 min-h-[450px] max-h-[600px] overflow-y-auto">
          <div className="space-y-6">
            {messages.length === 0 && (
              <div className="text-center text-foreground/60 py-16">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-purple-400" />
                </div>
                <p className="text-xl font-medium mb-2 text-foreground">Your future self is here, ready to listen.</p>
                <p className="text-sm text-foreground/60">Choose a question above or type your own message below.</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`max-w-[85%] p-5 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                      : "bg-gradient-to-br from-orange-50 to-pink-50 border border-purple-100"
                  }`}
                >
                  <p className="text-xs font-semibold mb-2 opacity-80">
                    {message.role === "user" ? "You (Present)" : "Your Future Self (One Year Ahead)"}
                  </p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                <div className="max-w-[85%] p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 border border-purple-100">
                  <p className="text-xs font-semibold mb-2 opacity-80">Your Future Self (One Year Ahead)</p>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-pink-400 animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("future_self_placeholder")}
              className="rounded-2xl min-h-24 bg-white/80 backdrop-blur-sm border-purple-200 focus:border-purple-400 resize-none pr-4"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-2xl px-8 h-24 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-foreground/50">
            <span className="font-semibold">{t("future_self_tip_title")}</span> {t("future_self_tip_desc")}
          </p>
        </div>
      </div>
    </div>
  )
}
