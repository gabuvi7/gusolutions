import { LocalizedText } from "@/components/ui/localized-text";

const projects = ["Billing backoffice", "Ticket operations", "Reporting dashboards"];

export function Projects() {
  return (
    <section id="projects" className="section">
      <p className="eyebrow">Projects</p>
      <h2 className="section-title"><LocalizedText es="Casos que muestran el tipo de operación que resolvemos" en="Work that shows the operations we solve" /></h2>
      <div className="card-grid">
        {projects.map((project) => (
          <article key={project} className="card min-h-48">
            <div className="mb-5 h-28 rounded-2xl bg-gradient-to-br from-brand-soft to-white" aria-hidden="true" />
            <h3 className="font-display text-xl font-semibold">{project}</h3>
            <p className="mt-3 text-slate-600"><LocalizedText es="Portfolio estático para PR1; Supabase llega en el próximo slice." en="Static portfolio for PR1; Supabase arrives in the next slice." /></p>
          </article>
        ))}
      </div>
    </section>
  );
}
