import { Search } from "lucide-react";

const SearchComponent = () => {
  return (
    <div className="relative w-full">
      <Search size={20} stroke="#656a7b" className="absolute top-4.5 start-4" />
      <input
        type="search"
        className="pe-4 ps-11 py-4 text-[#373737] placeholder:text-[#373737] placeholder:text-sm border border-[#d1d1d1] w-full outline-0"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchComponent;
