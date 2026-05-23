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

const portalUrl =
  process.env.NEXT_PUBLIC_PORTAL_URL?.trim() ||
  "https://portal.gusolutions.com.ar/login";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav
          className="container flex items-center justify-between gap-4 py-3"
          aria-label="Primary navigation"
        >
          <a href="#home" className="nav-brand" aria-label="GU Solutions home">
            <img
              src="/icon.svg"
              alt="GU Solutions"
              width="1254"
              height="1254"
              className="nav-brand-logo"
            />
          </a>
          <div className="nav-center">
            <div className="hidden items-center gap-7 md:flex">
              {navItems.map(([href, en, es]) => (
                <a key={href} className="nav-link" href={href}>
                  <LocalizedText en={en} es={es} />
                </a>
              ))}
            </div>
          </div>
          <div className="nav-actions">
            <a
              className="nav-portal-link"
              href={portalUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="nav-portal-full">
                <LocalizedText es="Portal de clientes" en="Client dashboard" />
              </span>
              <span className="nav-portal-short">Portal</span>
              <span aria-hidden="true">↗</span>
            </a>
            <LanguageToggle />
          </div>
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
