"use client";

import { useSearchStore } from "@/store/search-store";
import { useEffect, useState } from "react";
import Image from "next/image";

import Project from "./hot-projects/project";

async function getProjects() {
  const res = await fetch(
    "https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects",
  );
  const data = await res.json();
  return data;
}

type ProjectType = {
  slug: string;
  profile: {
    name: string;
    tagline: string;
    image: {
      url: string;
    };
    tags: Record<string, string>;
  };
};

export default function FilteredProjects() {
  const { tags, searchKey } = useSearchStore();
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const projects = await getProjects();
      setProjects(projects);
    };
    fetchData();
  }, []);

  const projectValues: ProjectType[] = Object.values(projects);

  let filteredProjects = projectValues.filter((project: any) => {
    const projectTags: string[] = Object.values(project.profile.tags);
    return projectTags.some((tag: string) => tags.includes(tag));
  });

  if (searchKey !== "") {
    filteredProjects = filteredProjects.filter((project: any) => {
      const projectName = project.profile.name.toLowerCase();
      return projectName.includes(searchKey.toLowerCase());
    });
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/error.webp"}
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
    <div className="mt-4 grid max-w-full grid-cols-1 gap-4 md:grid-cols-4">
      {Object.values(filteredProjects).map((project: any) => (
        <Project key={project.slug} project={project} />
      ))}
    </div>
  );
}
