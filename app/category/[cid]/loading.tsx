import Image from "next/image";
import SearchImage from "@/public/assets/images/search.webp";
import ProjectSkeleton from "@/components/ui/project-skeleton";

export default function LoadingPage() {
  return (
    <div className="container relative mx-auto flex flex-col gap-4 px-4 py-12">
      <Image
        className="absolute right-1/2 top-0 z-0 h-[8.75rem] w-[13.75rem] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[13.875rem] md:w-[21.6875rem] md:translate-x-0"
        src={SearchImage}
        alt={"Discover All Projects"}
        placeholder="blur"
        width={347}
        loading="lazy"
        height={222}
        sizes="(min-width: 768px) 221px, 347px"
      />
      <div className="flex animate-pulse flex-col items-center justify-center gap-3 px-2">
        <div className="h-10 w-1/2 rounded-md bg-gray-700 md:h-12"></div>
      </div>
      <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProjectSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
