import React from "react";
import { IRecipe } from "../context/Recipes";
import { useDisclosure } from "@mantine/hooks";
import RecipeModal from "./RecipeModal";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div
        className="w-[275px] bg-gray-100 p-3 border rounded-md cursor-pointer"
        onClick={open}
        onKeyDown={() => {}}
      >
        <img src={recipe.recipe_image_url} className="w-full" alt="food" />

        <h1 className="mt-2 text-xl font-semibold text-gray-800">
          {recipe.recipe_name.length > 22
            ? `${recipe.recipe_name.substring(0, 22)}...`
            : recipe.recipe_name}
        </h1>
      </div>

      <RecipeModal recipe={recipe} opened={opened} close={close} />
    </>
  );
};

export default RecipeCard;
