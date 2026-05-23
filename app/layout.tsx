import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const siteUrl = new URL("https://gusolutions.com.ar");
const siteTitle = "GU Solutions | Soluciones de software a medida";
const siteDescription =
  "GU Solutions crea sitios web, sistemas internos y herramientas digitales a medida para ayudar a empresas y profesionales a automatizar procesos, mejorar operaciones y crecer.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "GU Solutions",
  title: {
    default: siteTitle,
    template: "%s | GU Solutions",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "GU Solutions",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/logo.png",
        width: 1448,
        height: 1086,
        alt: "GU Solutions logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "1254x1254" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png", type: "image/png", sizes: "1254x1254" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
