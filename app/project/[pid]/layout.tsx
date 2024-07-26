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
    openGraph: {
      title: project.profile.name,
      description: project.profile.description,
      images: [
        {
          url: project.profile.image.url,
          width: 1200,
          height: 630,
          alt: project.profile.name,
        },
      ],
    },
  };
}

type Props = MetadataProps & {
  children: React.ReactNode;
};

export default function ProjectLayout({ params, children }: Props) {
  const { pid } = params;
  if (!pid) {
    return <div>Project ID not found</div>;
  }
  return <div>{children}</div>;
}
