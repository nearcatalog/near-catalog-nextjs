"use client";

import { ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ProjectsListProps {
  projects: ProjectRecord[];
}

const ITEMS_PER_PAGE = 12;

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [displayedProjects, setDisplayedProjects] = useState<ProjectRecord[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(projects.length > ITEMS_PER_PAGE);
  const { ref, inView } = useInView();

  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedProjects(projects.slice(0, endIndex));
    setHasMore(endIndex < projects.length);
  }, [projects, page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  return (
    <>
      <div className="projects-list mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} maxWidth />
        ))}
      </div>
      {hasMore && <div ref={ref} style={{ height: "20px" }}></div>}
    </>
  );
}
