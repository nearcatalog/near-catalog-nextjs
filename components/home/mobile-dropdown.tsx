"use client";
import { useSearchStore } from "@/store/search-store";
import Link from "next/link";

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
      className={`shadow-[rgba(0, 0, 0, 0.55)] absolute left-1/2 top-0 mt-16 flex w-full max-w-72 -translate-x-1/2 flex-col gap-1 rounded-3xl border border-[#BEBDBE] bg-[#1A1A17] py-4 text-white shadow-lg ${showOnDesktop ? "" : "md:hidden"}`}
    >
      {filteredProjects.length ? (
        filteredProjects.map((project: any) => (
          <Link
            href={`/project/${project.slug}`}
            key={project.slug}
            onClick={() => setSearchKey("")}
            className="rounded-lg bg-[#1A1A17] px-12 py-2 hover:bg-[#1c1b2a]"
          >
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
