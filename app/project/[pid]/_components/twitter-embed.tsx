import Script from "next/script";

function Loader() {
  return (
    <div className="mx-auto flex justify-center rounded-lg">
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
  // Extract the username from the URL if it is a URL else keep it as it is
  const userName =
    href.includes("https://twitter.com/") || href.includes("https://x.com/")
      ? href.split("/").slice(-1)[0]
      : href;

  console.log(userName);
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
          className="twitter-timeline"
          data-lang="en"
          data-height="500"
          data-tweet-limit="3"
          data-dnt="true"
          data-theme="dark"
          href={`https://twitter.com/${userName}?ref_src=twsrc%5Etfw`}
        >
          <Loader />
        </a>
        <Script
          async
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}
