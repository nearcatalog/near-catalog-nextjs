"use client";
import { useSearchStore } from "@/store/search-store";
import Link from "next/link";
import Image from "next/image";
import { ProjectType } from "@/lib/types";

export default function MobileDropdown({
  projects,
  showOnDesktop,
}: {
  projects: ProjectType[];
  showOnDesktop?: boolean;
}) {
  const { searchKey, setSearchKey } = useSearchStore();

  if (searchKey === "") {
    return null;
  }

  const filteredProjects = projects
    .filter((project: any) => {
      const projectName = project.profile.name.toLowerCase();

      return projectName.startsWith(searchKey.toLowerCase());
    })
    .sort();

  return (
    <div
      className={`shadow-[rgba(0, 0, 0, 0.55)] container absolute left-1/2 top-0 z-20 mt-16 flex -translate-x-1/2 flex-col gap-1 rounded-3xl border border-[#BEBDBE] bg-[#1A1A17] py-4 text-white shadow-lg ${showOnDesktop ? "" : "md:hidden"}`}
    >
      {filteredProjects.length ? (
        filteredProjects.map((project: any) => (
          <Link
            href={`/project/${project.slug}#top`}
            key={project.slug}
            onClick={() => setSearchKey("")}
            className="flex flex-wrap items-center gap-2 rounded-lg bg-[#1A1A17] px-12 py-2 hover:bg-[#1c1b2a]"
          >
            <Image
              src={project.profile.image.url}
              alt={project.profile.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            {project.profile.name}
          </Link>
        ))
      ) : (
        <div className="text-center text-sm">
          &apos;{searchKey}&apos; not found
        </div>
      )}
    </div>
  );
}
