"use client";

import { useEffect, useRef, useState } from "react";
import { LocalizedText } from "@/components/ui/localized-text";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
const turnstileScriptUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const messages = {
  invalid_name: {
    es: "Indicá tu nombre completo.",
    en: "Please enter your full name.",
  },
  invalid_email: {
    es: "El email no parece válido. Revisá el formato.",
    en: "That email does not look valid. Check the format.",
  },
  invalid_phone: {
    es: "El teléfono es demasiado largo.",
    en: "The phone number is too long.",
  },
  invalid_company: {
    es: "La empresa es demasiado larga.",
    en: "The company name is too long.",
  },
  invalid_project_type: {
    es: "El tipo de proyecto es demasiado largo.",
    en: "The project type is too long.",
  },
  invalid_message: {
    es: "Contame el problema en al menos 10 caracteres.",
    en: "Tell me about the problem in at least 10 characters.",
  },
  turnstile_failed: {
    es: "La verificación anti-bots falló. Recargá la página e intentá de nuevo.",
    en: "Anti-bot verification failed. Reload and try again.",
  },
  not_configured: {
    es: "El envío no está configurado en el servidor. Escribime por email o LinkedIn.",
    en: "Sending is not configured on the server. Reach me by email or LinkedIn.",
  },
  send_failed: {
    es: "No se pudo enviar ahora. Probá de nuevo más tarde.",
    en: "Could not send right now. Please try again later.",
  },
  network: {
    es: "Sin conexión o error de red. Probá de nuevo.",
    en: "Network error. Please try again.",
  },
  generic: {
    es: "Algo salió mal. Probá de nuevo.",
    en: "Something went wrong. Please try again.",
  },
} satisfies Record<string, { es: string; en: string }>;

type TurnstileApi = {
  render: (element: HTMLElement, options: { sitekey: string; theme?: "auto" | "light" | "dark" }) => string;
  getResponse: (widgetId: string) => string;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${turnstileScriptUrl}"]`);
  if (existing) {
    return new Promise<void>((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("turnstile_script")), { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = turnstileScriptUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile_script"));
    document.head.appendChild(script);
  });
}

function errorMessage(code: string | null) {
  if (!code) return null;
  return messages[code as keyof typeof messages] ?? messages.generic;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current || turnstileWidgetId.current) return;

    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile || !turnstileRef.current || turnstileWidgetId.current) return;
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          theme: "auto",
        });
      })
      .catch(() => {
        setError("generic");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function syncAriaInvalid(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    if (!input.checkValidity()) {
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  }

  function resetTurnstile() {
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setError(null);
    setSent(false);

    if (!form.checkValidity()) {
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select").forEach(syncAriaInvalid);
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const turnstileToken = turnstileWidgetId.current && window.turnstile ? window.turnstile.getResponse(turnstileWidgetId.current) : "";

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          projectType: formData.get("projectType"),
          message: formData.get("message"),
          hp: formData.get("hp"),
          turnstileToken,
        }),
      });

      const body = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!response.ok || !body.ok) {
        setError(body.error ?? "generic");
        resetTurnstile();
        return;
      }

      form.reset();
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select").forEach((input) => {
        input.removeAttribute("aria-invalid");
      });
      setSent(true);
      resetTurnstile();
    } catch {
      setError("network");
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentError = errorMessage(error);

  return (
    <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate>
      <div>
        <h3><LocalizedText es="Propuesta en 3-5 días" en="Proposal in 3-5 days" /></h3>
        <p className="contact-form-note"><LocalizedText es="Gratis · sin compromiso" en="Free · no strings" /></p>
      </div>

      <div className="contact-field-row">
        <div className="contact-field">
          <label htmlFor="contact-name"><LocalizedText es="Nombre *" en="Name *" /></label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={200} aria-describedby="contact-name-error" onBlur={(event) => syncAriaInvalid(event.currentTarget)} onInput={(event) => syncAriaInvalid(event.currentTarget)} />
          <p id="contact-name-error" className="contact-field-error"><LocalizedText es="Indicá tu nombre." en="Enter your name." /></p>
        </div>

        <div className="contact-field">
          <label htmlFor="contact-email"><LocalizedText es="Email *" en="Email *" /></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required aria-describedby="contact-email-error" onBlur={(event) => syncAriaInvalid(event.currentTarget)} onInput={(event) => syncAriaInvalid(event.currentTarget)} />
          <p id="contact-email-error" className="contact-field-error"><LocalizedText es="Usá un email válido." en="Use a valid email." /></p>
        </div>
      </div>

      <div className="contact-field-row">
        <div className="contact-field">
          <label htmlFor="contact-phone"><LocalizedText es="Teléfono" en="Phone" /></label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={80} inputMode="tel" />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-company"><LocalizedText es="Empresa" en="Company" /></label>
          <input id="contact-company" name="company" type="text" autoComplete="organization" maxLength={160} />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-project-type"><LocalizedText es="Tipo de proyecto" en="Project type" /></label>
        <select id="contact-project-type" name="projectType" defaultValue="">
          <option value=""><LocalizedText es="Seleccioná una opción" en="Select an option" /></option>
          <option value="website"><LocalizedText es="Sitio web / landing" en="Website / landing page" /></option>
          <option value="business-system"><LocalizedText es="Sistema interno" en="Internal system" /></option>
          <option value="automation"><LocalizedText es="Automatización" en="Automation" /></option>
          <option value="consulting"><LocalizedText es="Consultoría" en="Consulting" /></option>
        </select>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message"><LocalizedText es="Contame el problema *" en="Tell me about the problem *" /></label>
        <textarea id="contact-message" name="message" rows={5} required minLength={10} maxLength={8000} aria-describedby="contact-message-error" onBlur={(event) => syncAriaInvalid(event.currentTarget)} onInput={(event) => syncAriaInvalid(event.currentTarget)} />
        <p id="contact-message-error" className="contact-field-error"><LocalizedText es="Escribí al menos 10 caracteres." en="Write at least 10 characters." /></p>
      </div>

      <div className="hp-field" aria-hidden="true">
        <label htmlFor="contact-hp">Company website</label>
        <input id="contact-hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey ? <div ref={turnstileRef} className="turnstile-wrap" /> : null}

      <button type="submit" className="button-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
        <span><LocalizedText es={isSubmitting ? "Enviando..." : "Enviar mensaje"} en={isSubmitting ? "Sending..." : "Send message"} /></span>
        <span aria-hidden="true">→</span>
      </button>

      <div className="contact-status" aria-live="polite">
        {currentError ? <p className="form-error"><LocalizedText es={currentError.es} en={currentError.en} /></p> : null}
        {sent ? <p className="form-success"><LocalizedText es="✓ Mensaje enviado. Te respondo pronto." en="✓ Message sent. I'll get back to you soon." /></p> : null}
      </div>
    </form>
  );
}
