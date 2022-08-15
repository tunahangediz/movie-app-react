import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import DropDown from "./components/DropDown";
import Navbar from "./components/Navbar";
import { authContext } from "./context/authContext/AuthContextProvider";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { isAuthReady } = useContext(authContext);
  return (
    <div className="App h-full ">
      {isAuthReady && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Details />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
