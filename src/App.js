import { useContext } from "react";

import "./App.css";
import { authContext } from "./context/authContext/AuthContextProvider";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Signup from "./pages/Signup";
import Routes from "./routes/routes";
import MainRoutes from "./routes/routes";

function App() {
  const { isAuthReady, user } = useContext(authContext);

  return <div className="App h-full ">{isAuthReady && <MainRoutes />}</div>;
}

export default App;
