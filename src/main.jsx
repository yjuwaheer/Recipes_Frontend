import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RecipeContextProvider } from "./context/Recipes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withNormalizeCSS withGlobalStyles>
    <Notifications position="bottom-center" />
    <RecipeContextProvider>
      <App />
    </RecipeContextProvider>
  </MantineProvider>
);
