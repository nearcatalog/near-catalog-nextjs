import Image from "next/image";
import { ProjectRecord } from "@/lib/types";
import Tags from "./tags";

export default function ProjectHeader({
  projectData,
}: {
  projectData: ProjectRecord;
}) {
  const { profile } = projectData;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={profile?.image?.url}
        alt={profile?.name}
        className="pointer-events-none size-[7.5rem] rounded-full object-cover"
        width={120}
        height={120}
        sizes="120px"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-medium lg:text-[2rem] lg:font-bold">
          {profile?.name}
        </h2>
        <p className="text-base font-medium">{profile?.tagline}</p>
        <Tags tags={profile.tags} />
      </div>
    </div>
  );
}
