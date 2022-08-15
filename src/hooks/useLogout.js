import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useState } from "react";
import { authContext } from "../context/authContext/AuthContextProvider";
import { auth } from "../firebase/config";

function useLogout() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(authContext);
  const logout = async () => {
    setIsPending(true);
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        dispatch({ type: "LOGOUT" });
        setIsPending(false);
      })
      .catch((error) => {
        console.log(error);
        setIsPending(false);
      });
  };
  return { error, isPending, logout };
}

export default useLogout;
