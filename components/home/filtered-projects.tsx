"use client";

import { useSearchStore } from "@/store/search-store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";

import Project from "../project";
import Link from "next/link";
import MobileDropdown from "./mobile-dropdown";

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
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const projects = await getProjects();
      setProjects(projects);
      setLoading(false);
    };
    fetchData();
  }, []);

  const projectValues: ProjectType[] = Object.values(projects);

  let filteredProjects = projectValues.filter((project: any) => {
    const projectTags: string[] = Object.values(project.profile.tags);
    return projectTags.some((tag: string) => tags.includes(tag));
  });

  if (searchKey !== "") {
    filteredProjects = filteredProjects
      .filter((project: any) => {
        const projectName = project.profile.name.toLowerCase();

        return projectName.startsWith(searchKey.toLowerCase());
      })
      .sort();
  }

  if (tags.length === 0) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/error.webp"}
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
        {loading ? (
          <h2 className="flex items-center gap-2">
            Loading Projects <Loader className="h-6 w-6 animate-spin" />
          </h2>
        ) : (
          <>
            <Image
              src={"/assets/error.webp"}
              alt={"Not found error"}
              width={182}
              height={144}
            />
            <h2>Sorry, we could not find the results for:</h2>
            <p className="text-2xl uppercase">{searchKey}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <MobileDropdown projects={projectValues} />
      <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.values(filteredProjects).map((project: any) => (
          <Project key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
