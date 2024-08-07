import Image from "next/image";
import { ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";

interface ProjectsListProps {
  projects: ProjectRecord[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/images/error.webp"}
          alt={"Not found error"}
          width={182}
          height={144}
        />
        <h2>Sorry, we could not find any results</h2>
      </div>
    );
  }

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
