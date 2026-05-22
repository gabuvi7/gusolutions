import { t } from "@/lib/i18n";
import { LocalizedText } from "@/components/ui/localized-text";

export function Hero() {
  return (
    <section id="home" className="section grid min-h-[calc(100dvh-var(--header-height))] items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <p className="eyebrow">GU Solutions · Custom systems</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold tracking-tight text-graphite sm:text-7xl">
          <LocalizedText es={t("heroTitle", "es")} en={t("heroTitle", "en")} />
        </h1>
        <p className="section-copy">
          <LocalizedText es={t("heroCopy", "es")} en={t("heroCopy", "en")} />
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a className="button-primary" href="#contact"><LocalizedText es="Agendar llamada" en="Book a call" /></a>
          <a className="button-secondary" href="#projects"><LocalizedText es="Ver proyectos" en="See work" /></a>
        </div>
      </div>
      <aside className="card" aria-label="GU Solutions at a glance">
        <dl className="grid grid-cols-2 gap-5">
          {[["7+", "Años creando", "Years building"], ["E2E", "De idea a producción", "Idea to production"], ["30d", "Garantía post-entrega", "Post-launch warranty"], ["AR", "Buenos Aires · remoto", "Buenos Aires · remote"]].map(([value, es, en]) => (
            <div key={value}>
              <dt className="text-3xl font-bold text-brand-navy">{value}</dt>
              <dd className="mt-1 text-sm text-slate-600"><LocalizedText es={es} en={en} /></dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
