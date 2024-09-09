import React from "react";

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        className="border-2 border-gray-300 rounded-full px-4 py-2 w-full bg-slate-200 mt-4"
      />
    </div>
  );
};

export default SearchBar;
