"use client";

import Link from "next/link";
import SearchInput from "./search-input";

const Tags = ({ allTags }: { allTags: Record<string, string> }) => {
  return (
    <div className="hidden flex-wrap gap-2 md:flex">
      {Object.keys(allTags).map((key, index) => (
        <Link
          key={index}
          href={`/category/${key}`}
          className={`inline-flex h-6 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#17D9D466] px-2 py-1 text-xs font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#17D9D480] active:bg-[#17D9D499]`}
        >
          {allTags[key]}
        </Link>
      ))}
    </div>
  );
};

interface SearchProps {
  tags: Record<string, string>;
}

export default function Search({ tags }: SearchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative mb-4">
        <SearchInput />
      </div>

      <Tags allTags={tags} />
    </div>
  );
}
