import { create } from "zustand";

interface SearchStore {
  searchKey: string;
  setSearchKey: (searchKey: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchKey: "",
  setSearchKey: (searchKey) => set({ searchKey }),
}));
