"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ThemeColor = "purple" | "blue" | "gold" | "green" | "gray"

interface ThemeContextType {
  themeColor: ThemeColor
  setThemeFromMood: (mood: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const moodToTheme: Record<string, ThemeColor> = {
  calm: "blue",
  empowered: "gold",
  healing: "green",
  stressed: "purple",
  neutral: "gray",
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>("purple")

  const setThemeFromMood = (mood: string) => {
    const moodKey = Object.keys(moodToTheme).find((key) => mood.toLowerCase().includes(key))
    const newTheme = moodKey ? moodToTheme[moodKey] : "purple"
    setThemeColor(newTheme)
    localStorage.setItem("theme-color", newTheme)
  }

  useEffect(() => {
    const saved = localStorage.getItem("theme-color") as ThemeColor
    if (saved) setThemeColor(saved)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeColor)
  }, [themeColor])

  return <ThemeContext.Provider value={{ themeColor, setThemeFromMood }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
