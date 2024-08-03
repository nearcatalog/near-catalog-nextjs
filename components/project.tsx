"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/lib/types";

const DESCRIPTION_MAX_CHARACTERS = 90;

interface ProjectProps {
  project: ProjectType;
  maxWidth?: boolean;
}

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-2">
      {tags.map((value, key) => (
        <p
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-full bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={key}
        >
          {value}
        </p>
      ))}
    </div>
  );
};

export default function Project({ project, maxWidth }: ProjectProps) {
  const router = useRouter();
  const { profile } = project;

  const title = profile.name;

  const description = profile.tagline;
  const truncatedDescription =
    description.length > DESCRIPTION_MAX_CHARACTERS
      ? `${Array.from(description).slice(0, DESCRIPTION_MAX_CHARACTERS).join("")}...`
      : description;

  return (
    <div
      style={{ userSelect: "none" }}
      onClick={() =>
        router.push(`/project/${project.slug}#top`, { scroll: true })
      }
      className={`grow-1 h-92 flex w-full ${maxWidth ? "" : "max-w-[20rem]"} shrink-0 cursor-pointer flex-col items-start justify-start gap-3 rounded-[32px] bg-[#11141B] px-8 py-7 md:justify-normal`}
    >
      <div className="flex h-full w-full items-center gap-2 overflow-hidden md:h-auto md:flex-col md:items-start">
        <Image
          className="size-[96px] rounded-full md:size-[120px]"
          src={profile.image.url}
          alt={profile.name}
          width={120}
          height={120}
        />
        <div className="flex flex-col gap-1">
          <h3 className="m-0 overflow-ellipsis break-words p-0 text-[32px] font-bold leading-9 text-white md:break-words">
            {title}
          </h3>
        </div>
      </div>
      <p className="m-0 break-words p-0 text-[16px] font-medium md:break-words">
        {truncatedDescription}
      </p>
      <Tags tags={Object.values(profile.tags)} />
    </div>
  );
}
