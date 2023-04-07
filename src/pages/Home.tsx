import React, { useEffect, useContext } from "react";
import { RecipeContext, IRecipe } from "../context/Recipes";
import Search from "../components/Search";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const { recipes, getRecipes } = useContext(RecipeContext);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Search />

      <div className="grid gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3">
        {recipes &&
          recipes.length > 0 &&
          recipes.map((recipe: IRecipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </>
  );
};

export default Home;
