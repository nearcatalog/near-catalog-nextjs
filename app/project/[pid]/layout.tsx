import MobileDropdown from "@/components/home/mobile-dropdown";
import SearchInput from "@/components/search-input";
import type { Metadata, ResolvingMetadata } from "next";

type MetadataProps = {
  params: { pid: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.pid;

  // fetch data
  const project = await fetch(
    `https://nearcatalog.xyz/wp-json/nearcatalog/v1/project?pid=${id}`,
  )
    .then((res) => res.json())
    .catch((error) => {
      throw new Error("Error fetching project data", error);
    });

  if (!project) {
    return {
      title: "Project not found",
      description: "Project not found",
    };
  }

  return {
    title: `${project.profile.name}`,
    description: project.profile.description,
    keywords: Object.values(project.profile.tags),
    openGraph: {
      title: `${project.profile.name} - NEAR Landscape`,
      description: project.profile.description,
    },
  };
}

type Props = MetadataProps & {
  children: React.ReactNode;
};

type ProjectType = {
  slug: string;
  profile: {
    name: string;
    tagline: string;
    image: {
      url: string;
    };
    tags: Record<string, string>;
  };
};

async function getProjects() {
  const res = await fetch(
    "https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects",
  );
  const data = await res.json();
  return data;
}

export default async function ProjectLayout({ params, children }: Props) {
  const { pid } = params;
  if (!pid) {
    return <div>Project ID not found</div>;
  }

  const projects = await getProjects();
  const projectValues: ProjectType[] = Object.values(projects);
  return (
    <div className="relative mt-4">
      <SearchInput />
      <MobileDropdown projects={projectValues} showOnDesktop />
      {children}
    </div>
  );
}
