#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const BUCKET = "website-project-images";

const args = new Set(process.argv.slice(2));
const shouldApply = args.has("--apply");
const shouldSkipImages = args.has("--skip-images");

async function loadLocalEnv() {
  const envPath = path.resolve(".env.local");

  try {
    const envFile = await readFile(envPath, "utf8");

    for (const line of envFile.split(/\r?\n/)) {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmedLine.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const rawValue = trimmedLine.slice(separatorIndex + 1).trim();

      if (!key || process.env[key] !== undefined) {
        continue;
      }

      process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

await loadLocalEnv();

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (shouldApply && (!supabaseUrl || !serviceRoleKey)) {
  console.error(
    "Missing env vars. Required: SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY.",
  );
  process.exit(1);
}

const supabase = shouldApply
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })
  : null;

const projects = [
  {
    slug: "gu-solutions-backoffice",
    title_es: "Backoffice GU Solutions",
    title_en: "GU Solutions backoffice",
    client_name: "GU Solutions",
    category: "Client",
    short_description_es:
      "Panel administrativo para centralizar clientes, proyectos, tickets, horas trabajadas y facturación, con visibilidad operativa y financiera en tiempo real.",
    short_description_en:
      "Admin dashboard to centralize clients, projects, tickets, tracked hours, and invoicing, with real-time operational and financial visibility.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Admin dashboard",
      "Role-based access",
    ],
    project_url: null,
    is_featured: true,
    is_published: true,
    is_in_progress: false,
    sort_order: 1,
    images: [
      "img/backoffice/dashboard.png",
      "img/backoffice/facturacion.png",
      "img/backoffice/tickets.png",
    ],
  },
  {
    slug: "vergani-propiedades",
    title_es: "Gestión inmobiliaria",
    title_en: "Real estate management",
    client_name: "Vergani Propiedades",
    category: "Client",
    short_description_es:
      "Automatización de contratos IPC, ICL y UVA, control de caja y liquidaciones mensuales a propietarios, integrado a índices de INDEC y BCRA.",
    short_description_en:
      "Contract automation for CPI, ICL and UVA, cash control, and monthly owner payouts, integrated with INDEC and BCRA indexes.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "INDEC / BCRA API",
      "PDF generation",
    ],
    project_url: null,
    is_featured: true,
    is_published: true,
    is_in_progress: false,
    sort_order: 2,
    images: [],
  },
  {
    slug: "prensadora-marquez",
    title_es: "Caja e inventario",
    title_en: "Cash and inventory",
    client_name: "Prensadora Marquez",
    category: "Client",
    short_description_es:
      "Sistema bi-monetario ARS/USD para gestión de caja, stock en tiempo real y boletas de compra/venta para una empresa de metales.",
    short_description_en:
      "Dual-currency ARS/USD system for cash management, real-time stock, and purchase/sale receipts for a metals trading company.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Ant Design",
    ],
    project_url: null,
    is_featured: true,
    is_published: true,
    is_in_progress: false,
    sort_order: 3,
    images: [
      "img/panel.png",
      "img/caja.png",
      "img/materiales.png",
      "img/boletas.png",
      "img/lista-boletas.png",
      "img/reportes.png",
    ],
  },
  {
    slug: "fetcher-chrome-extension",
    title_es: "Extensión Chrome — Fetcher",
    title_en: "Chrome Extension — Fetcher",
    client_name: "Fetcher",
    category: "Product",
    short_description_es:
      "Prototipo interno llevado a producto publicado, con arquitectura side-panel diseñada para el workflow diario.",
    short_description_en:
      "Internal prototype taken to a published product, with a side-panel architecture designed for daily workflow.",
    technologies: ["React", "WXT", "Vite", "TypeScript"],
    project_url: null,
    is_featured: false,
    is_published: true,
    is_in_progress: false,
    sort_order: 4,
    images: [],
  },
  {
    slug: "internal-component-library",
    title_es: "Librería interna de componentes",
    title_en: "Internal component library",
    client_name: "Fetcher",
    category: "Product",
    short_description_es:
      "Sistema de componentes React usado en múltiples aplicaciones, migrado de Rollup a Vite para reducir tiempos de build.",
    short_description_en:
      "React component system used across multiple apps, migrated from Rollup to Vite to reduce build times.",
    technologies: ["React", "Ant Design v5", "Vite", "TypeScript"],
    project_url: null,
    is_featured: false,
    is_published: true,
    is_in_progress: false,
    sort_order: 5,
    images: [],
  },
  {
    slug: "pwa-microservices",
    title_es: "PWA con microservicios",
    title_en: "PWA with microservices",
    client_name: "Algeiba S.A.",
    category: "Product",
    short_description_es:
      "PWA de alto rendimiento con Redux, arquitectura de microservicios y principios SOLID en backend .NET.",
    short_description_en:
      "High-performance PWA with Redux, microservices architecture, and SOLID principles on the .NET backend.",
    technologies: ["React", "Redux", "Material UI", ".NET", "Microservices"],
    project_url: null,
    is_featured: false,
    is_published: true,
    is_in_progress: false,
    sort_order: 6,
    images: [],
  },
];

function contentTypeFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".avif":
      return "image/avif";
    case ".webp":
      return "image/webp";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    default:
      throw new Error(`Unsupported image extension: ${filePath}`);
  }
}

async function uploadProjectImages(project) {
  const publicUrls = [];

  for (const imagePath of project.images) {
    const fileName = path.basename(imagePath);
    const objectPath = `${project.slug}/${fileName}`;
    const file = await readFile(imagePath);

    const { error } = await supabase.storage.from(BUCKET).upload(objectPath, file, {
      cacheControl: "31536000",
      contentType: contentTypeFor(imagePath),
      upsert: true,
    });

    if (error) {
      throw new Error(`Failed to upload ${imagePath}: ${error.message}`);
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
    publicUrls.push(data.publicUrl);
  }

  return publicUrls;
}

async function seed() {
  console.log(
    shouldApply
      ? "Applying seed to Supabase..."
      : "Dry run. Add --apply to upload images and upsert rows.",
  );

  for (const project of projects) {
    const { images, ...row } = project;

    if (!shouldApply) {
      const payload = {
        ...row,
        main_image_url: images[0]
          ? `${supabaseUrl ?? "https://YOUR_PROJECT.supabase.co"}/storage/v1/object/public/${BUCKET}/${project.slug}/${path.basename(images[0])}`
          : null,
      };

      console.log(`[dry-run] ${project.slug}`, payload);
      continue;
    }

    const imageUrls = shouldSkipImages ? [] : await uploadProjectImages(project);
    const payload = {
      ...row,
      main_image_url: imageUrls[0] ?? null,
    };

    const { error } = await supabase
      .from("website_projects")
      .upsert(payload, { onConflict: "slug" });

    if (error) {
      throw new Error(`Failed to upsert ${project.slug}: ${error.message}`);
    }

    console.log(`Seeded ${project.slug}`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
