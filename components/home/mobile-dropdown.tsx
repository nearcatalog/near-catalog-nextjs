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

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <div
      className={`shadow-[rgba(0, 0, 0, 0.55)] absolute left-1/2 top-0 mt-16 flex w-full max-w-72 -translate-x-1/2 flex-col gap-4 rounded-3xl border border-[#BEBDBE] bg-[#1A1A17] p-4 px-12 py-4 text-white shadow-lg ${showOnDesktop ? "" : "md:hidden"}`}
    >
      {filteredProjects.map((project: any) => (
        <Link
          href={`/project/${project.slug}`}
          key={project.slug}
          onClick={() => setSearchKey("")}
        >
          {project.profile.name}
        </Link>
      ))}
    </div>
  );
}
