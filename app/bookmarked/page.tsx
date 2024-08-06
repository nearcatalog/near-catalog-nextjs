"use client";

import SectionHeading from "@/components/ui/section-heading";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAllProjects } from "@/lib/near-catalog";
import { ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";

export default function Bookmarked() {
  const [projects, setProjects] = useState<Record<string, ProjectRecord>>();
  const [loading, setLoading] = useState(false);
  let starredProjects: string[] = [];
  let starredProjectsString = localStorage.getItem("starredProjects");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const projects = await fetchAllProjects();
      setProjects(projects);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (starredProjectsString) {
    starredProjects = JSON.parse(starredProjectsString);
  }

  return (
    <main>
      <SectionHeading
        title="Bookmarked Projects"
        description="Your bookmarked projects"
      />
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
    </main>
  );
}
