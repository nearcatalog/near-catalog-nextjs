import { useState, useEffect, useCallback } from "react";

const useProjectData = (project: string) => {
  const [data, setData] = useState<any | null>(null);
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
      const data: any = await response.json();
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
