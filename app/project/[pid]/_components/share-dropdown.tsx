"use client";

import site from "@/config/site";
import { ProjectRecord } from "@/lib/types";
import Link from "next/link";
import { useCallback, useState } from "react";

interface ShareDropdownProps {
  project: ProjectRecord;
}

export default function ShareDropdown({ project }: ShareDropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <>
      <button
        onClick={toggleOpen}
        aria-label="Share dropdown"
        className={`flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50 ${open ? "bg-[#80E9E5]/40 text-black" : ""}`}
      >
        <i className="bi bi-three-dots-vertical text-xl text-[#80E9E5]"></i>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 flex w-fit flex-col gap-2 rounded-lg bg-[#1c1b2a] p-2 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
          <div className="flex min-w-fit shrink-0">
            <Link
              href={`https://x.com/intent/post?text=Check out ${project.profile.name} - ${project.profile.tagline}%0A${site.url}project/${project.slug}%0A📒@nearcatalog`}
              target="_blank"
              className="flex w-full shrink-0 items-center gap-1 rounded-lg px-2 py-1 hover:bg-[#80E9E5]/40"
            >
              <i className="bi bi-twitter-x text-xl"></i>
              <span>Share on X</span>
            </Link>
          </div>
          <div className="flex shrink-0">
            <Link
              href={`https://submit.nearcatalog.xyz/feedback/?pid=${project.slug}&pname=${project.profile.name}&title=${project.profile.name}`}
              target="_blank"
              className="flex w-full shrink-0 items-center gap-1 rounded-lg px-2 py-1 hover:bg-[#80E9E5]/40"
            >
              <i className="bi bi-flag text-xl"></i>
              <span>Report or give feedback</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
