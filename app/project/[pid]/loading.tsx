function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2 rounded-lg bg-[#1b1d2a] p-4 lg:flex-row">
      <div className="h-16 w-16 rounded-full bg-gray-700"></div>
      <div className="flex flex-col gap-1">
        <div className="h-4 w-32 rounded-md bg-gray-700"></div>
        <div className="h-3 w-24 rounded-md bg-gray-700"></div>
      </div>
    </div>
  );
}

export default function LoadingPage() {
  return (
    <div className="container mx-auto my-4 flex animate-pulse flex-col gap-4 px-4 lg:my-12">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="h-[7.5rem] w-[7.5rem] rounded-full bg-gray-700"></div>
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 rounded-md bg-gray-700 lg:h-10 lg:w-60"></div>
            <div className="h-4 w-32 rounded-md bg-gray-700"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 rounded-full bg-gray-700"></div>
              <div className="h-6 w-16 rounded-full bg-gray-700"></div>
              <div className="h-6 w-16 rounded-full bg-gray-700"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-8 w-24 rounded-full bg-gray-700"></div>
            <div className="h-8 w-24 rounded-full bg-gray-700"></div>
          </div>
          <div className="h-4 w-48 rounded-md bg-gray-700"></div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            <div className="h-8 w-8 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-1 gap-4 lg:col-span-8">
          <div className="prose prose-invert max-w-none rounded-lg bg-[#1b1d2a] p-4 lg:prose-lg">
            <div className="space-y-4">
              <div className="h-4 w-full rounded-md bg-gray-700"></div>
              <div className="h-4 w-full rounded-md bg-gray-700"></div>
              <div className="h-4 w-full rounded-md bg-gray-700"></div>
              <div className="h-4 w-full rounded-md bg-gray-700"></div>
              <div className="h-4 w-full rounded-md bg-gray-700"></div>
              <div className="h-4 w-full rounded-md bg-gray-700"></div>
              <div className="h-4 w-full rounded-md bg-gray-700"></div>
              <div className="h-4 w-full rounded-md bg-gray-700"></div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-2xl font-bold">Discover More</h3>
            <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2`}>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4 lg:col-span-4">
          <div className="w-full animate-pulse rounded-lg bg-[#1b1d2a] p-4">
            <div className="mb-4 h-6 w-1/3 rounded bg-gray-700"></div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gray-700"></div>
                <div className="h-4 w-20 rounded bg-gray-700"></div>
              </div>
              <div className="mb-4 h-8 w-1/2 rounded bg-gray-700"></div>
              <div className="flex flex-col flex-wrap gap-4 lg:flex-row">
                {[
                  "ATH",
                  "24h high",
                  "Volume 24h",
                  "24h low",
                  "Market Cap",
                  "Circulating Supply",
                ].map((label) => (
                  <div className="flex flex-col p-1" key={label}>
                    <div className="mb-2 h-4 w-24 rounded bg-gray-700"></div>
                    <div className="h-4 w-16 rounded bg-gray-700"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 h-6 w-1/3 rounded bg-gray-700"></div>
          </div>
          <div className="flex animate-pulse flex-col gap-2 rounded-lg bg-[#1b1d2a] p-4">
            <div className="flex flex-col gap-4">
              <div className="mb-4 h-6 w-1/3 rounded bg-gray-700"></div>
              {["NEAR Chain (NEP-141)", "Aurora", "Ethereum"].map(
                (chainName) => (
                  <div key={chainName} className="flex flex-col gap-2">
                    <div className="h-4 w-1/2 rounded bg-gray-700"></div>
                    <div className="h-8 w-full rounded bg-gray-700"></div>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="flex animate-pulse flex-col gap-4 rounded-lg bg-[#1b1d2a] p-4">
            <div className="mb-4 h-6 w-1/2 rounded bg-gray-700"></div>
            <div
              className="overflow-y-auto rounded-xl bg-gray-700"
              style={{ maxHeight: "500px", minHeight: "500px" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
