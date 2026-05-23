import { LocalizedText } from "@/components/ui/localized-text";

export function About() {
  return (
    <section id="about" className="section">
      <p className="eyebrow">About</p>
      <h2 className="section-title"><LocalizedText es="Senior software engineer con foco en producto y operación" en="Senior software engineer focused on product and operations" /></h2>
      <p className="section-copy"><LocalizedText es="Trabajo de punta a punta: entiendo el negocio, diseño la solución, construyo la base técnica y acompaño el lanzamiento." en="I work end to end: understand the business, design the solution, build the technical foundation and support the launch." /></p>
    </section>
  );
}
