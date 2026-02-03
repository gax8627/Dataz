"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import en from "./locales/en.json"
import es from "./locales/es.json"

type Language = "en" | "es"
type Translations = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const translations: Record<Language, Translations> = { en, es }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es") // Default to Spanish as per site content

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
      document.documentElement.lang = lang
    }
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const keys = key.split(".")
      let value: unknown = translations[language]

      for (const k of keys) {
        if (value && typeof value === "object" && k in (value as object)) {
          value = (value as Record<string, unknown>)[k]
        } else {
          return key
        }
      }

      if (typeof value === "string") {
        let result = value
        if (params) {
          Object.entries(params).forEach(([k, v]) => {
            result = result.replace(`{{${k}}}`, String(v))
          })
        }
        return result
      }

      if (Array.isArray(value)) {
        // If it's an array and we didn't specify an index, return joined string or default
        return value.join(", ")
      }

      return key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
