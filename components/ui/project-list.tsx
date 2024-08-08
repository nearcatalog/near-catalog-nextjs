"use client";

import Image from "next/image";
import { ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";
import { useSearchStore } from "@/store/search-store";
import ProjectSkeleton from "@/components/ui/project-skeleton";
import ErrorImage from "@/public/assets/images/error.webp";

interface ProjectsListProps {
  projects: ProjectRecord[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const { tags, searchKey } = useSearchStore();
  if ((tags.length || searchKey) && projects.length === 0) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          placeholder="blur"
          height={144}
        />
        <h2>Sorry, we could not find any results for</h2>
        <p className="text-2xl uppercase">{searchKey || tags.join(", ")}</p>
      </div>
    );
  } else if (projects.length === 0 && !searchKey && !tags.length) {
    return (
      <div>
        <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProjectSkeleton key={index} />
          ))}
        </div>
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
