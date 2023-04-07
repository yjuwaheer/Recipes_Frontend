import React from "react";
import { IRecipe } from "../context/Recipes";
import { useDisclosure } from "@mantine/hooks";
import RecipeModal from "./RecipeModal";
import { BiLinkExternal } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  return (
    <>
      <div
        className="relative w-[275px] bg-gray-100 p-3 border rounded-md cursor-pointer"
        onClick={open}
        onKeyDown={() => {}}
      >
        <img src={recipe.recipe_image_url} className="w-full" alt="food" />

        {/* Open recipe in new tab */}
        <a
          href={`${window.location.href}recipes/${recipe.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <BiLinkExternal
            className="absolute p-1 text-2xl bg-gray-200 rounded top-4 right-4 hover:bg-gray-300"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </a>

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
