import { ProjectCategory, ProjectId, ProjectRecord } from '@/lib/types';

export const NEAR_CATALOG_API = "https://nearcatalog.xyz/wp-json/nearcatalog/v1";

/**
 * Fetches all projects
 */
export async function fetchAllProjects(): Promise<Record<ProjectId, ProjectRecord>> {
  const response = await fetch(`${NEAR_CATALOG_API}/projects`);
  if (!response.ok) {
    throw new Error('Request to Near Catalog API failed with status: ' + response.status);
  }
  return await response.json();
}

/**
 * Fetches a project by its PID (project ID)
 */
export async function fetchProject(pid: string): Promise<ProjectRecord> {
  const response = await fetch(`${NEAR_CATALOG_API}/project?pid=${pid}`);
  if (!response.ok) {
    throw new Error('Request to Near Catalog API failed with status: ' + response.status);
  }
  return await response.json();
}

/**
 * Fetches related projects by PID
 */
export async function fetchRelatedProjects(pid: string): Promise<Record<ProjectId, ProjectRecord>> {
  const response = await fetch(`${NEAR_CATALOG_API}/related-projects?pid=${pid}`);
  if (!response.ok) {
    throw new Error('Request to Near Catalog API failed with status: ' + response.status);
  }
  return await response.json();
}

/**
 * Fetches a project category by its CID (category ID)
 */
export async function fetchProjectCategory(cid: string): Promise<ProjectCategory> {
  const response = await fetch(`${NEAR_CATALOG_API}/projects-by-category?cid=${cid}`);
  if (!response.ok) {
    throw new Error('Request to Near Catalog API failed with status: ' + response.status);
  }
  return await response.json()
}

/**
 * Fetches hot projects (trending category)
 */
export async function fetchHotProjects(): Promise<Record<ProjectId, ProjectRecord>> {
  const { data } = await fetchProjectCategory('trending');
  return data;
}