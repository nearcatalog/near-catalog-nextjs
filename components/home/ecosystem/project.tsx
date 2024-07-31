"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProjectType } from "@/lib/types";
import { useRouter } from "next/navigation";

interface ProjectProps {
  project: string;
}

const TITLE_MAX_CHARACTERS = 25;
const DESCRIPTION_MAX_CHARACTERS = 63;

function SkeletonProject() {
  return (
    <div className="flex w-full max-w-60 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl bg-black p-4 pt-2">
      <div className="h-16 w-16 animate-pulse rounded-full bg-gray-900" />
      <div className="mb-2 h-4 w-full animate-pulse rounded-full bg-gray-900" />
      <div className="h-3 w-full animate-pulse rounded-full bg-gray-900" />
      <div className="h-3 w-full animate-pulse rounded-full bg-gray-900" />
    </div>
  );
}

export default function Project({ project }: ProjectProps) {
  const [projectData, setProjectData] = useState<null | ProjectType>();
  const router = useRouter();

  useEffect(() => {
    fetch(
      `https://nearcatalog.xyz/wp-json/nearcatalog/v1/project?pid=${project}`,
    )
      .then((res) => res.json())
      .then((data) => setProjectData(data))
      .catch((err) => {
        throw new Error(err);
      });
  }, [project]);

  if (!projectData) {
    return <SkeletonProject />;
  }

  const title = projectData.profile.name;
  const truncatedTitle =
    title.length > TITLE_MAX_CHARACTERS
      ? `${Array.from(title).slice(0, TITLE_MAX_CHARACTERS).join("")}...`
      : title;

  const description = projectData.profile.tagline;
  const truncatedDescription =
    description.length > DESCRIPTION_MAX_CHARACTERS
      ? `${Array.from(description).slice(0, DESCRIPTION_MAX_CHARACTERS).join("")}...`
      : description;

  return (
    <div
      onClick={() => router.push(`/project/${project}`)}
      className="flex w-full max-w-60 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-black p-4 pt-2"
      style={{
        userSelect: "none",
      }}
    >
      <Image
        src={projectData.profile.image.url}
        alt="Project Image"
        className="pointer-events-none size-16 rounded-full bg-gray-900 object-cover"
        width={64}
        height={64}
      />
      <h3 className="max-w-full break-words text-center font-medium text-[#FFFFFFE5]">
        {truncatedTitle}
      </h3>
      <p className="max-w-full break-words text-center text-xs font-medium text-[#7E7E7E]">
        {truncatedDescription}
      </p>
    </div>
  );
}
