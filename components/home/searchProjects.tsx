"use client";

import { fetchAllProjects, searchProjects } from "@/lib/near-catalog";
import { ProjectId, ProjectRecord } from "@/lib/types";
import { useSearchStore } from "@/store/search-store";
import { useEffect, useState } from "react";
import ProjectSkeleton from "@/components/ui/project-skeleton";
import ProjectsList from "@/components/ui/project-list";
import ErrorImage from "@/public/assets/images/error.webp";
import Image from "next/image";
import { useDebounce } from "use-debounce";

interface SearchProjectsProps {
  searchKey?: string;
}

export default function SearchProjects({ searchKey }: SearchProjectsProps) {
  const { searchKey: globalSearchKey } = useSearchStore();
  const [projects, setProjects] = useState<Record<ProjectId, ProjectRecord>>();
  const [loading, setLoading] = useState(false);

  const activeSearchKey = searchKey || globalSearchKey;
  const [debouncedSearchKey] = useDebounce(activeSearchKey, 500);

  // use effect to fetch all projects if no search key is provided
  useEffect(() => {
    if (!debouncedSearchKey) {
      setLoading(true);
      fetchAllProjects()
        .then((data) => setProjects(data))
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [debouncedSearchKey]);

  // use effect to fetch projects by keywords if search key is provided
  useEffect(() => {
    if (debouncedSearchKey) {
      setLoading(true);
      searchProjects(debouncedSearchKey)
        .then((data) => setProjects(data))
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [debouncedSearchKey]);

  if (!projects) {
    return loading ? (
      <div className="projects-list-skeleton mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProjectSkeleton key={index} />
        ))}
      </div>
    ) : (
      <div className="error-message mt-16 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          height={144}
        />
        <h2>Sorry, we could not find any results for</h2>
        <p className="text-2xl uppercase">{debouncedSearchKey}</p>
      </div>
    );
  }

  return (
    <>
      <ProjectsList projects={Object.values(projects)} />
    </>
  );
}
