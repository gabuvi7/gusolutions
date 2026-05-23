import { LocalizedText } from "@/components/ui/localized-text";
import { ContactForm } from "@/components/ui/contact-form";

const linkedInUrl = "https://www.linkedin.com/in/uviedo-gabriel/";
const portalUrl =
  process.env.NEXT_PUBLIC_PORTAL_URL?.trim() ||
  "https://portal.gusolutions.com.ar/login";
const whatsappMessage =
  "Hola Gabriel, vengo desde la web de GU Solutions y me gustaría consultar por un proyecto.";
const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  : `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

const contactLinks = [
  {
    href: whatsappUrl,
    es: "Contactar por WhatsApp",
    en: "Contact on WhatsApp",
  },

  {
    href: linkedInUrl,
    es: "LinkedIn /uviedo-gabriel",
    en: "LinkedIn /uviedo-gabriel",
  },
  {
    href: portalUrl,
    es: "Portal de clientes",
    en: "Client portal",
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="contact-wrap">
        <div className="contact-left">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">
            <LocalizedText
              es="Contame tu proyecto"
              en="Tell me about your project"
            />
          </h2>
          <p className="contact-lead">
            <LocalizedText
              es="Una llamada de 20 minutos alcanza para entender si puedo ayudarte."
              en="A 20-minute call is enough to see if I can help."
            />
          </p>
          <p className="contact-sub">
            <LocalizedText
              es="Si es buen match, te paso una propuesta con alcance, timeline y presupuesto en 3-5 días. Si no, te recomiendo a quién hablar."
              en="If it's a good match, I'll send you a proposal with scope, timeline, and budget in 3-5 days. If not, I'll recommend who to talk to."
            />
          </p>
          <div className="contact-links" aria-label="Contact options">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                className="contact-link"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener" : undefined}
              >
                <span>
                  <LocalizedText es={link.es} en={link.en} />
                </span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
