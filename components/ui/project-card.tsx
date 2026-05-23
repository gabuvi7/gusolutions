"use client";

import { LocalizedText } from "@/components/ui/localized-text";
import { trackConversion } from "@/components/ui/analytics";
import type { ProjectCardModel } from "@/lib/projects";

export function ProjectCard({ project }: { project: ProjectCardModel }) {
  return (
    <article
      className="card flex min-h-full flex-col overflow-hidden p-0"
      onClick={() => {
        trackConversion("project_card_click", {
          project_slug: project.slug,
          has_project_url: Boolean(project.projectUrl),
        });
      }}
    >
      {project.mainImageUrl ? (
        <img
          src={project.mainImageUrl}
          alt=""
          className="h-40 w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="h-40 bg-gradient-to-br from-brand-soft via-white to-slate-100" aria-hidden="true" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
          {project.category ? <span>{project.category}</span> : null}
          {project.isFeatured ? <span><LocalizedText es="Destacado" en="Featured" /></span> : null}
          {project.isInProgress ? <span><LocalizedText es="En progreso" en="In progress" /></span> : null}
        </div>

        <h3 className="font-display text-xl font-semibold text-graphite">
          <LocalizedText es={project.titleEs} en={project.titleEn} />
        </h3>

        {project.clientName ? <p className="mt-2 text-sm font-medium text-slate-500">{project.clientName}</p> : null}

        <p className="mt-4 flex-1 text-slate-600">
          <LocalizedText es={project.shortDescriptionEs} en={project.shortDescriptionEn} />
        </p>

        {project.technologies.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Project technologies">
            {project.technologies.map((technology) => (
              <li key={technology} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-navy">
                {technology}
              </li>
            ))}
          </ul>
        ) : null}

        {project.projectUrl ? (
          <a
            className="mt-6 text-sm font-semibold text-brand-blue hover:text-brand-navy"
            href={project.projectUrl}
            onClick={(event) => {
              event.stopPropagation();
              trackConversion("external_project_url_click", {
                project_slug: project.slug,
              });
            }}
          >
            <LocalizedText es="Ver proyecto" en="View project" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
