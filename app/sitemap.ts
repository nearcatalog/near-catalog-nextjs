import site from "@/config/site";
import { MetadataRoute } from "next";
import { ProjectRecord } from "@/lib/types";
import { fetchAllProjects } from "@/lib/near-catalog";

export const dynamic = "force-dynamic";

const BASE_URL = site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await fetchAllProjects();
  const projectSlugs = Object.keys(projects);

  const projectArray: ProjectRecord[] = Object.values(projects);
  let tags: string[] = projectArray
    .map((project: ProjectRecord) => Object.keys(project.profile.tags))
    .flat();
  const uniqueTags = Array.from(new Set(tags)).sort();

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/project/${slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  const categoryRoutes = uniqueTags.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      priority: 0.9,
      lastModified: new Date(),
    },
    ...projectRoutes,
    ...categoryRoutes,
  ];
}
