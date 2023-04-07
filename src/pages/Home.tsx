import React, { useEffect, useContext } from "react";
import { RecipeContext, IRecipe } from "../context/Recipes";
import Search from "../components/Search";
import RecipeCard from "../components/RecipeCard";
import { Skeleton } from "@mantine/core";

const Home = () => {
  const { recipes, getRecipes, loading } = useContext(RecipeContext);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-8 lg:px-0 lg:w-[900px] mb-8">
      <Search />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
