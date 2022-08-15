import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MovieContextProvider from "./context/movieContext/MovieContextProvider";
import AuthContextProvider from "./context/authContext/AuthContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <MovieContextProvider>
          <App />
        </MovieContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
