import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { en } from "./en";
import { nl } from "./nl";
import { de } from "./de";
import { ru } from "./ru";
import { zh } from "./zh";
import { hi } from "./hi";
import { es } from "./es";
import { fr } from "./fr";
import { ar } from "./ar";
import { ko } from "./ko";
import { ja } from "./ja";
import { pt } from "./pt";
import { tr } from "./tr";
import { bn } from "./bn";
import { ur } from "./ur";

export type Language =
  | "en"
  | "nl"
  | "de"
  | "ru"
  | "zh"
  | "hi"
  | "es"
  | "fr"
  | "ar"
  | "ko"
  | "ja"
  | "pt"
  | "tr"
  | "bn"
  | "ur";
export type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Language, Translations> = {
  en,
  nl,
  de,
  ru,
  zh,
  hi,
  es,
  fr,
  ar,
  ko,
  ja,
  pt,
  tr,
  bn,
  ur,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved && translations[saved] ? saved : "en";
  });

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" || language === "ur" ? "rtl" : "ltr";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
