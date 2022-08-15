import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function useFetch(api) {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(api);

        console.log(response.data.results);
        setData(response.data.results);
        setIsPending(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsPending(false);
      }
    };

    fetch();
  }, []);

  return { data, error, isPending };
}

export default useFetch;
