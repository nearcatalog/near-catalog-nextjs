import { fetchProject } from "@/lib/near-catalog";
import Image from "next/image";
import DiscoverMore from "./_components/discover-more";
import LinkTree from "./_components/linktree";
import PriceInfo from "./_components/price-info";
import ProjectInfo from "./_components/project-info";
import TokenInfo from "./_components/token-info";
import TwitterTimelineEmbed from "./_components/twitter-embed";

interface ProjectPageProps {
  params: {
    pid: string;
  };
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
    <main className="container mx-auto my-4 px-4 lg:my-12">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div
          className={`w-full ${Object.keys(tokenInfo).length ? "lg:max-w-[65%]" : null}`}
        >
          <ProjectInfo projectData={projectData} />
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
          <div className="w-full lg:max-w-[35%]">
            <div className="hidden lg:block">
              <LinkTree project={projectData} />
            </div>
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
              <div>
                <TwitterTimelineEmbed
                  href={projectData.profile.linktree?.twitter}
                  name={projectData.profile.name}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
