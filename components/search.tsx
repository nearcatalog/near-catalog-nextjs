"use client";

import SearchInput from "@/components/search-input";
import Tags from "@/app/project/[pid]/_components/tags";

interface SearchProps {
  tags: Record<string, string>;
}

export default function Search({ tags }: SearchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative mb-4">
        <SearchInput />
      </div>

      <Tags tags={tags} />
    </div>
  );
}
