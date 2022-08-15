import React, { useContext, useEffect } from "react";
import { useReducer } from "react";
import { movieContext } from "./movieContext";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import userEvent from "@testing-library/user-event";
import { authContext } from "../authContext/AuthContextProvider";

const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRENDS":
      return { ...state, trends: action.payload };
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };

    default:
      break;
  }
};

function MovieContextProvider({ children }) {
  const initialState = {
    trends: [],
    favorites: [],
  };
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const { user } = useContext(authContext);
  // const addMovieFavorite = (movieId) => {
  //   const newFavorites = [...state.favorites, movieId];
  //   dispatch({ type: "SET_FAVORITES", payload: newFavorites });
  // };
  // useEffect(() => {
  //   if (user) {
  //     const getAll = async () => {
  //       const userID = user.uid;
  //       const q = query(
  //         collection(db, "favorites"),
  //         where("uid", "==", userID)
  //       );
  //       const newFavorites = [];
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.data().movie.id);
  //         newFavorites.push({ doc_id: doc.id, ...doc.data() });
  //       });

  //       dispatch({ type: "SET_FAVORITES", payload: newFavorites });
  //     };
  //     getAll();
  //   }
  // }, [user]);

  useEffect(() => {
    // setIsPending(true);
    const newFavorites = [];
    dispatch({ type: "SET_FAVORITES", payload: newFavorites });
    if (user) {
      const userID = user.uid;

      const q = query(collection(db, "favorites"), where("uid", "==", userID));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            // setError("No notes to load");
            // setIsPending(false);
            // setData([]);
          } else {
            const newFavorites = [];
            snapshot.forEach((doc) => {
              newFavorites.push({ doc_id: doc.id, ...doc.data() });
              console.log(doc.data());
            });
            dispatch({ type: "SET_FAVORITES", payload: newFavorites });
            // setIsPending(false);
            // console.log(notes);
          }
        },
        (err) => {
          // setError(err);
          // setIsPending(false);
        }
      );
      return () => {
        unsub();
      };
    }
  }, [user]);

  console.log("favssss", state.favorites);
  return (
    <movieContext.Provider value={{ ...state, dispatch }}>
      {children}
    </movieContext.Provider>
  );
}

export default MovieContextProvider;
