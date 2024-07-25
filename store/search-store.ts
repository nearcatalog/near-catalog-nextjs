import { create } from "zustand";

interface SearchStore {
  tags: string[];
  setTags: (tags: string[]) => void;
  searchKey: string;
  setSearchKey: (searchKey: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
  searchKey: "",
  setSearchKey: (searchKey) => set({ searchKey }),
}));
