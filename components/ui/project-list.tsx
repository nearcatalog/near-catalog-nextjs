import { ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";

interface ProjectsListProps {
  projects: ProjectRecord[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <>
      <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} maxWidth />
        ))}
      </div>
    </>
  );
}
