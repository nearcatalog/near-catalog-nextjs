export default function ProjectSkeleton() {
  return (
    <div className="grow-1 min-h-92 flex w-full shrink-0 flex-col items-start justify-start gap-3 overflow-hidden rounded-lg bg-[#11141B] px-5 py-4 md:justify-normal md:px-8 md:py-7">
      <div className="flex w-full items-center gap-2 overflow-hidden md:h-auto md:flex-col md:items-start">
        <div className="h-[4rem] w-[4rem] shrink-0 animate-pulse rounded-full bg-[#2b2d3a] md:h-[6rem] md:w-[6rem]"></div>
        <div className="flex w-full flex-col gap-1">
          <div className="h-6 w-3/4 animate-pulse rounded bg-[#2b2d3a]"></div>
        </div>
      </div>
      <div className="h-4 w-full animate-pulse rounded bg-[#2b2d3a]"></div>
      <div className="h-4 w-5/6 animate-pulse rounded bg-[#2b2d3a]"></div>
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <div className="h-6 w-12 animate-pulse rounded bg-[#2b2d3a]"></div>
        <div className="h-6 w-12 animate-pulse rounded bg-[#2b2d3a]"></div>
        <div className="h-6 w-12 animate-pulse rounded bg-[#2b2d3a]"></div>
      </div>
    </div>
  );
}
