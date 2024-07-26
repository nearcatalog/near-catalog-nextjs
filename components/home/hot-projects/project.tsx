import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
=======

const TITLE_MAX_CHARACTERS = 15;
const DESCRIPTION_MAX_CHARACTERS = 100;


>>>>>>> footer

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

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((value, key) => (
        <p
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-full bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={key}
        >
          {value}
        </p>
      ))}
    </div>
  );
};

export default function Project({ project }: ProjectProps) {
  const { profile } = project;

  const title = profile.name;
  const truncatedTitle =
    title.length > TITLE_MAX_CHARACTERS
      ? `${title.substring(0, TITLE_MAX_CHARACTERS)}...`
      : title;

  const description = profile.tagline;
  const truncatedDescription =
    description.length > DESCRIPTION_MAX_CHARACTERS
      ? `${description.substring(0, DESCRIPTION_MAX_CHARACTERS)}...`
      : description;

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
          {truncatedTitle}
        </h3>
        <p className="m-0 p-0 text-[16px] font-medium">{truncatedDescription}</p>
      </div>
      <div>
        <Tags tags={Object.values(profile.tags)} />
      </div>
      <div></div>
    </Link>
  );
}
