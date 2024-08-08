import { fetchRelatedProjects } from "@/lib/near-catalog";
import Image from "next/image";
import Link from "next/link";
import ErrorImage from "@/public/assets/images/error.webp";

interface DiscoverMoreProps {
  pid: string;
  gridSize: number;
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Link
      href={`/project/${project.slug}#top`}
      className="flex flex-row gap-2 rounded-lg bg-[#1b1d2a] p-4 transition-colors duration-300 ease-in-out hover:bg-[#2b2d3a]"
    >
      <Image
        src={project.profile.image.url}
        alt={project.profile.name}
        className="h-16 w-16 rounded-full object-cover"
        width={64}
        height={64}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold">{project.profile.name}</h3>
        <p className="text-sm font-medium">{project.profile.tagline}</p>
      </div>
    </Link>
  );
}

export default async function DiscoverMore({
  pid,
  gridSize,
}: DiscoverMoreProps) {
  const relatedProjects = await fetchRelatedProjects(pid);

  if (!relatedProjects) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          placeholder="blur"
          height={144}
        />
        <h2>Sorry, we could not find the results for:</h2>
        <p className="text-2xl uppercase">{pid}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Discover More</h2>
      <div
        className={`discover-more grid grid-cols-1 gap-4 ${gridSize >= 3 ? "md:grid-cols-2" : "md:grid-cols-3"}`}
      >
        {Object.keys(relatedProjects).map((key) => (
          <ProjectCard key={key} project={relatedProjects[key]} />
        ))}
      </div>
    </div>
  );
}
