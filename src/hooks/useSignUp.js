import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext/AuthContextProvider";
import { auth } from "../firebase/config";

function useSignUp() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const signup = async (email, password, navigation_input) => {
    setError(null);
    setIsPending(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!response) {
        throw new Error("could not complete signup");
      }
      dispatch({ type: "LOGIN", payload: response.user });
      setIsPending(false);
      navigate(navigation_input);
      console.log(response);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
}

export default useSignUp;
