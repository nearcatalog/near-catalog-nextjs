import Image from "next/image";
import ProjectInfo from "./project-info";
import DiscoverMore from "./discover-more";
import TokenInfo from "./token-info";
import PriceInfo from "./price-info";
import Script from "next/script";

interface ProjectPageProps {
  params: {
    pid: string;
  };
}

async function getProjectData(pid: string) {
  const res = await fetch(
    `https://nearcatalog.xyz/wp-json/nearcatalog/v1/project?pid=${pid}`,
  ).catch((error) => {
    throw new Error(error);
  });
  const data = await res.json();
  return data;
}

function TwitterTimelineEmbed({ href, name }: { href: string; name: string }) {
  return (
    <div className="mt-3 rounded-3xl bg-[#1b1d2a]">
      <div className="p-4">
        <small>
          <i>Open link in new tab with right click or hold</i>
        </small>
      </div>
      <div className="max-h-[500px] min-h-[500px] overflow-y-auto rounded-xl">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-height="500"
          data-dnt="true"
          data-tweet-limit="10"
          href={href}
        >
          Tweets by {name}
        </a>
        <Script async src="https://platform.twitter.com/widgets.js"></Script>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { pid } = params;
  const projectData = await getProjectData(pid);

  if (!projectData) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/error.webp"}
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
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-4 md:flex-row">
        <div
          className={`w-full ${Object.keys(tokenInfo).length ? "md:max-w-[65%]" : null}`}
        >
          <ProjectInfo projectData={projectData} />

          {Object.keys(tokenInfo).length ? (
            <div className="my-4 w-full md:hidden">
              <PriceInfo
                tokenInfo={tokenInfo}
                name={projectData.profile.name}
              />
              <TokenInfo tokenInfo={tokenInfo} />
            </div>
          ) : null}
          {projectData.profile.linktree?.twitter && (
            <TwitterTimelineEmbed
              href={projectData.profile.linktree?.twitter}
              name={projectData.profile.name}
            />
          )}
          <DiscoverMore
            pid={pid}
            gridSize={Object.keys(tokenInfo).length ? 3 : 1}
          />
        </div>
        {Object.keys(tokenInfo).length ||
        projectData.profile.linktree?.twitter ? (
          <div className="hidden w-full md:block md:max-w-[35%]">
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
              <TwitterTimelineEmbed
                href={projectData.profile.linktree?.twitter}
                name={projectData.profile.name}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
