import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="my-8">
      <div className="relative">
        <input
          type="text"
          className="p-2 bg-gray-100 border rounded outline-none min-w-[300px] focus-within:border-gray-500"
          placeholder="Search recipe..."
        />

        <BsSearch className="absolute p-[2px] text-2xl -translate-y-1/2 border right-2 top-1/2 rounded bg-gray-200 cursor-pointer hover:border-gray-500" />
      </div>

      {/* Search type */}
    </div>
  );
};

export default Search;
