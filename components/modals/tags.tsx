"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTagsModalStore } from "@/store/tags-modal-store";
import { useSearchStore } from "@/store/search-store";
import { useEffect, useState } from "react";

const Tags = ({
  handleTagClick,
}: {
  handleTagClick: (tag: string) => void;
}) => {
  const { tags, allTags } = useSearchStore();
  return (
    <div className="flex flex-wrap gap-2 md:hidden">
      {allTags.map((tag) => (
        <div
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`${tags.includes(tag) ? "" : "opacity-50"} inline-flex h-6 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#17D9D466] px-2 py-1 text-xs font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#17D9D480] active:bg-[#17D9D499]`}
        >
          {tags.includes(tag) ? (
            <i className="bi bi-check text-xl" />
          ) : (
            <i className="bi bi-x text-xl" />
          )}
          {tag}
        </div>
      ))}
    </div>
  );
};

function TagsModal() {
  const { isOpen, setIsOpen } = useTagsModalStore();
  const { tags, allTags, setTags } = useSearchStore();

  const [searchAllTags, setSearchAllTags] = useState(true);

  useEffect(() => {
    if (searchAllTags) {
      setTags(allTags);
    }
  }, [searchAllTags, setTags, allTags]);

  const handleTagClick = (tag: string) => {
    if (searchAllTags) {
      setSearchAllTags(false);
      setTags([tag]);
    } else {
      if (tags.includes(tag)) {
        setTags(tags.filter((searchTag) => searchTag !== tag));
      } else {
        setTags(Array.from(new Set([...tags, tag])));
      }
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[6px]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-2xl bg-[#1A1A17] px-6 py-2 focus:outline-none">
          <Dialog.Title className="flex items-center justify-between">
            <span className="text-xs font-medium">Select Tags</span>
            <Dialog.Close>
              <i className="bi bi-x text-xl" />
            </Dialog.Close>
          </Dialog.Title>
          <Dialog.Description className="hidden" />
          <div className="flex flex-col gap-2">
            <label className="inline-flex cursor-pointer items-center md:hidden">
              <input
                type="checkbox"
                name="mobile-tags"
                checked={searchAllTags}
                className="peer sr-only"
                onChange={() => setSearchAllTags((prev) => !prev)}
              />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span className="ms-3 text-sm font-medium text-gray-300">
                All Tags
              </span>
            </label>
            <div className="flex flex-col gap-2">
              <Tags handleTagClick={handleTagClick} />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Dialog.Close asChild>
              <button className="w-full p-4 text-sm font-bold uppercase focus:outline-none">
                Show Results
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default TagsModal;
