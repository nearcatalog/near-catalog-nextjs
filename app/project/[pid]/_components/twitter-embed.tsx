import Script from "next/script";

function Loader() {
  return (
    <div className="rounded-lg">
      <div className="flex size-6 w-fit animate-spin items-center justify-center p-4">
        <i className="bi bi-arrow-repeat text-2xl"></i>
      </div>
    </div>
  );
}

export default function TwitterTimelineEmbed({
  href,
  name,
}: {
  href: string;
  name: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-[#1b1d2a] p-4">
      <h3 className="space-x-2 text-xl font-bold">
        <i className="bi bi-twitter-x"></i> <span>{name} Twitter</span>
      </h3>
      <div
        className="overflow-y-auto rounded-xl"
        style={{ maxHeight: "500px", minHeight: "500px" }}
      >
        <a
          className="twitter-timeline h-full"
          data-theme="dark"
          data-dnt="true"
          data-height="500"
          data-tweet-limit="10"
          href={href}
        >
          <div className="my-4 flex flex-col items-center justify-center gap-2">
            <Loader />
          </div>
        </a>
        <Script defer src="https://platform.twitter.com/widgets.js" />
      </div>
    </div>
  );
}
