import { LocalizedText } from "@/components/ui/localized-text";

export function Benefits() {
  return (
    <section id="benefits" className="section">
      <p className="eyebrow">Benefits</p>
      <h2 className="section-title"><LocalizedText es="Menos planillas, menos errores, más control" en="Fewer spreadsheets, fewer mistakes, more control" /></h2>
      <div className="card-grid">
        {[
          ["Claridad operativa", "Operational clarity"],
          ["Automatización real", "Real automation"],
          ["Base técnica escalable", "Scalable technical base"],
        ].map(([es, en]) => <article key={en} className="card"><h3 className="font-display text-xl font-semibold"><LocalizedText es={es} en={en} /></h3></article>)}
      </div>
    </section>
  );
}
