"use client";

import { useSearchModalStore } from "@/store/search-modal-store";
import * as Dialog from "@radix-ui/react-dialog";
import SearchInput from "../search-input";
import FilterProjects from "../home/filtered-projects";
import { ProjectRecord } from "@/lib/types";
import { fetchAllProjects } from "@/lib/near-catalog";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/search-store";

import Link from "next/link";

function Tags({
  tags,
  onClick,
}: {
  tags: Record<string, string>;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Object.keys(tags).map((key, index) => (
        <Link
          href={`/category/${key}`}
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={index}
          onClick={onClick}
        >
          {tags[key]}
        </Link>
      ))}
    </div>
  );
}

export default function SearchModal() {
  const { isOpen, setIsOpen } = useSearchModalStore();
  const { setTags } = useSearchStore();

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

  useEffect(() => {
    if (isOpen) {
      setTags([]);
    }
  }, [isOpen, setTags]);

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
      <Dialog.Trigger asChild>
        <div className="mt-4 flex w-full cursor-pointer items-center justify-between truncate rounded-lg border border-[#3F3F3F] bg-[#1A1A17] px-4 py-2 text-white md:hidden">
          <span></span>
          <i className="bi bi-chevron-down flex h-4 w-4 items-center justify-center text-xl" />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[.375rem]" />
        <Dialog.Content className="pb-2focus:outline-none fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[28.125rem] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-lg bg-[#1A1A17] px-6 md:max-w-[80%]">
          <div className="sticky -top-1 flex flex-col gap-2 bg-[#1A1A17] p-4">
            <Dialog.Title className="mb-2 flex items-center justify-between">
              <span className="text-lg font-medium">Search</span>
              <Dialog.Close>
                <i className="bi bi-x text-2xl" />
              </Dialog.Close>
            </Dialog.Title>
            <Dialog.Description className="hidden" />
            <SearchInput bgColor="#1A1A17" />
          </div>
          <div className="mb-4 flex flex-col gap-2 px-4">
            <Tags tags={uniqueTags} onClick={() => setIsOpen(false)} />
            <FilterProjects
              projects={projects}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
