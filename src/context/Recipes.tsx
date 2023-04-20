import React, { createContext, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export interface IRecipeInstructions {
  text: string;
  type: string;
}

export interface IRecipe {
  id: number;
  recipe_title: string;
  recipe_ingredients: string[];
  recipe_instructions: IRecipeInstructions[];
  recipe_times: string[];
  recipe_image_url: string;
}

export interface IRecipeCreate {
  title: string;
  ingredients: string;
  instructions: string;
  times: string;
  imageLink: string;
}

export interface IRecipesContext {
  loading: boolean;
  recipes: IRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
  getRecipes: () => Promise<void>;
  getRecipe: (id: number) => Promise<IRecipe>;
  searchRecipes: (value: string) => Promise<void>;
  deleteRecipe: (id: number) => Promise<void>;
  updateRecipe: (id: number, newData: IRecipeCreate) => Promise<void>;
}

export const RecipeContext = createContext({} as IRecipesContext);

export const RecipeContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Get recipes
  const getRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/recipes`
      );

      const data = await res.data;
      setRecipes(data.recipes);
      setLoading(false);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while fetching the recipes",
        color: "red",
      });
      setLoading(false);
    }
  };

  // Get a recipe
  const getRecipe = async (id: number) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/${id}`
      );

      const data = res.data;
      return data.recipes[0];
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while fetching the recipes",
        color: "red",
      });
    }
  };

  // Get recipes by search value
  const searchRecipes = async (value: string) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/recipes/search?searchValue=${value}`
      );

      const data = await res.data;
      setRecipes(data.recipes);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while searching",
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
      value={{
        loading,
        recipes,
        setRecipes,
        getRecipes,
        getRecipe,
        searchRecipes,
        deleteRecipe,
        updateRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
