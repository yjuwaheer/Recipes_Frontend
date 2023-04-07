import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

const Create = () => {
  // States
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [imageLink, setImageLink] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  // Handle add recipe
  const addRecipe = async () => {
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

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/recipes`,
        {
          name,
          description,
          ingredients,
          instructions,
          imageLink,
        }
      );
      const data = res.data;

      notifications.show({
        title: data.success ? "Success" : "Error",
        message: data.message,
        color: data.success ? "green" : "red",
      });

      // Clear fields if success
      if (data.success) {
        resetFields();
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while adding the recipe",
        color: "red",
      });
    }
  };

  const resetFields = () => {
    setName("");
    setDescription("");
    setIngredients("");
    setInstructions("");
    setImageLink("");
  };

  return (
    <div className="flex flex-col mt-8">
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
          placeholder="* Recipe Ingredients - comma separated"
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

      {/* Add */}
      <button
        className="p-2 mt-2 font-semibold text-white bg-green-400 rounded shadow-md hover:bg-green-500"
        onClick={() => {
          addRecipe();
        }}
      >
        Add Recipe
      </button>
    </div>
  );
};

export default Create;
