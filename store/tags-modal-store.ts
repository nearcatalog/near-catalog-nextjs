import { create } from "zustand";

interface TagsModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useTagsModalStore = create<TagsModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
