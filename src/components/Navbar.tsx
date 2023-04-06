import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 w-full flex justify-center py-3">
      <div className="min-w-[900px] flex justify-between items-center">
        {/* Page */}
        <h1 className="font-bold text-3xl">
          Eat<span className="text-green-600">Well</span>
        </h1>

        {/* Navigation */}
        <div>
          <Link
            to="/"
            className="bg-green-400 font-semibold text-white  p-2 rounded hover:bg-green-500 shadow-md"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="ml-5 bg-green-400 font-semibold text-white  p-2 rounded hover:bg-green-500 shadow-md"
          >
            Add Recipe
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
