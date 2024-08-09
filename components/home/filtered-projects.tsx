"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchStore } from "@/store/search-store";
import { useSearchModalStore } from "@/store/search-modal-store";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ProjectsList from "@/components/ui/project-list";
import Image from "next/image";
import ErrorImage from "@/public/assets/images/error.webp";
import ProjectSkeleton from "../ui/project-skeleton";

const ITEMS_PER_PAGE = 12;

interface FilterProjectsProps {
  projects: Record<ProjectId, ProjectRecord>;
  searchKey?: string;
}

export default function FilterProjects({
  projects,
  searchKey,
}: FilterProjectsProps) {
  const { tags, searchKey: globalSearchKey } = useSearchStore();
  const [filteredProjects, setFilteredProjects] = useState<ProjectRecord[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ProjectRecord[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const activeSearchKey = searchKey || globalSearchKey;

  const filterProjects = useCallback(() => {
    let result = Object.values(projects);

    if (tags.length > 0) {
      result = result.filter((project) => {
        const projectTags = Object.values(project.profile.tags);
        return tags.some((tag: any) => projectTags.includes(tag));
      });
    }

    if (activeSearchKey !== "") {
      result = result.filter((project) => {
        const projectName = project.profile.name.toLowerCase();
        return projectName.startsWith(activeSearchKey.toLowerCase());
      });
    }

    setFilteredProjects(result);
    setPage(1);
    setHasMore(result.length > ITEMS_PER_PAGE);
  }, [projects, tags, activeSearchKey]);

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
      {filteredProjects.length === 0 ? (
        activeSearchKey !== "" ? (
          <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
            <Image
              src={ErrorImage}
              alt={"Not found error"}
              width={182}
              height={144}
            />
            <h2>Sorry, we could not find any results for</h2>
            <p className="text-2xl uppercase">{activeSearchKey}</p>
          </div>
        ) : (
          <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))}
          </div>
        )
      ) : (
        <>
          <ProjectsList projects={displayedProjects} />
          {hasMore && <div ref={ref} style={{ height: "20px" }}></div>}
        </>
      )}
    </>
  );
}
