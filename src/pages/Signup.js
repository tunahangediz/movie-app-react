import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signup, isPending } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(email, password);
    e.preventDefault();
    signup(email, password, "/");
  };
  return (
    <div className="w-full py-10">
      <Link to="/" className="bg-indigo-600 p-4 text-white rounded-lg ml-10">
        Go Dashboard
      </Link>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
          SIGN UP
        </h1>

        {/* <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p> */}

        <form
          onSubmit={handleSubmit}
          className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-white"
        >
          <p className="text-lg font-medium">Register and start</p>

          <div>
            <label for="email" className="text-sm font-medium">
              Email
            </label>

            <div className="relative mt-1">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label for="password" className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-1">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          {isPending ? (
            <button
              disabled
              className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            >
              Creating...
            </button>
          ) : (
            <button
              type="submit"
              className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            >
              Create Account
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
