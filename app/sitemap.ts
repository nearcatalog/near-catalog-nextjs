import site from "@/config/site";
import { MetadataRoute } from "next";
import { ProjectType as Project } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getProjects() {
  const res = await fetch(
    "https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects",
    { cache: "no-cache" },
  );
  const data = await res.json();
  return data;
}

const BASE_URL = site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const projectSlugs = Object.keys(projects);

  const projectArray: Project[] = Object.values(projects);
  let tags: string[] = projectArray
    .map((project: Project) => Object.keys(project.profile.tags))
    .flat();
  const uniqueTags = Array.from(new Set(tags)).sort();

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${BASE_URL}project/${slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  const categoryRoutes = uniqueTags.map((slug) => ({
    url: `${BASE_URL}category/${slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [
    {
      url: `${BASE_URL}`,
      priority: 0.9,
      // changeFrequency: "always",
      lastModified: new Date(),
    },
    ...projectRoutes,
    ...categoryRoutes,
  ];
}
