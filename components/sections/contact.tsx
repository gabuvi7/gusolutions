import { LocalizedText } from "@/components/ui/localized-text";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="card grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title"><LocalizedText es="Contame qué operación querés ordenar" en="Tell me what operation you want to organize" /></h2>
          <p className="section-copy"><LocalizedText es="En este primer slice dejamos el punto de contacto público; el formulario con API, Turnstile y Resend queda para el slice de contacto." en="This first slice keeps the public contact point; the API form with Turnstile and Resend belongs to the contact slice." /></p>
        </div>
        <a className="button-primary" href="mailto:gabriel@gusolutions.com.ar">gabriel@gusolutions.com.ar</a>
      </div>
    </section>
  );
}
