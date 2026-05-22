import { LocalizedText } from "@/components/ui/localized-text";

const services = [
  ["Sistemas internos", "Internal systems", "Backoffice, dashboards and operational tools."],
  ["Automatizaciones", "Automations", "Integrations that remove repetitive work from your team."],
  ["Productos web", "Web products", "Modern web apps with typed, maintainable foundations."],
];

export function Services() {
  return (
    <section id="services" className="section">
      <p className="eyebrow">Services</p>
      <h2 className="section-title"><LocalizedText es="Software a medida para operar mejor" en="Custom software for better operations" /></h2>
      <div className="card-grid">
        {services.map(([es, en, copy]) => (
          <article key={en} className="card">
            <h3 className="font-display text-2xl font-semibold"><LocalizedText es={es} en={en} /></h3>
            <p className="mt-4 text-slate-600">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
