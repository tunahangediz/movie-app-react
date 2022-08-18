import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../components/MovieDetailsCard";
import useFetch from "../hooks/useFetch";

function Details() {
  const { id } = useParams();
  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(api);

        console.log(response.data);
        setIsPending(false);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsPending(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const videoApi = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
      try {
        const response = await axios.get(videoApi);
        const ofcObj = response.data.results.filter(
          (trailer) => trailer.name === "Official Trailer"
        );
        setVideoKey(ofcObj[0].key);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetch();
  });
  return (
    <div className="sm:h-full w-full">
      {error && <p>{error}</p>}
      {isPending && <p>Loading....</p>}
      {data && <MovieDetailsCard movie={data} videoKey={videoKey} />}
    </div>
  );
}

export default Details;
