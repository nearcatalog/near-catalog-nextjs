import { MetadataRoute } from "next";

async function getProjects() {
  const res = await fetch(
    "https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects",
  );
  const data = await res.json();
  return data;
}

const BASE_URL = "localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const projectSlugs = Object.keys(projects);

  const routes = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      priority: 1,
      changeFrequency: "always",
      lastModified: new Date(),
    },
    ...routes,
  ];
}
