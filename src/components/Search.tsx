import React, { useContext, useState } from "react";
import { BsSearch, BsArrowRightShort } from "react-icons/bs";
import { RecipeContext } from "../context/Recipes";
import { Link } from "react-router-dom";

const Search = () => {
  // States
  const [searchValue, setSearchValue] = useState<string>("");

  const { searchRecipes } = useContext(RecipeContext);

  return (
    <div className="my-8">
      <div className="relative">
        <input
          type="text"
          className="p-2 bg-gray-100 border rounded outline-none min-w-[300px] focus-within:border-gray-500"
          placeholder="Search recipe..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);

            if (e.target.value === "") {
              searchRecipes("");
            }
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              searchRecipes(searchValue);
            }
          }}
        />

        <BsSearch
          className="absolute p-[2px] text-2xl -translate-y-1/2 border right-2 top-1/2 rounded bg-gray-200 cursor-pointer hover:border-gray-500"
          onClick={() => searchRecipes(searchValue)}
        />
      </div>

      <Link
        to={`${window.location.href}random`}
        className="flex items-center justify-center mt-2 text-sm font-medium text-green-500 underline hover:underline-offset-2"
      >
        Feeling Lucky? Random Recipe <BsArrowRightShort />
      </Link>
    </div>
  );
};

export default Search;
