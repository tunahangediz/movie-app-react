import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext/AuthContextProvider";
import { auth } from "../firebase/config";

function useLogin() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useContext(authContext);

  const navigate = useNavigate();

  const login = async (email, password, navigation_input) => {
    setIsPending(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: response.user });
      setIsPending(false);
      navigate(navigation_input);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsPending(false);
    }
  };

  return { error, login, isPending };
}

export default useLogin;
