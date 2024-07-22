import { useState, useEffect, useCallback } from "react";

type ProjectData = {
  profile: {
    tags: { [key: string]: string };
    description: string | null | undefined;
    name: string;
    tagline: string;
    image: {
      url: string;
    };
  };
}

const useProjectData = (project: string) => {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjectData = useCallback(async () => {
    if (!project) return;

    setLoading(true);
    setError(null);
    setData(null);

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

export default useProjectData;
