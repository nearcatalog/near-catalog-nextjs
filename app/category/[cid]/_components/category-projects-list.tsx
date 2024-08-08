"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ProjectsList from "@/components/ui/project-list";
import { useSearchStore } from "@/store/search-store";

const ITEMS_PER_PAGE = 12;

interface CategoryProjectsListProps {
  projects: Record<ProjectId, ProjectRecord>;
}

export default function CategoryProjectsList({
  projects,
}: CategoryProjectsListProps) {
  const [projectsList, setProjectsList] = useState<ProjectRecord[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ProjectRecord[]>(
    [],
  );
  const { setTags, setSearchKey } = useSearchStore();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    setProjectsList(Object.values(projects));
    setTags([]);
    setSearchKey("");
  }, [projects, setTags, setSearchKey]);

  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedProjects(projectsList.slice(0, endIndex));
    setHasMore(endIndex < projectsList.length);
  }, [projectsList, page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  return (
    <>
      <ProjectsList projects={displayedProjects} />
      {hasMore && <div ref={ref} style={{ height: "20px" }}></div>}
    </>
  );
}
