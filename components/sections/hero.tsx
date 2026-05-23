import { t } from "@/lib/i18n";
import { LocalizedText } from "@/components/ui/localized-text";

const stats = [
  ["7+", "Años construyendo", "Years building"],
  ["2", "Sistemas en producción", "Systems in production"],
  ["E2E", "Sistema completo", "End-to-end system"],
  ["30d", "Garantía post-entrega", "Post-launch warranty"],
] as const;

export function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <div className="hero-eyebrow-row">
          <p className="eyebrow">GU Solutions · <LocalizedText es="Sistemas a medida" en="Custom systems" /></p>
          <span className="hero-status">
            <span className="hero-status-dot" aria-hidden="true" />
            <LocalizedText es="Disponible para nuevos proyectos" en="Available for new projects" />
          </span>
        </div>
        <h1 className="hero-title">
          <span className="lang-es">Construyo <em>sistemas</em> que hacen que tu operación funcione sola.</span>
          <span className="lang-en">I build <em>systems</em> that make your operations run on their own.</span>
        </h1>
        <p className="hero-subtitle">
          <LocalizedText es={t("heroCopy", "es")} en={t("heroCopy", "en")} />
        </p>
        <div className="hero-cta">
          <a className="button-primary" href="#contact">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <LocalizedText es="Agendar llamada de 20'" en="Book a 20-min call" />
          </a>
          <a className="button-secondary" href="#projects"><LocalizedText es="Ver proyectos" en="See work" /></a>
        </div>
      </div>
      <aside className="hero-card" aria-label="GU Solutions at a glance">
        <div className="hero-card-head">
          <span><LocalizedText es="Resumen" en="At a glance" /></span>
          <span aria-hidden="true">—</span>
        </div>
        <dl className="hero-stats">
          {stats.map(([value, es, en]) => (
            <div className="hero-stat" key={value}>
              <dt>{value}</dt>
              <dd><LocalizedText es={es} en={en} /></dd>
            </div>
          ))}
        </dl>
        <div className="hero-card-foot">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <LocalizedText es="Buenos Aires · remoto global" en="Buenos Aires · remote worldwide" />
        </div>
      </aside>
    </section>
  );
}
