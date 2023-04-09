import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

const Create = () => {
  // States
  const [title, setTitle] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [times, setTimes] = useState<string>("");
  const [imageLink, setImageLink] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  // Handle add recipe
  const addRecipe = async () => {
    // Check fields
    if (title === "" || ingredients === "" || instructions === "") {
      notifications.show({
        title: "Warn",
        message: "Please fill in the fields with a *",
        color: "yellow",
      });
      return;
    }
    // --------------------

    // Construct instructions
    let instructionsList: string = "[";
    instructions.split(";").forEach((instruction) => {
      instructionsList += `{"type": "HowToStep", "text": "${instruction}"},`;
    });
    instructionsList = instructionsList.slice(0, -1).concat("]");
    //

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/recipes`,
        {
          title,
          ingredients,
          instructions: instructionsList,
          times,
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
    setTitle("");
    setIngredients("");
    setInstructions("");
    setTimes("");
    setImageLink("");
  };

  return (
    <div className="flex flex-col w-full px-8 mt-8 sm:w-fit lg:px-0">
      <form className="flex flex-col w-full sm:w-[400px] bg-green-50 p-2 rounded-md border border-green-200">
        <input
          type="text"
          className="w-full p-2 mb-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
          placeholder="* Recipe Name"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          rows={4}
          className="w-full p-2 mb-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
          placeholder="* Recipe Ingredients - semicolon separated"
          value={ingredients}
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
        />
        <textarea
          rows={4}
          className="w-full p-2 mb-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
          placeholder="* Recipe Instructions - semicolon separated"
          value={instructions}
          onChange={(e) => {
            setInstructions(e.target.value);
          }}
        />
        <input
          type="text"
          className="w-full p-2 mb-2 bg-gray-100 border rounded outline-none focus-within:border-gray-500"
          placeholder="Recipe Times - semicolon separated"
          value={times}
          onChange={(e) => {
            setTimes(e.target.value);
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
