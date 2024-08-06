"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAllProjects } from "@/lib/near-catalog";
import { ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";

export default function Bookmarks() {
  const [projects, setProjects] = useState<Record<string, ProjectRecord>>();
  const [starredProjects, setStarredProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let starredProjectsString = localStorage.getItem("starredProjects");
    if (starredProjectsString) {
      setStarredProjects(JSON.parse(starredProjectsString));
    }

    const fetchProjects = async () => {
      setLoading(true);
      const projects = await fetchAllProjects();
      setProjects(projects);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <>
      {starredProjects.length === 0 && (
        <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
          <Image
            src={"/assets/images/error.webp"}
            alt={"Not found error"}
            width={182}
            height={144}
          />
          <h2>No bookmarked projects found</h2>
        </div>
      )}
      {loading || !projects ? (
        <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
          <i className="bi bi-arrow-repeat animate-spin text-2xl"></i>
        </div>
      ) : (
        <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {starredProjects.map((projectSlug) => (
            <ProjectCard
              key={projectSlug}
              project={projects[projectSlug]}
              maxWidth
            />
          ))}
        </div>
      )}
    </>
  );
}
