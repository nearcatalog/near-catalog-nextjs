import Script from "next/script";

function Loader() {
  return (
    <div className="my-3 rounded-3xl">
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
    <div className="my-3 rounded-3xl bg-[#1b1d2a]">
      <div className="p-4">
        <small>
          <i>Open link in new tab with right click or hold</i>
        </small>
      </div>
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
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="underline underline-offset-2">
              Tweets by {name} 🚀
            </span>
            <Loader />
          </div>
        </a>
        <Script async src="https://platform.twitter.com/widgets.js" />
      </div>
    </div>
  );
}
