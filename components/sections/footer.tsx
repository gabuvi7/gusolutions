import { LocalizedText } from "@/components/ui/localized-text";
import { TrackedLink } from "@/components/ui/tracked-link";

const copyrightYear = new Date().getFullYear();
const portalUrl =
  process.env.NEXT_PUBLIC_PORTAL_URL?.trim() ||
  "https://portal.gusolutions.com.ar/login";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="container flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {copyrightYear} GU Solutions</p>
        <TrackedLink
          href={portalUrl}
          target="_blank"
          rel="noopener"
          className="transition hover:text-brand-blue"
          eventName="client_portal_click"
          eventProperties={{ location: "footer" }}
        >
          <LocalizedText es="Portal de clientes" en="Client portal" />
        </TrackedLink>
      </div>
    </footer>
  );
}
