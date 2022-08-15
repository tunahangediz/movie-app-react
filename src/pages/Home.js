import Navbar from "../components/Navbar";
import TrendSwiper from "../components/TrendSwiper";
import useFetch from "../hooks/useFetch";
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
import { movieContext } from "../context/movieContext/movieContext";

function Home() {
  const api = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
  const { data, error, isPending } = useFetch(api);
  const randomNum = Math.floor(Math.random() * 20);

  const randomMovie = data.length > 0 && data[randomNum];

  // if (isPending) {
  //   return (
  //     <div className="absolute w-full h-full  text-center text-2xl ">
  //       loading........
  //     </div>
  //   );
  // }
  return (
    <>
      <img
        src={
          randomMovie &&
          `https://image.tmdb.org/t/p/original${data[randomNum].backdrop_path}`
        }
        className="absolute object-cover w-full h-full  image -z-10"
        loading="lazy"
      />

      <div className="h-full  ">
        <Navbar />

        <div className="flex flex-col justify-between h-full my-container">
          <div className=" pt-36 mb-8 lg:text-left text-center  ">
            <div className=" lg:max-w-md flex flex-col gap-4">
              <h1 className="text-6xl font-bold text-white  ">
                {randomMovie.title || randomMovie.name}
              </h1>
              {/* <p className=" text-gray-400  ">A Disney Original Film 2021</p> */}
              <div>
                <button className="py-2 px-12   text-white font-medium bg-purple-500 hover:bg-purple-700 rounded-full">
                  PLAY
                </button>
              </div>
            </div>
          </div>
          {error && <p>{error}</p>}

          {data && <TrendSwiper trends={data} />}
        </div>
      </div>
    </>
  );
}

export default Home;
