import Image from "next/image";
import ProjectInfo from "./project-info";
import DiscoverMore from "./discover-more";
import TokenInfo from "./token-info";
import PriceInfo from "./price-info";

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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { pid } = params;
  const projectData = await getProjectData(pid);

  if (!projectData) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
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
          <DiscoverMore
            pid={pid}
            gridSize={Object.keys(tokenInfo).length ? 2 : 4}
          />
        </div>
        {Object.keys(tokenInfo).length ? (
          <div className="w-full md:max-w-[35%]">
            <PriceInfo tokenInfo={tokenInfo} name={projectData.profile.name} />
            <TokenInfo tokenInfo={tokenInfo} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
