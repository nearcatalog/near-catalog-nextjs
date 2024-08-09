"use client";

import { useSearchModalStore } from "@/store/search-modal-store";
import * as Dialog from "@radix-ui/react-dialog";
import SearchInput from "../search-input";
import { ProjectRecord } from "@/lib/types";
import { fetchAllProjects } from "@/lib/near-catalog";
import { useEffect, useState } from "react";

import Link from "next/link";
import SearchProjects from "../home/searchProjects";

function Tags({
  tags,
  handleTagClick,
}: {
  tags: Record<string, string>;
  handleTagClick: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Object.keys(tags).map((key, index) => (
        <Link
          href={`/category/${key}`}
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={index}
          onClick={handleTagClick}
        >
          {tags[key]}
        </Link>
      ))}
    </div>
  );
}

export default function SearchModal() {
  const { isOpen, setIsOpen, searchKey } = useSearchModalStore();

  const [projects, setProjects] = useState<null | Record<
    string,
    ProjectRecord
  >>();

  useEffect(() => {
    fetchAllProjects()
      .then((data) => setProjects(data))
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  if (!projects) {
    return null;
  }

  const projectArray: ProjectRecord[] = Object.values(projects);
  let tags: Record<string, string>[] = projectArray
    .map((project: ProjectRecord) => project.profile.tags)
    .flat();

  let uniqueTags: Record<string, string> = {};

  tags.forEach((tag) => {
    Object.keys(tag).forEach((key) => {
      if (!uniqueTags[key]) {
        uniqueTags[key] = tag[key];
      }
    });
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[.375rem]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[28.125rem] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-lg bg-[#1A1A17] px-6 pb-2 focus:outline-none md:max-w-[80%] lg:max-w-6xl">
          <div className="sticky -top-1 flex flex-col gap-2 bg-[#1A1A17] p-4">
            <Dialog.Title className="mb-2 flex items-center justify-between">
              <span className="text-lg font-medium">Search</span>
              <Dialog.Close>
                <i className="bi bi-x text-2xl" />
              </Dialog.Close>
            </Dialog.Title>
            <Dialog.Description className="hidden" />
            <SearchInput bgColor="#1A1A17" autoSelect showClearButton />
          </div>
          <div className="mb-4 flex flex-col gap-2 px-4">
            {searchKey !== "" ? (
              <SearchProjects searchKey={searchKey} />
            ) : (
              <Tags tags={uniqueTags} handleTagClick={() => setIsOpen(false)} />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
