export default function LoadingPage() {
  return (
    <div className="container mx-auto my-4 flex animate-pulse flex-col gap-4 px-4 text-[#ECEBE9] md:my-12 md:gap-0">
      <div className="flex items-center gap-4">
        <div className="h-[80px] w-[80px] rounded-full bg-gray-700 md:h-[120px] md:w-[120px]"></div>
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 rounded-md bg-gray-700 md:h-10 md:w-60"></div>
          <div className="h-4 w-32 rounded-md bg-gray-700"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-700"></div>
            <div className="h-6 w-16 rounded-full bg-gray-700"></div>
            <div className="h-6 w-16 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:ml-[134px]">
        <div className="flex flex-wrap items-center gap-2 md:hidden">
          <div className="h-8 w-24 rounded-full bg-gray-700"></div>
          <div className="h-8 w-24 rounded-full bg-gray-700"></div>
        </div>
        <div className="flex flex-col gap-2 md:hidden">
          <div className="h-4 w-48 rounded-md bg-gray-700"></div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
          </div>
        </div>
        <div className="prose prose-invert lg:prose-lg">
          <div className="space-y-4">
            <div className="h-4 w-full rounded-md bg-gray-700"></div>
            <div className="h-4 w-full rounded-md bg-gray-700"></div>
            <div className="h-4 w-full rounded-md bg-gray-700"></div>
            <div className="h-4 w-full rounded-md bg-gray-700"></div>
            <div className="h-4 w-full rounded-md bg-gray-700"></div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Discover More</h3>
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-3`}>
          <div className="flex animate-pulse flex-col gap-2 rounded-lg bg-[#1b1d2a] p-4 md:flex-row">
            <div className="h-16 w-16 rounded-full bg-gray-700"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-32 rounded-md bg-gray-700"></div>
              <div className="h-3 w-24 rounded-md bg-gray-700"></div>
            </div>
          </div>
          <div className="flex animate-pulse flex-col gap-2 rounded-lg bg-[#1b1d2a] p-4 md:flex-row">
            <div className="h-16 w-16 rounded-full bg-gray-700"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-32 rounded-md bg-gray-700"></div>
              <div className="h-3 w-24 rounded-md bg-gray-700"></div>
            </div>
          </div>
          <div className="flex animate-pulse flex-col gap-2 rounded-lg bg-[#1b1d2a] p-4 md:flex-row">
            <div className="h-16 w-16 rounded-full bg-gray-700"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-32 rounded-md bg-gray-700"></div>
              <div className="h-3 w-24 rounded-md bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
