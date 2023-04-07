import React, { useContext, useState } from "react";
import { IRecipe, RecipeContext } from "../context/Recipes";
import { Modal } from "@mantine/core";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import { notifications } from "@mantine/notifications";

const RecipeModal = ({
  recipe,
  opened,
  close,
}: {
  recipe: IRecipe;
  opened: boolean;
  close: () => void;
}) => {
  // States
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [name, setName] = useState<string>(recipe.recipe_name);
  const [description, setDescription] = useState<string>(
    recipe.recipe_description
  );
  const [ingredients, setIngredients] = useState<string>(
    recipe.recipe_ingredients.join(",")
  );
  const [instructions, setInstructions] = useState<string>(
    recipe.recipe_instructions
  );
  const [imageLink, setImageLink] = useState<string>(recipe.recipe_image_url);

  const { deleteRecipe, updateRecipe } = useContext(RecipeContext);

  // Validate and call update recipe
  const checkAndCallUpdate = () => {
    // Check fields
    if (
      name === "" ||
      description === "" ||
      ingredients === "" ||
      instructions === ""
    ) {
      notifications.show({
        title: "Warn",
        message: "Please fill in the fields with a *",
        color: "yellow",
      });
      return;
    }
    // --------------------

    const data = {
      name,
      description,
      ingredients,
      instructions,
      imageLink,
    };

    updateRecipe(recipe.id, data);
  };

  return (
    <Modal opened={opened} onClose={close}>
      {/* Modal content */}
      <img
        src={recipe.recipe_image_url}
        className="w-full h-[250px] object-cover mb-3"
        alt="food"
      />

      {/* Not Updating elements */}
      {!updateMode && (
        <div>
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

          <div className="flex justify-end mt-5">
            <MdModeEdit
              className="p-1 text-3xl bg-gray-100 border rounded cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setUpdateMode(true);
              }}
            />
            <MdDeleteOutline
              className="p-1 ml-2 text-3xl text-red-500 bg-red-100 border rounded cursor-pointer hover:bg-red-200"
              onClick={() => {
                close;
                deleteRecipe(recipe.id);
              }}
            />
          </div>
        </div>
      )}

      {/* Updating input fields */}
      {updateMode && (
        <div>
          <form className="flex flex-col min-w-[400px] bg-green-50 p-2 rounded-md border border-green-200">
            <input
              type="text"
              className="w-full p-2 mb-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
              placeholder="* Recipe Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              rows={4}
              className="w-full p-2 mb-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
              placeholder="* Recipe Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-full p-2 mb-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
              placeholder="* Recipe Ingredients"
              value={ingredients}
              onChange={(e) => {
                setIngredients(e.target.value);
              }}
            />
            <textarea
              rows={4}
              className="w-full p-2 mb-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
              placeholder="* Recipe Instructions"
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-full p-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
              placeholder="Recipe Image URL"
              value={imageLink}
              onChange={(e) => {
                setImageLink(e.target.value);
              }}
            />
          </form>

          <div className="flex justify-end mt-5">
            <h1
              className="px-1 text-lg font-medium text-green-900 bg-green-100 border rounded cursor-pointer hover:bg-green-200"
              onClick={() => {
                checkAndCallUpdate();
                setUpdateMode(false);
              }}
              onKeyDown={() => {}}
            >
              Save
            </h1>
            <h1
              className="px-1 ml-2 text-lg font-medium bg-gray-100 border rounded cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setUpdateMode(false);
              }}
              onKeyDown={() => {}}
            >
              Cancel
            </h1>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RecipeModal;
