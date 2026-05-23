"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { trackConversion } from "@/components/ui/analytics";

const storageKey = "gu_lang";

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dataset.lang = locale;
}

export function LanguageToggle() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    const initial = stored === "en" ? "en" : "es";
    setLocale(initial);
    applyLocale(initial);
  }, []);

  function changeLocale(nextLocale: Locale) {
    if (locale === nextLocale) return;

    setLocale(nextLocale);
    applyLocale(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
    trackConversion("language_switch", { language: nextLocale });
  }

  return (
    <div className="language-toggle" aria-label="Language selector">
      {(["es", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          className={locale === option ? "is-active" : undefined}
          aria-pressed={locale === option}
          onClick={() => changeLocale(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
