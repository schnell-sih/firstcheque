import Chip from "@/components/FilterChip";
import SearchBar from "@/components/SearchBar";
import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col items-start w-[80%] mx-auto">
      <h1 className="text-[5rem] font-bold mt-24">Explore</h1>
      <SearchBar />
      <Chip />
    </div>
  );
};

export default Search;
