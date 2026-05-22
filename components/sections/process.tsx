import { LocalizedText } from "@/components/ui/localized-text";

const steps = [
  ["01", "Diagnóstico", "Discovery"],
  ["02", "Diseño técnico", "Technical design"],
  ["03", "Implementación", "Implementation"],
  ["04", "Acompañamiento", "Support"],
];

export function Process() {
  return (
    <section id="process" className="section">
      <p className="eyebrow">Process</p>
      <h2 className="section-title"><LocalizedText es="Un proceso claro, sin magia ni humo" en="A clear process, no magic tricks" /></h2>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {steps.map(([number, es, en]) => (
          <article key={number} className="card">
            <p className="text-sm font-bold text-brand-blue">{number}</p>
            <h3 className="mt-3 font-display text-xl font-semibold"><LocalizedText es={es} en={en} /></h3>
          </article>
        ))}
      </div>
    </section>
  );
}
