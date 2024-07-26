import Image from "next/image";
import Link from "next/link";

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

interface ProjectProps {
  project: ProjectType;
}

export default function Project({ project }: ProjectProps) {
  const { profile } = project;

  return (
    <Link
      href={`/project/${project.slug}`}
      className="flex shrink-0 flex-col items-start justify-start gap-6 rounded-[32px] bg-[#11141B] px-8 py-7"
    >
      <Image
        className="rounded-full"
        src={profile.image.url}
        alt={profile.name}
        width={120}
        height={120}
      />
      <div className="w-72">
        <h3 className="m-0 overflow-ellipsis p-0 text-[32px] font-bold text-white">
          {profile.name}
        </h3>
        <p className="m-0 p-0 text-[16px] font-medium">{profile.tagline}</p>
      </div>
      <div></div>
    </Link>
  );
}
