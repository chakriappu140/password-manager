import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
// import DarkModeToggle from "./ui/DarkModeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-800 shadow transition-colors">
      <Link to="/dashboard" className="text-2xl font-bold text-gray-800 dark:text-white">
        🔐 PassVault
      </Link>
      <div className="flex items-center gap-4">
        {/* <DarkModeToggle /> */}
        {user && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
