import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  searchKey: string;
  setSearchKey: (searchKey: string) => void;
}

export const useSearchModalStore = create<SearchModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  searchKey: "",
  setSearchKey: (searchKey) => set({ searchKey }),
}));
