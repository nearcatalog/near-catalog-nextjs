"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAllProjects } from "@/lib/near-catalog";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";
import ErrorImage from "@/public/assets/images/error.webp";
import { getBookmarkedProjects } from "@/lib/bookmark-project";
import ProjectSkeleton from "@/components/ui/project-skeleton";

export default function Bookmarks() {
  const [projects, setProjects] = useState<Record<string, ProjectRecord>>();
  const [loading, setLoading] = useState(true);
  const [starredProjects, setStarredProjects] = useState<ProjectId[]>([]);

  useEffect(() => {
    const starredProjects = getBookmarkedProjects();
    setStarredProjects(starredProjects);
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
      {loading
        ? null
        : starredProjects.length === 0 && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
              <Image
                src={ErrorImage}
                alt={"Not found error"}
                width={182}
                placeholder="blur"
                height={144}
              />
              <h2>No bookmarked projects found</h2>
            </div>
          )}
      <div className="projects mt-8 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {starredProjects.length > 0 &&
          typeof projects === "object" &&
          starredProjects.map((pid: ProjectId) => (
            <ProjectCard key={pid} project={projects[pid]} maxWidth />
          ))}
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))
          : null}
      </div>
    </>
  );
}
