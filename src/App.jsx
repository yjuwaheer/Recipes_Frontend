import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Recipe from "./pages/Recipe";
import Random from "./pages/Random";

const App = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="recipes">
            <Route path=":id" element={<Recipe />} />
          </Route>
          <Route path="random" element={<Random />} />
          <Route path="create" element={<Create />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold">
                  Error 404, Page not found
                </h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
