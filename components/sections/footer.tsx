import { LocalizedText } from "@/components/ui/localized-text";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="container flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} GU Solutions</p>
        <p><LocalizedText es="Portal de clientes: integración externa, fuera del MVP público." en="Client portal: external integration, outside the public MVP." /></p>
      </div>
    </footer>
  );
}
