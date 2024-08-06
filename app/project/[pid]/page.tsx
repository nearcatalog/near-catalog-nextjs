import { fetchProject } from "@/lib/near-catalog";
import Image from "next/image";
import Script from "next/script";
import DiscoverMore from "./_components/discover-more";
import LinkTree from "./_components/linktree";
import PriceInfo from "./_components/price-info";
import ProjectInfo from "./_components/project-info";
import TokenInfo from "./_components/token-info";

interface ProjectPageProps {
  params: {
    pid: string;
  };
}

function Loader() {
  return (
    <div className="my-3 rounded-3xl">
      <div className="flex size-6 w-fit animate-spin items-center justify-center p-4">
        <i className="bi bi-arrow-repeat text-2xl"></i>
      </div>
    </div>
  );
}

function TwitterTimelineEmbed({ href, name }: { href: string; name: string }) {
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
        <Script async src="https://platform.twitter.com/widgets.js"></Script>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { pid } = params;
  const projectData = await fetchProject(pid);

  if (!projectData) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/images/error.webp"}
          alt={"Not found error"}
          width={182}
          height={144}
        />
        <h2>Sorry, we could not find the results for:</h2>
        <p className="text-2xl uppercase">{pid}</p>
      </div>
    );
  }

  const tokenTicket = projectData.profile.tokens
    ? Object.keys(projectData.profile.tokens)[0]
    : false;
  const tokenInfo =
    tokenTicket && projectData.profile.tokens
      ? projectData.profile.tokens[tokenTicket]
      : {};

  return (
    <div className="container mx-auto my-4 px-4 lg:my-12">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div
          className={`w-full ${Object.keys(tokenInfo).length ? "lg:max-w-[65%]" : null}`}
        >
          <ProjectInfo projectData={projectData} />

          {Object.keys(tokenInfo).length ? (
            <div className="my-4 w-full lg:hidden">
              <PriceInfo
                tokenInfo={tokenInfo}
                name={projectData.profile.name}
              />
              <TokenInfo tokenInfo={tokenInfo} />
            </div>
          ) : null}
          {projectData.profile.linktree?.twitter && (
            <div className="lg:hidden">
              <TwitterTimelineEmbed
                href={projectData.profile.linktree?.twitter}
                name={projectData.profile.name}
              />
            </div>
          )}
          <DiscoverMore
            pid={pid}
            gridSize={
              Object.keys(tokenInfo).length ||
              projectData.profile.linktree?.twitter
                ? 3
                : 1
            }
          />
        </div>
        {Object.keys(tokenInfo).length ||
        projectData.profile.linktree?.twitter ? (
          <div className="hidden w-full lg:block lg:max-w-[35%]">
            <LinkTree project={projectData} />
            {Object.keys(tokenInfo).length ? (
              <>
                <PriceInfo
                  tokenInfo={tokenInfo}
                  name={projectData.profile.name}
                />
                <TokenInfo tokenInfo={tokenInfo} />
              </>
            ) : null}
            {projectData.profile.linktree?.twitter && (
              <div className="hidden lg:block">
                <TwitterTimelineEmbed
                  href={projectData.profile.linktree?.twitter}
                  name={projectData.profile.name}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
