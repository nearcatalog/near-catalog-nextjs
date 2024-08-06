"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchStore } from "@/store/search-store";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ProjectsList from "@/components/ui/project-list";

const ITEMS_PER_PAGE = 12;

interface FilterProjectsProps {
  projects: Record<ProjectId, ProjectRecord>;
}

export default function FilterProjects({ projects }: FilterProjectsProps) {
  const { tags, searchKey } = useSearchStore();
  const [filteredProjects, setFilteredProjects] = useState<ProjectRecord[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ProjectRecord[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const filterProjects = useCallback(() => {
    let result = Object.values(projects);

    if (tags.length > 0) {
      result = result.filter((project) => {
        const projectTags = Object.values(project.profile.tags);
        return tags.some((tag: any) => projectTags.includes(tag));
      });
    }

    if (searchKey !== "") {
      result = result.filter((project) => {
        const projectName = project.profile.name.toLowerCase();
        return projectName.startsWith(searchKey.toLowerCase());
      });
    }

    setFilteredProjects(result);
    setPage(1);
    setHasMore(result.length > ITEMS_PER_PAGE);
  }, [projects, tags, searchKey]);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedProjects(filteredProjects.slice(0, endIndex));
    setHasMore(endIndex < filteredProjects.length);
  }, [filteredProjects, page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  return (
    <>
      <ProjectsList
        projects={displayedProjects}
        allProjects={Object.values(projects)}
      />
      {hasMore && <div ref={ref} style={{ height: "20px" }}></div>}
    </>
  );
}
