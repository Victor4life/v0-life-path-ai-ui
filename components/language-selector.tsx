"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { Languages } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
      <SelectTrigger className="w-[180px] rounded-lg bg-white/60 backdrop-blur-sm border-0">
        <Languages className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="ar">العربية</SelectItem>
        <SelectItem value="sw">Kiswahili</SelectItem>
        <SelectItem value="ig">Igbo</SelectItem>
        <SelectItem value="yo">Yoruba</SelectItem>
        <SelectItem value="ha">Hausa</SelectItem>
      </SelectContent>
    </Select>
  )
}
