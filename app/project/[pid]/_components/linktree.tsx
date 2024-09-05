import { ProjectRecord } from "@/lib/types";
import Link from "next/link";
import ShareDropdown from "./share-dropdown";

const WebsiteLink = ({
  href,
  ariaLabel,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={
        "flex items-center justify-center gap-1 rounded-lg border border-[#80E9E5] px-2 py-1 text-sm font-bold text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50 " +
        className
      }
    >
      {children}
    </Link>
  );
};

interface LinkTreeProps {
  project: ProjectRecord;
}

export default function LinkTree({ project }: LinkTreeProps) {
  const { website, github, twitter, medium, discord, telegram } =
    project.profile?.linktree;
  const { dapp, lnc } = project.profile;
  const pid = project.slug;

  return (
    <div className="flex min-w-64 flex-col gap-2">
      <div
        className={`relative flex flex-wrap items-center gap-1 lg:justify-end`}
      >
        {website && (
          <WebsiteLink
            href={website}
            ariaLabel={project.profile.name}
            className={dapp ? "rounded-e-none" : ""}
          >
            <i className="bi bi-globe text-xl text-[#80E9E5]" /> Website
          </WebsiteLink>
        )}
        {dapp && (
          <WebsiteLink
            href={dapp}
            ariaLabel="Go to App"
            className={website ? "rounded-s-none" : ""}
          >
            <i className="bi bi-app-indicator text-xl text-[#80E9E5]" /> App
          </WebsiteLink>
        )}
        <ShareDropdown project={project} />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div
          className={`mb-3 flex flex-wrap items-center justify-start gap-3 lg:justify-end`}
        >
          {twitter && (
            <Link href={twitter} aria-label="Twitter">
              <i className="bi bi-twitter-x text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50" />
            </Link>
          )}
          {github && (
            <Link href={github} aria-label={`${project.profile.name} Github`}>
              <i className="bi bi-github text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50" />
            </Link>
          )}
          {medium && (
            <Link href={medium} aria-label="Medium">
              <i className="bi bi-medium text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50" />
            </Link>
          )}
          {discord && (
            <Link href={discord} aria-label="Discord">
              <i className="bi bi-discord text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50" />
            </Link>
          )}
          {telegram && (
            <Link href={telegram} aria-label="Telegram">
              <i className="bi bi-telegram text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50" />
            </Link>
          )}
          {lnc && lnc?.score && (
            <Link
              href={`https://learnnear.club/near-ecosystem/${lnc.slug}/`}
              target="_blank"
              aria-label="LNC"
              className="flex gap-1 rounded bg-orange-400 px-1 text-sm font-extrabold text-black"
            >
              <ul className="flex items-baseline">
                <li className="text-[10px]">L</li>
                <li className="text-xs">N</li>
                <li>C</li>
              </ul>
              {lnc.score}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
