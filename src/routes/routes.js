import React from "react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authContext } from "../context/authContext/AuthContextProvider";
import Details from "../pages/Details";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Movies from "../pages/Movies";
import Signup from "../pages/Signup";

function MainRoutes() {
  const { user } = useContext(authContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Details />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="movies" element={<Movies />} />
      <Route
        path="favorites"
        element={user ? <Favorites /> : <Navigate replace to="/login" />}
      />
    </Routes>
  );
}

export default MainRoutes;
