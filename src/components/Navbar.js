import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext/AuthContextProvider";
import useLogout from "../hooks/useLogout";
import DropDown from "./DropDown";

function Navbar() {
  const { user } = useContext(authContext);
  const { error, logout, isPending } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="py-6 fixed w-full z-10 navbar">
      <nav className="max-w-screen-2xl px-4 mx-auto lg:px-8 flex items-center justify-between text-white ">
        <div className="flex gap-12">
          <Link to="/">HOME</Link>
          <ul className="flex gap-4">
            <li>Movies</li>
            <li>Series</li>
          </ul>
        </div>

        {user && (
          <div className="flex gap-4">
            <DropDown logout={handleLogout} />
            {/* <button onClick={handleLogout} className="hover:text-purple-900">
              Logout
            </button> */}
          </div>
        )}
        {!user && (
          <div>
            <Link
              to="/login"
              className="px-4 py-2  bg-purple-700 rounded-md mr-4 hover:bg-purple-800"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 bg-purple-700 rounded-md hover:bg-purple-800"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
