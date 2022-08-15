import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { auth } from "../../firebase/config";
export const authContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "AUTH_READY":
      return { ...state, user: action.payload, isAuthReady: true };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      break;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_READY", payload: user });
      unsub();
    });
  }, []);
  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}
