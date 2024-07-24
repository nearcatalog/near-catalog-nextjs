"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

type Project = {
  name: string;
  tagline: string;
  image: {
    url: string;
  };
};

export default function Project({ project }: ProjectProps) {
  const [projectData, setProjectData] = useState<null | Project>();

  useEffect(() => {
    fetch(
      `https://nearcatalog.xyz/wp-json/nearcatalog/v1/project?pid=${project}`,
    )
      .then((res) => res.json())
      .then((data) => setProjectData(data.profile))
      .catch((err) => console.log(err));
  }, [project]);

  if (!projectData) {
    return <SkeletonProject />;
  }

  const title = projectData.name;
  const truncatedTitle =
    title.length > TITLE_MAX_CHARACTERS
      ? `${title.substring(0, TITLE_MAX_CHARACTERS)}...`
      : title;

  const description = projectData.tagline;
  const truncatedDescription =
    description.length > DESCRIPTION_MAX_CHARACTERS
      ? `${description.substring(0, DESCRIPTION_MAX_CHARACTERS)}...`
      : description;

  return (
    <Link
      href={`/project/${project}`}
      className="flex w-full max-w-60 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-black p-4 pt-2"
      style={{
        userSelect: "none",
      }}
    >
      <Image
        src={projectData.image.url}
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
    </Link>
  );
}
