import { LocalizedText } from "@/components/ui/localized-text";
import { ProjectCard } from "@/components/ui/project-card";
import { getPublishedProjects } from "@/lib/projects";

export async function Projects() {
  const projects = await getPublishedProjects();

  return (
    <section id="projects" className="section">
      <p className="eyebrow">Projects</p>
      <h2 className="section-title"><LocalizedText es="Casos que muestran el tipo de operación que resolvemos" en="Work that shows the operations we solve" /></h2>

      {projects.length > 0 ? (
        <div className="card-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="card mt-10">
          <p className="text-slate-600">
            <LocalizedText
              es="Todavía no hay proyectos publicados. Volvé pronto para ver casos nuevos."
              en="There are no published projects yet. Check back soon for new case studies."
            />
          </p>
        </div>
      )}
    </section>
  );
}
