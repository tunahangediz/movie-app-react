import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, success: false, error: null, document: null };
    case "ADDED_DOC":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

function useFirestore(collectionIn) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = collection(db, collectionIn);

  const addDocument = async (movieDoc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await addDoc(ref, {
        ...movieDoc,
        createdAt: serverTimestamp(),
      });
      if (!isCancelled) {
        dispatch({ type: "ADDED_DOC", payload: response });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    }
  };
  const deleteDocument = async (id) => {};
  useEffect(() => {
    return () => setIsCancelled(true);
  }, {});

  return { addDocument, deleteDocument, response };
}

export default useFirestore;
