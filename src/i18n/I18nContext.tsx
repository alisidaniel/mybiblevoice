import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
  } from "react";
  import { storage } from "../services/storage";
  import { translations, type Locale, type TranslationDict } from "./translations";
  
  interface I18nContextValue {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (key: keyof TranslationDict) => string;
  }
  
  const I18nContext = createContext<I18nContextValue | null>(null);
  
  const STORAGE_KEY = "locale";
  
  export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(() =>
      storage.get<Locale>(STORAGE_KEY, "en")
    );
  
    useEffect(() => {
      storage.set(STORAGE_KEY, locale);
      document.documentElement.lang = locale;
    }, [locale]);
  
    const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  
    const t = useCallback(
      (key: keyof TranslationDict) => {
        return translations[locale][key] ?? translations.en[key] ?? String(key);
      },
      [locale]
    );
  
    const value = useMemo<I18nContextValue>(
      () => ({ locale, setLocale, t }),
      [locale, setLocale, t]
    );
  
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
  }
  
  export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
    return ctx;
  }
  
  export function useT() {
    return useI18n().t;
  }