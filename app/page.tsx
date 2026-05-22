import { About } from "@/components/sections/about";
import { Benefits } from "@/components/sections/benefits";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { LocalizedText } from "@/components/ui/localized-text";

const navItems = [
  ["#services", "Services", "Servicios"],
  ["#projects", "Projects", "Proyectos"],
  ["#process", "Process", "Proceso"],
  ["#contact", "Contact", "Contacto"],
] as const;

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav className="container flex items-center justify-between py-4" aria-label="Primary navigation">
          <a href="#home" className="font-display text-lg font-semibold tracking-tight text-graphite">
            &lt;GU<span className="text-brand-blue">.</span>Solutions&gt;
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map(([href, en, es]) => (
              <a key={href} className="nav-link" href={href}>
                <LocalizedText en={en} es={es} />
              </a>
            ))}
          </div>
          <LanguageToggle />
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Benefits />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
