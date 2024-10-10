import { ArabicTranslations, EnglishTranslations } from "@/languages"
import { Languages } from "@/types"

export default function t(key: string, lang: Languages = "en") {
  if (lang === "en") {
    if (EnglishTranslations[key]) {
      return EnglishTranslations[key]
    } else {
      return `_${key}`
    }
  } else if (lang === "ar") {
    if (ArabicTranslations[key]) {
      return ArabicTranslations[key]
    } else {
      return `_${key}`
    }
  }
  return `_${key}`
}
