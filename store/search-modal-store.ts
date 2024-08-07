import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSearchModalStore = create<SearchModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
