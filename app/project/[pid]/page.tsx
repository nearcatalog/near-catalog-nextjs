import { fetchProject } from "@/lib/near-catalog";
import Image from "next/image";
import DiscoverMore from "./_components/discover-more";
import LinkTree from "./_components/linktree";
import PriceInfo from "./_components/price-info";
import ProjectHeader from "./_components/project-header";
import TokenInfo from "./_components/token-info";
import TwitterTimelineEmbed from "./_components/twitter-embed";
import Markdown from "react-markdown";
import ErrorImage from "@/public/assets/images/error.webp";
import remarkGfm from "remark-gfm";

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
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          height={144}
          placeholder="blur"
        />
        <h2>Sorry, we could not find the results for:</h2>
        <p className="text-2xl uppercase">{pid}</p>
      </div>
    );
  }

  const { profile } = projectData;

  const tokenTicket = profile.tokens ? Object.keys(profile.tokens)[0] : false;
  const tokenInfo =
    tokenTicket && profile.tokens ? profile.tokens[tokenTicket] : {};

  return (
    <main className="container mx-auto my-4 flex flex-col gap-4 px-4 lg:my-12">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <ProjectHeader projectData={projectData} />
        <LinkTree project={projectData} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <div className="rounded-lg bg-[#1b1d2a] p-4">
            <h2 className="mb-3 text-xl font-bold">About {profile.name}</h2>
            <div className="prose prose-invert min-h-[15.625rem] max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>
                {profile?.description}
              </Markdown>
            </div>
          </div>
          <DiscoverMore pid={pid} />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-4">
          <PriceInfo tokenInfo={tokenInfo} name={profile.name} />
          <TokenInfo tokenInfo={tokenInfo} />
          <TwitterTimelineEmbed
            href={profile.linktree?.twitter}
            name={profile.name}
          />
        </div>
      </div>
    </main>
  );
}
