import { deleteDoc, doc } from "firebase/firestore";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext/AuthContextProvider";
import { movieContext } from "../context/movieContext/movieContext";
import { db } from "../firebase/config";

import useFirestore from "../hooks/useFirestore";

function MovieDetailsCard({ movie, videoKey }) {
  const navigate = useNavigate();
  const { user } = useContext(authContext);

  const { favorites, addMovieFavorite } = useContext(movieContext);
  const { success, error, isPending, addDocument, deleteDocument } =
    useFirestore("favorites");
  const checkFavorites = favorites.find((fav) => fav.movie.id === movie.id);

  const deleteFavorite = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "favorites", id));
  };

  const addFavorite = (e) => {
    e.preventDefault();

    console.log(checkFavorites);
    if (!user) {
      navigate("/login");
      return;
    }

    if (!checkFavorites) {
      addDocument({
        movie: movie,
        uid: user.uid,
      });
    } else {
      console.log("This movie alredy in your favorite list");
    }
  };
  return (
    <div
      className="bg-cover w-full min-h-screen"
      style={{
        backgroundImage:
          movie.backdrop_path &&
          `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="details-card min-h-screen">
        <div className="my-container ">
          <Link className="text-white hover:text-gray-400" to="/">
            Back to main dashboard
          </Link>
          <div className="  py-8 xl:flex justify-between w-full flex-wrap ">
            <div className="max-w-xl sm:flex sm:flex-row gap-12  flex flex-col items-center">
              <img
                className=" w-48"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
              <div className="drop-shadow-2xl text-center sm:text-left">
                <h1 className="text-6xl font-bold text-white  ">
                  {movie.title || movie.name}
                </h1>
                <p className="text-gray-300 py-4">{movie.overview}</p>
              </div>
            </div>
            {videoKey && (
              <iframe
                style={{
                  width: "100%",
                  maxWidth: "540px",
                  height: "100%",
                  minHeight: "320px",
                }}
                src={`https://www.youtube.com/embed/${videoKey}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            )}
          </div>
          {checkFavorites ? (
            <button
              className="text-white"
              onClick={() => deleteFavorite(checkFavorites.doc_id)}
            >
              delete from Fav
            </button>
          ) : (
            <button className="text-white" onClick={addFavorite}>
              ADD FAVORİTE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsCard;
