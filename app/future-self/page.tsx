"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useChat } from "@ai-sdk/react"

export default function FutureSelfPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/future-self",
  })

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Talk to Your Future Self</h1>
          <p className="text-foreground/60">Connect with the person you're becoming, one year from now</p>
        </div>

        <Card className="p-6 bg-white/60 backdrop-blur-sm border-0 mb-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-foreground/60 py-12">
                <p className="text-lg mb-2">Your future self is here, ready to listen.</p>
                <p className="text-sm">Ask for guidance, share your worries, or seek encouragement.</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${message.role === "user" ? "bg-primary/10 ml-12" : "bg-accent/50 mr-12"}`}
              >
                <p className="text-sm font-semibold mb-1 text-foreground/80">
                  {message.role === "user" ? "You (Now)" : "Your Future Self"}
                </p>
                <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="bg-accent/50 mr-12 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-1 text-foreground/80">Your Future Self</p>
                <p className="text-foreground/60">Thinking...</p>
              </div>
            )}
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="What would you like to ask your future self?"
            className="flex-1 rounded-lg min-h-24"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="rounded-lg px-6">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
