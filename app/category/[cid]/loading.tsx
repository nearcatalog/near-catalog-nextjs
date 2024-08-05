import Image from "next/image";
import SearchImage from "@/public/assets/images/search.webp";

const ProjectSkeleton = ({ maxWidth }: { maxWidth?: boolean }) => {
  return (
    <div
      className={`grow-1 h-92 flex w-full ${maxWidth ? "" : "max-w-[20rem]"} shrink-0 animate-pulse flex-col items-start justify-start gap-3 rounded-[32px] bg-[#11141B] px-8 py-7`}
      style={{ userSelect: "none" }}
    >
      <div className="flex h-full w-full items-center gap-2 md:h-auto md:flex-col md:items-start">
        <div className="size-[96px] h-24 w-24 shrink-0 rounded-full bg-gray-700 md:size-[120px]"></div>
        <div className="flex w-full flex-col gap-1">
          <div className="h-8 w-3/4 rounded-md bg-gray-700"></div>
        </div>
      </div>
      <div className="h-4 w-5/6 rounded-md bg-gray-700"></div>
      <div className="mt-auto flex w-full flex-wrap items-center gap-2">
        <div className="h-6 w-16 rounded-full bg-gray-700"></div>
        <div className="h-6 w-16 rounded-full bg-gray-700"></div>
        <div className="h-6 w-16 rounded-full bg-gray-700"></div>
      </div>
    </div>
  );
};

export default function LoadingPage() {
  return (
    <div className="container relative mx-auto flex flex-col gap-4 px-4 py-12">
      <Image
        className="absolute right-1/2 top-0 z-0 h-[141px] w-[221px] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[222px] md:w-[347px] md:translate-x-0"
        src={SearchImage}
        alt={"Discover All Projects"}
        width={347}
        height={222}
      />
      <div className="flex animate-pulse flex-col items-center justify-center gap-3 px-2">
        <div className="h-10 w-1/2 rounded-md bg-gray-700 md:h-12"></div>
      </div>
      <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProjectSkeleton key={index} maxWidth />
        ))}
      </div>
    </div>
  );
}
