import Project from "./project";

interface EcosystemProjectsProps {
  projects: string[];
}

export default function EcosystemProjects({
  projects,
}: EcosystemProjectsProps) {
  return (
    <div className="mb-24 w-full rounded-b-lg bg-black/80 px-6 py-10 backdrop-blur-sm">
      <div className="flex items-stretch gap-6 overflow-x-auto">
        {projects.map((project) => (
          <Project key={project} project={project} />
        ))}
      </div>
    </div>
  );
}
