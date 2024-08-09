import type { Metadata, ResolvingMetadata } from "next";
import { fetchProject } from "@/lib/near-catalog";
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
      title: `${project.profile.name} - NEAR Catalog`,
      description: project.profile.tagline,
    },
  };
}

type Props = MetadataProps & {
  children: React.ReactNode;
};

export default function ProjectLayout({ params, children }: Props) {
  return (
    <div className="relative mt-4" id="top">
      {children}
    </div>
  );
}
