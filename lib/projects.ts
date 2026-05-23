import { cacheLife, cacheTag } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database";

type ProjectRow = Tables<"website_projects">;

export type ProjectCardModel = {
  slug: string;
  titleEs: string;
  titleEn: string;
  clientName: string | null;
  category: string | null;
  shortDescriptionEs: string;
  shortDescriptionEn: string;
  technologies: string[];
  mainImageUrl: string | null;
  projectUrl: string | null;
  isFeatured: boolean;
  isInProgress: boolean;
  sortOrder: number;
};

const fallbackProjects: ProjectCardModel[] = [
  {
    slug: "billing-backoffice",
    titleEs: "Backoffice de facturación",
    titleEn: "Billing backoffice",
    clientName: null,
    category: "Operations",
    shortDescriptionEs: "Sistema interno para ordenar facturación, caja y seguimiento operativo.",
    shortDescriptionEn: "Internal system to organize billing, cash flow and operational tracking.",
    technologies: ["Next.js", "Supabase", "Automation"],
    mainImageUrl: null,
    projectUrl: null,
    isFeatured: true,
    isInProgress: false,
    sortOrder: 1,
  },
  {
    slug: "ticket-operations",
    titleEs: "Gestión de tickets",
    titleEn: "Ticket operations",
    clientName: null,
    category: "Support",
    shortDescriptionEs: "Flujo de soporte para priorizar solicitudes y reducir trabajo manual.",
    shortDescriptionEn: "Support flow to prioritize requests and reduce manual work.",
    technologies: ["Workflow", "Dashboards", "SLA"],
    mainImageUrl: null,
    projectUrl: null,
    isFeatured: false,
    isInProgress: false,
    sortOrder: 2,
  },
  {
    slug: "reporting-dashboards",
    titleEs: "Dashboards de reportes",
    titleEn: "Reporting dashboards",
    clientName: null,
    category: "Analytics",
    shortDescriptionEs: "Vistas ejecutivas para entender métricas clave sin planillas dispersas.",
    shortDescriptionEn: "Executive views to understand key metrics without scattered spreadsheets.",
    technologies: ["BI", "Data modeling", "KPIs"],
    mainImageUrl: null,
    projectUrl: null,
    isFeatured: false,
    isInProgress: true,
    sortOrder: 3,
  },
];

function normalizeProject(project: ProjectRow): ProjectCardModel {
  return {
    slug: project.slug,
    titleEs: project.title_es,
    titleEn: project.title_en ?? project.title_es,
    clientName: project.client_name,
    category: project.category,
    shortDescriptionEs: project.short_description_es,
    shortDescriptionEn: project.short_description_en ?? project.short_description_es,
    technologies: project.technologies ?? [],
    mainImageUrl: project.main_image_url,
    projectUrl: project.project_url,
    isFeatured: project.is_featured,
    isInProgress: project.is_in_progress,
    sortOrder: project.sort_order,
  };
}

export async function getPublishedProjects(): Promise<ProjectCardModel[]> {
  "use cache";

  cacheLife("hours");
  cacheTag("projects");

  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return fallbackProjects;
  }

  const { data, error } = await supabase
    .from("website_projects")
    .select(
      "slug,title_es,title_en,client_name,category,short_description_es,short_description_en,technologies,main_image_url,project_url,is_featured,is_in_progress,sort_order,is_published,created_at,updated_at,id",
    )
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load published projects from Supabase", error);
    return fallbackProjects;
  }

  return data.map(normalizeProject);
}
