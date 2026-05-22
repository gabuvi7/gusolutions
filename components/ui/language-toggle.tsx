"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

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
    setLocale(nextLocale);
    applyLocale(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
  }

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1" aria-label="Language selector">
      {(["es", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ${locale === option ? "bg-brand-blue text-white" : "text-slate-600"}`}
          aria-pressed={locale === option}
          onClick={() => changeLocale(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
