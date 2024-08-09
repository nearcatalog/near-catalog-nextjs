"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProjectRecord } from "@/lib/types";
import { useSearchStore } from "@/store/search-store";
import { useSearchModalStore } from "@/store/search-modal-store";

interface ProjectCardProps {
  project: ProjectRecord;
  maxWidth?: boolean;
  onClick?: () => void;
}

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-2">
      {tags.map((value, key) => (
        <p
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={key}
        >
          {value}
        </p>
      ))}
    </div>
  );
};

export default function ProjectCard({ project, maxWidth }: ProjectCardProps) {
  const router = useRouter();
  const { setSearchKey } = useSearchStore();
  const { isOpen: searchModalOpen, setIsOpen: setSearchModalOpen } =
    useSearchModalStore();
  const { profile } = project;

  const title = profile.name;
  const description = profile.tagline;

  return (
    <button
      role="link"
      style={{ userSelect: "none" }}
      onClick={() => {
        router.push(`/project/${project.slug}#top`, { scroll: true });
        setSearchKey("");

        if (searchModalOpen) {
          setSearchModalOpen(false);
        }
      }}
      className={`grow-1 min-h-92 flex w-full ${maxWidth ? "" : "max-w-[20rem]"} gap- shrink-0 cursor-pointer flex-col items-start justify-start gap-3 overflow-hidden rounded-lg bg-[#11141B] px-5 py-4 transition-all duration-300 ease-in-out hover:bg-[#2b2d3a] md:justify-normal md:px-8 md:py-7`}
    >
      <div className="flex w-full items-center gap-2 overflow-hidden md:h-auto md:flex-col md:items-start">
        <Image
          className="size-[4rem] rounded-full bg-gray-700 md:size-[6rem]"
          src={profile.image.url}
          alt={profile.name}
          width={120}
          height={120}
        />
        <div className="flex flex-col gap-1">
          <h3 className="m-0 overflow-ellipsis break-words p-0 text-left text-[1.25rem] font-bold leading-tight text-white md:break-words">
            {title}
          </h3>
        </div>
      </div>
      <p className="m-0 overflow-ellipsis break-words p-0 text-left text-sm font-medium md:break-words">
        {description}
      </p>
      <Tags tags={Object.values(profile.tags)} />
    </button>
  );
}
