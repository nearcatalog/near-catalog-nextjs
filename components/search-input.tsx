import { useSearchModalStore } from "@/store/search-modal-store";
import { useSearchStore } from "@/store/search-store";

interface SearchInputProps {
  bgColor?: string;
  autoSelect?: boolean;
}

export default function SearchInput({ bgColor, autoSelect }: SearchInputProps) {
  const { searchKey, setSearchKey } = useSearchStore();
  const {
    isOpen,
    searchKey: modalSearchKey,
    setSearchKey: setModalSearchKey,
  } = useSearchModalStore();

  const handleSearchKeyChange = (e: any) => {
    if (isOpen) {
      setModalSearchKey(e.target.value);
    } else {
      setSearchKey(e.target.value);
    }
  };

  return (
    <div className="container relative mx-auto">
      <input
        autoFocus={autoSelect}
        type="text"
        name="search"
        value={isOpen ? modalSearchKey : searchKey}
        placeholder="Search projects"
        onChange={handleSearchKeyChange}
        className={`w-full rounded-lg border border-[#BEBDBE] ${bgColor ? `bg-[${bgColor}]` : "bg-black"} p-4 pl-12 font-medium text-white`}
      />
      <i className="bi bi-search absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-xl text-[#7E7E7E]" />
    </div>
  );
}
