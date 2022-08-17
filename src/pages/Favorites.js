import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { authContext } from "../context/authContext/AuthContextProvider";
import Navbar from "../components/Navbar";
import { movieContext } from "../context/movieContext/movieContext";
import { BeakerIcon, StarIcon } from "@heroicons/react/solid";
function Favorites() {
  //   const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { user } = useContext(authContext);
  const { favorites: favoriteMovies, dispatch } = useContext(movieContext);

  console.log(favoriteMovies);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className=" my-container pt-28 bg-black grid md:grid-cols-2 lg:grid-cols-4 items-center  justify-items-center gap-12">
        {favoriteMovies.map((el) => (
          <div className="w-full relative">
            <div className="">
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original${el.movie.poster_path}`}
                alt=""
              />
            </div>

            <h5 className="text-white"> {el.movie.title}</h5>

            <StarIcon className="h-6 w-6 hover:bg-red-400 hover:text-white bg-white text-yellow-400 rounded-full absolute top-2 right-2 "></StarIcon>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
