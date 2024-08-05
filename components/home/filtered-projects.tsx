"use client";

import { useSearchStore } from "@/store/search-store";
import Image from "next/image";

import Project from "../ui/project";
import { ProjectType } from "@/lib/types";
import MobileDropdown from "./mobile-dropdown";

interface FilteredProjectsProps {
  projects: ProjectType[];
}

export default function FilteredProjects({ projects }: FilteredProjectsProps) {
  const { tags, searchKey } = useSearchStore();

  const projectValues: ProjectType[] = Object.values(projects);

  let filteredProjects = projectValues;

  if (tags.length > 0) {
    filteredProjects = filteredProjects.filter((project: any) => {
      const projectTags = Object.values(project.profile.tags);
      return tags.some((tag: string) => projectTags.includes(tag));
    });
  }

  if (searchKey !== "") {
    filteredProjects = filteredProjects.filter((project: any) => {
      const projectName = project.profile.name.toLowerCase();
      return projectName.startsWith(searchKey.toLowerCase());
    });
  }

  if (tags.length === 0) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/images/error.webp"}
          alt={"Not found error"}
          width={182}
          height={144}
        />
        <h2>No Tags Selected</h2>
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/images/error.webp"}
          alt={"Not found error"}
          width={182}
          height={144}
        />
        <h2>Sorry, we could not find the results for:</h2>
        <p className="text-2xl uppercase">{searchKey}</p>
      </div>
    );
  }

  return (
    <>
      <MobileDropdown projects={projectValues} />
      <div className="mt-4 hidden max-w-full grid-cols-3 place-items-center items-stretch gap-4 md:grid lg:grid-cols-4">
        {Object.values(filteredProjects).map((project: any) => (
          <Project key={project.slug} project={project} maxWidth />
        ))}
      </div>
      <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:hidden">
        {Object.values(projects).map((project: any) => (
          <Project key={project.slug} project={project} maxWidth />
        ))}
      </div>
    </>
  );
}
