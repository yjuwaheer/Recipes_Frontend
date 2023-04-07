import React, { useEffect, useContext } from "react";
import { RecipeContext, IRecipe } from "../context/Recipes";
import Search from "../components/Search";
import RecipeCard from "../components/RecipeCard";
import { Skeleton } from "@mantine/core";

const Home = () => {
  const { recipes, setRecipes, getRecipes, loading } =
    useContext(RecipeContext);

  useEffect(() => {
    getRecipes();
  }, []);

  const handleSorting = (value: string) => {
    if (value === "def") {
      getRecipes();
      return;
    }

    let tempRecipes = [...recipes];
    for (let i = 0; i < tempRecipes.length; i++) {
      for (let j = 0; j < tempRecipes.length - i - 1; j++) {
        if (value === "asc") {
          if (
            tempRecipes[j].recipe_ingredients.length >
            tempRecipes[j + 1].recipe_ingredients.length
          ) {
            let temp = tempRecipes[j];
            tempRecipes[j] = tempRecipes[j + 1];
            tempRecipes[j + 1] = temp;
          }
        }

        if (value === "dsc") {
          if (
            tempRecipes[j].recipe_ingredients.length <
            tempRecipes[j + 1].recipe_ingredients.length
          ) {
            let temp = tempRecipes[j];
            tempRecipes[j] = tempRecipes[j + 1];
            tempRecipes[j + 1] = temp;
          }
        }
      }
    }

    setRecipes(tempRecipes);
  };

  return (
    <div className="flex flex-col items-center w-full px-8 lg:px-0 lg:w-[900px] mb-8">
      <Search />

      {/* Sorter dropdown */}
      <select
        name="sort"
        id="sort"
        className="self-start p-1 mb-3 text-gray-600 bg-gray-100 border rounded"
        onChange={(e) => {
          handleSorting(e.target.value);
        }}
      >
        <option value="def">Default sort</option>
        <option value="asc">Less ingredients first</option>
        <option value="dsc">More ingredients first</option>
      </select>

      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          recipes &&
          recipes.length > 0 &&
          recipes.map((recipe: IRecipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}

        {loading && recipes.length === 0 && (
          <>
            <Skeleton className="w-[275px] h-[310px]" />
            <Skeleton className="w-[275px] h-[310px]" />
            <Skeleton className="w-[275px] h-[310px]" />
          </>
        )}
      </div>

      {!loading && recipes.length === 0 && (
        <div className="w-full p-4 text-lg font-medium text-center text-gray-900 bg-gray-100 border rounded-md">
          No recipes found
        </div>
      )}
    </div>
  );
};

export default Home;
