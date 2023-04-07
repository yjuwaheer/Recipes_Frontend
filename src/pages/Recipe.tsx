import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { IRecipe, RecipeContext } from "../context/Recipes";
import { Skeleton } from "@mantine/core";

const Recipe = () => {
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  const { getRecipe } = useContext(RecipeContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const recipe = await getRecipe(parseInt(id));
        setRecipe(recipe);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <div className="my-8 w-full px-8 lg:px-0 lg:w-[900px] flex flex-col items-start">
      {loading && (
        <>
          <Skeleton className="h-[300px] w-full mb-5" />

          <Skeleton className="w-full h-6 mb-3" />
          <Skeleton className="w-full h-6 mb-3" />
          <Skeleton className="w-full h-6 mb-3" />
        </>
      )}

      {!loading && !recipe && (
        <div className="w-full p-4 text-lg font-medium text-center text-gray-900 bg-gray-100 border rounded-md">
          Recipe not found
        </div>
      )}

      {!loading && recipe && (
        <>
          <img
            src={recipe.recipe_image_url}
            alt="recipe"
            className="h-[300px] w-full mb-5 object-cover rounded-md shadow-md"
          />

          <h1 className="mb-2 font-semibold text-gray-900">
            {recipe.recipe_name}
          </h1>

          <h3 className="font-medium text-gray-400">Description</h3>
          <p className="mb-2 font-medium text-gray-900">
            {recipe.recipe_description}
          </p>

          <h3 className="font-medium text-gray-400">Ingredients</h3>
          <p className="mb-2 font-medium text-gray-900">
            {recipe.recipe_ingredients.map((ing) => {
              return `· ${ing} `;
            })}
          </p>

          <h3 className="font-medium text-gray-400">Instructions</h3>
          <p className="font-medium text-gray-900">
            {recipe.recipe_instructions}
          </p>
        </>
      )}
    </div>
  );
};

export default Recipe;
