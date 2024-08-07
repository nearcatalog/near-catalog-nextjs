import ProjectsList from "@/components/home/projects-list";
import SearchInput from "@/components/search-input";
import type { Metadata, ResolvingMetadata } from "next";
import { fetchAllProjects, fetchProject } from "@/lib/near-catalog";
import { ProjectRecord } from "@/lib/types";

type MetadataProps = {
  params: { pid: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.pid;

  const project: ProjectRecord = await fetchProject(id);

  if (!project) {
    return {
      title: "Project not found",
      description: "Project not found",
    };
  }

  return {
    title: `${project.profile.name}`,
    description: project.profile.tagline,
    keywords: Object.values(project.profile.tags),
    openGraph: {
      title: `${project.profile.name} - NEAR Landscape`,
      description: project.profile.tagline,
    },
  };
}

type Props = MetadataProps & {
  children: React.ReactNode;
};

export default async function ProjectLayout({ params, children }: Props) {
  const { pid } = params;
  if (!pid) {
    return <div>Project ID not found</div>;
  }

  const projects = await fetchAllProjects();
  const projectValues: ProjectRecord[] = Object.values(projects);
  return (
    <div className="relative mt-4" id="top">
      <div className="relative mx-4">
        <SearchInput />
        <ProjectsList projects={projectValues} showOnDesktop />
      </div>
      {children}
    </div>
  );
}
