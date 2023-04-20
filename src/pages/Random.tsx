import React, { useState, useEffect } from "react";
import { IRecipe } from "../context/Recipes";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { BiShuffle } from "react-icons/bi";

const Random = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    getRandomRecipe();
  }, []);

  const getRandomRecipe = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/random`
      );
      const data = await res.data;

      setRecipe(data.recipes[0]);
      setLoading(false);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while fetching recipe",
        color: "red",
      });
      setLoading(false);
    }
  };

  return (
    <div className="my-8 w-full px-8 lg:px-0 lg:w-[900px] flex flex-col items-start">
      {!loading && recipe && (
        <>
          <h1 className="px-1 text-xl font-semibold text-gray-400 bg-gray-100 border rounded">
            ↓ We found this recipe for you :-)
          </h1>
          <button
            className="flex items-center mt-2 text-sm font-bold text-gray-400 hover:underline"
            onClick={() => {
              getRandomRecipe();
            }}
          >
            Shuffle
            <BiShuffle />
          </button>

          <div className="flex flex-col w-full mt-8">
            <img
              src={recipe.recipe_image_url}
              alt="recipe"
              className="h-[300px] w-full mb-5 object-cover rounded-md shadow-md"
            />

            <h1 className="mb-2 font-semibold text-gray-900">
              {recipe.recipe_title}
            </h1>

            <h3 className="font-medium text-gray-400">Ingredients</h3>
            <p className="mb-2 font-medium text-gray-900">
              {recipe.recipe_ingredients.map((ing) => {
                return `· ${ing} `;
              })}
            </p>

            <h3 className="font-medium text-gray-400">Instructions</h3>
            <p className="mb-2 font-medium text-gray-900">
              {recipe.recipe_instructions.map((ins, index) => (
                <div key={`${index}`}>
                  ({index + 1}). {ins.text}
                </div>
              ))}
            </p>

            <h3 className="font-medium text-gray-400">Times</h3>
            <p className="font-medium text-gray-900">
              {recipe.recipe_times.map((time) => {
                return `· ${time} `;
              })}
            </p>
          </div>
        </>
      )}

      {!loading && !recipe && (
        <div className="w-full p-4 text-lg font-medium text-center text-gray-900 bg-gray-100 border rounded-md">
          No random recipe found
        </div>
      )}
    </div>
  );
};

export default Random;
