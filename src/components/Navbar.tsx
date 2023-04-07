import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center w-full py-3 bg-gray-100">
      <div className="w-full px-8 lg:px-0 lg:w-[900px] flex justify-between items-center">
        {/* Page */}
        <Link to="/" className="text-3xl font-bold">
          Eat<span className="text-green-600">Well</span>
        </Link>

        {/* Navigation */}
        <div>
          <Link
            to="/"
            className="p-2 font-semibold text-white bg-green-400 rounded shadow-md hover:bg-green-500"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="p-2 ml-5 font-semibold text-white bg-green-400 rounded shadow-md hover:bg-green-500"
          >
            New Recipe
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
