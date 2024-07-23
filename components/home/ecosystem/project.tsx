"use client";

import { useMemo } from "react";
import Image from "next/image";
import useProjectModalStore from "@/stores/project-modal";
import useProjectData from "@/hooks/use-project-data";

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
  const { data: projectData, loading, error } = useProjectData(project);
  const { setIsOpen, setProjectId } = useProjectModalStore();

  const truncatedTitle = useMemo(() => {
    if (!projectData) return "";
    const { name: title } = projectData.profile;
    return title.length > TITLE_MAX_CHARACTERS
      ? `${title.substring(0, TITLE_MAX_CHARACTERS)}...`
      : title;
  }, [projectData]);

  const truncatedDescription = useMemo(() => {
    if (!projectData) return "";
    const { tagline: description } = projectData.profile;
    return description.length > DESCRIPTION_MAX_CHARACTERS
      ? `${description.substring(0, DESCRIPTION_MAX_CHARACTERS)}...`
      : description;
  }, [projectData]);

  if (error)
    return <div className="text-red-500">Failed to load project data</div>;

  if (loading || !projectData) return <SkeletonProject />;

  const {
    profile: { image },
  } = projectData;

  return (
    <div
      className="flex w-full max-w-60 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-black p-4 pt-2"
      onClick={() => {
        setIsOpen(true);
        setProjectId(project);
      }}
      style={{
        userSelect: "none",
      }}
    >
      <Image
        src={image.url}
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
