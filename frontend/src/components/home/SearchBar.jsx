import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative">

      <Search
        className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 sm:left-4"
      />

      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-3 sm:pl-12 sm:text-base"
      />

    </div>
  );
};

export default SearchBar;