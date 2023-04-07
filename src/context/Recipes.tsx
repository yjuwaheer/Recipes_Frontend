import React, { createContext, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export interface IRecipe {
  id: number;
  recipe_name: string;
  recipe_description: string;
  recipe_ingredients: string[];
  recipe_instructions: string;
  recipe_image_url: string;
}

export interface IRecipeCreate {
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  imageLink: string;
}

export interface IRecipesContext {
  recipes: IRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
  getRecipes: () => Promise<void>;
  deleteRecipe: (id: number) => Promise<void>;
  updateRecipe: (id: number, newData: IRecipeCreate) => Promise<void>;
}

export const RecipeContext = createContext({} as IRecipesContext);

export const RecipeContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Get recipes
  const getRecipes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/recipes`
      );

      const data = res.data;
      setRecipes(data.recipes);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while fetching the recipes",
        color: "red",
      });
    }
  };

  // Handle delete recipe
  const deleteRecipe = async (id: number) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/recipes`,
        {
          data: { recipeId: id },
        }
      );
      const data = res.data;

      notifications.show({
        title: data.success ? "Success" : "Error",
        message: data.message,
        color: data.success ? "green" : "red",
      });

      // Update recipes state if successful
      if (data.success) {
        let tempRecipes = [];
        tempRecipes = recipes.filter((recipe) => recipe.id !== id);
        setRecipes(tempRecipes);
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while deleting the recipe",
        color: "red",
      });
    }
  };

  // Handle update recipe
  const updateRecipe = async (id: number, newData: IRecipeCreate) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/recipes`,
        {
          recipeId: id,
          ...newData,
        }
      );
      const data = res.data;

      notifications.show({
        title: data.success ? "Success" : "Error",
        message: data.message,
        color: data.success ? "green" : "red",
      });

      // Update recipes state if successful
      if (data.success) {
        getRecipes();
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while updating the recipe",
        color: "red",
      });
    }
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, setRecipes, getRecipes, deleteRecipe, updateRecipe }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
