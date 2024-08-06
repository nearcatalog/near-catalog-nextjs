"use client";

import {
  isProjectBookmarked,
  toggleProjectBookmark,
} from "@/lib/bookmark-project";
import { ProjectRecord } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
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
        "flex items-center justify-center gap-1 rounded-lg border border-[#80E9E5] px-2 py-1 text-xs font-bold text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50 " +
        className
      }
    >
      {children}
    </Link>
  );
};

interface LinkTreeProps {
  project: ProjectRecord;
  direction?: "left" | "right";
}

export default function LinkTree({ project, direction }: LinkTreeProps) {
  const { website, github, twitter, medium, discord, telegram } =
    project.profile?.linktree;
  const { dapp, lnc } = project.profile;
  const pid = project.slug;

  const [isProjectStarred, setProjectStarred] = useState(
    isProjectBookmarked(pid),
  );

  const handleStarProject = () => {
    const updatedBookmarkState = toggleProjectBookmark(pid);
    setProjectStarred(updatedBookmarkState);
  };

  return (
    <>
      <div
        className={`relative flex flex-wrap items-center gap-1 ${direction === "left" ? "justify-start" : "justify-end"}`}
      >
        <button
          onClick={handleStarProject}
          className="flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50"
          aria-label="Bookmark Project"
        >
          <i
            className={`bi ${isProjectStarred ? "bi-star-fill" : "bi-star"} text-xl text-[#80E9E5]`}
          ></i>
        </button>
        {website && (
          <WebsiteLink
            href={website}
            ariaLabel={project.profile.name}
            className={dapp ? "rounded-e-none" : ""}
          >
            <i className="bi bi-globe text-2xl text-[#80E9E5]" /> Go to project
          </WebsiteLink>
        )}
        {dapp && (
          <WebsiteLink
            href={dapp}
            ariaLabel="Go to App"
            className={website ? "rounded-s-none" : ""}
          >
            <i className="bi bi-app-indicator text-2xl text-[#80E9E5]" /> App
          </WebsiteLink>
        )}
        <ShareDropdown project={project} />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <p
          className={`${direction === "left" ? "text-left" : "text-right"} text-xs font-medium`}
        >
          Connect with {project.profile?.name} on Social Media:
        </p>
        <div
          className={`mb-3 flex flex-wrap items-center gap-2 ${direction === "left" ? "justify-start" : "justify-end"}`}
        >
          {twitter && (
            <Link href={twitter} aria-label="Twitter">
              <i className="bi bi-twitter-x text-2xl text-[#80E9E5]" />
            </Link>
          )}
          {github && (
            <Link href={github} aria-label={`${project.profile.name} Github`}>
              <i className="bi bi-github text-2xl text-[#80E9E5]" />
            </Link>
          )}
          {medium && (
            <Link href={medium} aria-label="Medium">
              <i className="bi bi-medium text-2xl text-[#80E9E5]" />
            </Link>
          )}
          {discord && (
            <Link href={discord} aria-label="Discord">
              <i className="bi bi-discord text-2xl text-[#80E9E5]" />
            </Link>
          )}
          {telegram && (
            <Link href={telegram} aria-label="Telegram">
              <i className="bi bi-telegram text-2xl text-[#80E9E5]" />
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
              </ul>
              {lnc.score}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
