"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";

interface ProjectProps {
  project: string;
}

interface ProjectData {
  profile: {
    name: string;
    tagline: string;
    image: {
      url: string;
    };
  };
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

const useProjectData = (project: string) => {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjectData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://nearcatalog.xyz/wp-json/nearcatalog/v1/project?pid=${project}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ProjectData = await response.json();
      setData(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [project]);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  return { data, loading, error };
};

export default function Project({ project }: ProjectProps) {
  const { data: projectData, loading, error } = useProjectData(project);

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

  if (loading) return <SkeletonProject />;
  if (error || !projectData)
    return <div className="text-red-500">Failed to load project data</div>;

  const {
    profile: { image },
  } = projectData;

  return (
    <div className="flex w-full max-w-60 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl bg-black p-4 pt-2">
      <Image
        src={image.url}
        alt="Project Image"
        className="size-16 rounded-full bg-gray-900 object-cover"
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
