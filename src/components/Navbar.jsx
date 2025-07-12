import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="bg-primary text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="ReWear Logo" className="w-8 h-8" />
        <span className="font-bold text-xl">ReWear</span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="hover:text-accent2 transition">
          Home
        </Link>
        <Link to="/browse" className="hover:text-accent2 transition">
          Browse
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-opacity-90 text-sm"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-accent2 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-accent1 text-textDark px-4 py-1 rounded-md hover:bg-accent2 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
