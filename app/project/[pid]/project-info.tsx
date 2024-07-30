import Image from "next/image";
import Markdown from "react-markdown";
import Globe from "@/components/icons/globe";
import GitHub from "@/components/icons/github";
import Link from "next/link";
import TwitterX from "@/components/icons/twitter-x";
import Medium from "@/components/icons/medium";
import Discord from "@/components/icons/discord";
import Telegram from "@/components/icons/telegram";

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((value, key) => (
        <p
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-full bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={key}
        >
          {value}
        </p>
      ))}
    </div>
  );
};

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

type Project = {
  profile: {
    name: string;
    tagline: string;
    description: string;
    image: {
      url: string;
    };
    linktree: {
      website: string;
      github: string;
      twitter: string;
      medium: string;
      discord: string;
      telegram: string;
    };
    tags: Record<string, string>;
    tokens: any;
  };
};

export default function ProjectInfo({ projectData }: { projectData: Project }) {
  if (!projectData) return null;

  const { profile } = projectData;
  const { website, github, twitter, medium, discord, telegram } =
    profile?.linktree;

  return (
    <div className="flex flex-col gap-4 text-[#ECEBE9] md:gap-0">
      <div className="flex items-center gap-4">
        <Image
          src={profile?.image?.url}
          alt={profile?.name}
          className="pointer-events-none size-[80px] rounded-full bg-gray-900 object-cover md:size-[120px]"
          width={120}
          height={120}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium md:text-[32px] md:font-bold">
            {profile?.name}
          </h2>
          <p className="text-xs font-medium">{profile?.tagline}</p>
          <Tags tags={Object.values(profile?.tags)} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:ml-[134px]">
        <div className="flex flex-wrap items-center gap-2">
          {website && (
            <WebsiteLink href={website} ariaLabel={profile.name}>
              <Globe /> Go to project
            </WebsiteLink>
          )}
          {github && (
            <WebsiteLink href={github} ariaLabel={`${profile.name} Github`}>
              <GitHub />
              Github
            </WebsiteLink>
          )}
        </div>
        <div className="prose prose-invert lg:prose-lg">
          <Markdown>{profile?.description}</Markdown>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium">
            Connect with {profile?.name} on Social Media:
          </p>
          <div className="flex flex-wrap items-center gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
