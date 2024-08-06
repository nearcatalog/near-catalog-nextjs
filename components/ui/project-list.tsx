import Image from "next/image";
import { ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";
import MobileDropdown from "@/components/home/mobile-dropdown";

interface ProjectsListProps {
  projects: ProjectRecord[];
  allProjects: ProjectRecord[];
}

export default function ProjectsList({ projects, allProjects }: ProjectsListProps) {
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
      <MobileDropdown projects={allProjects} />
      <div className="projects-desktop mt-4 hidden max-w-full grid-cols-3 place-items-center items-stretch gap-4 md:grid lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} maxWidth />
        ))}
      </div>
      <div className="projects-mobile mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:hidden">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} maxWidth />
        ))}
      </div>
    </>
  );
}