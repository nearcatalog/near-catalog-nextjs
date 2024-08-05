"use client";

import { useSearchStore } from "@/store/search-store";

export default function SearchInput() {
  const { searchKey } = useSearchStore();
  return (
    <div className="container mx-auto">
      <div className="relative mx-4">
        <input
          type="text"
          name="search"
          value={searchKey}
          placeholder="Search projects"
          onChange={(e) =>
            useSearchStore.setState({ searchKey: e.target.value })
          }
          className="w-full rounded-full border border-[#BEBDBE] bg-black p-4 pl-12 font-medium text-white"
        />
        <i className="bi bi-search absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-xl text-[#7E7E7E]" />
      </div>
    </div>
  );
}
