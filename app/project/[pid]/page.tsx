import Image from "next/image";
import ProjectInfo from "./project-info";
import DiscoverMore from "./discover-more";
import TokenInfo from "./token-info";
import PriceInfo from "./price-info";
import Script from "next/script";
import Globe from "@/components/icons/globe";
import GitHub from "@/components/icons/github";
import Link from "next/link";
import TwitterX from "@/components/icons/twitter-x";
import Medium from "@/components/icons/medium";
import Discord from "@/components/icons/discord";
import Telegram from "@/components/icons/telegram";
import { AppWindow } from "lucide-react";

const WebsiteLink = ({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className="flex items-center justify-center gap-1 rounded-full border border-[#80E9E5] p-1 text-xs font-bold text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50"
    >
      {children}
    </Link>
  );
};

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
    <div className="my-3 rounded-3xl bg-[#1b1d2a]">
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
  const { website, github, twitter, medium, discord, telegram } =
    projectData.profile?.linktree;
  const { dapp, lnc } = projectData.profile;

  return (
    <div className="container mx-auto my-4 px-4 md:my-12">
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
            <div className="md:hidden">
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
          <div className="hidden w-full md:block md:max-w-[35%]">
            <div className="hidden flex-wrap items-center justify-end gap-2 md:flex">
              {website && (
                <WebsiteLink
                  href={website}
                  ariaLabel={projectData.profile.name}
                >
                  <Globe /> Go to project
                </WebsiteLink>
              )}
              {github && (
                <WebsiteLink
                  href={github}
                  ariaLabel={`${projectData.profile.name} Github`}
                >
                  <GitHub />
                  Github
                </WebsiteLink>
              )}
              {dapp && (
                <WebsiteLink href={dapp} ariaLabel="Go to App">
                  <AppWindow /> App
                </WebsiteLink>
              )}
            </div>
            <div className="mt-2 hidden flex-col gap-2 md:flex">
              <p className="text-right text-xs font-medium">
                Connect with {projectData.profile?.name} on Social Media:
              </p>
              <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
                {twitter && (
                  <Link href={twitter} aria-label="Twitter">
                    <TwitterX />
                  </Link>
                )}
                {medium && (
                  <Link href={medium} aria-label="Medium">
                    <Medium />
                  </Link>
                )}
                {discord && (
                  <Link href={discord} aria-label="Discord">
                    <Discord />
                  </Link>
                )}
                {telegram && (
                  <Link href={telegram} aria-label="Telegram">
                    <Telegram />
                  </Link>
                )}
                {lnc.score && (
                  <Link
                    href={`https://learnnear.club/near-ecosystem/${lnc.slug}/`}
                    target="_blank"
                    aria-label="LNC"
                    className="flex gap-1 rounded bg-orange-400 px-2 py-1 font-extrabold text-black"
                  >
                    <ul className="flex items-baseline">
                      <li className="text-xs">L</li>
                      <li className="text-sm">N</li>
                      <li>C</li>
                    </ul>{" "}
                    {lnc.score}
                  </Link>
                )}
              </div>
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
              <div className="hidden md:block">
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
