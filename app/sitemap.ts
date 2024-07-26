import site from "@/config/site";
import { MetadataRoute } from "next";

async function getProjects() {
  const res = await fetch(
    "https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects",
  );
  const data = await res.json();
  return data;
}

const BASE_URL = site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const projectSlugs = Object.keys(projects);

  const routes = projectSlugs.map((slug) => ({
    url: `${BASE_URL}project/${slug}`,
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
    ...routes,
  ];
}
