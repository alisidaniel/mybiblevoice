// src/components/settings/LanguagePicker.tsx
import { useI18n } from "../../i18n/I18nContext";
import type { Locale } from "../../i18n/translations";

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "es", label: "Español", flag: "ES" },
];

export function LanguagePicker() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex flex-wrap gap-2">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ${
            locale === l.code
              ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          }`}
        >
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
              locale === l.code
                ? "bg-white/15 dark:bg-black/10"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
          >
            {l.flag}
          </span>
          {l.label}
        </button>
      ))}
    </div>
  );
}