import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { requestLogout } from "./Profile";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <nav>
      <header className="flex justify-center border-b border-gray-300 shadow-sm">
        <div className="flex items-center justify-evenly h-16 w-full">
          <Link
            to="/"
            className={`flex items-center h-full font-medium px-4 py-3 hover:bg-gray-100 cursor-pointer border-b-4 ${
              pathname === "/" ? " border-blue-500" : "border-white"
            }`}
          >
            Tasks
          </Link>
          {!user && (
            <Link
              to="/signup"
              className={`flex items-center h-full font-medium px-4 py-3 hover:bg-gray-100 cursor-pointer border-b-4 ${
                pathname === "/signup" ? " border-blue-500" : "border-white"
              }`}
            >
              Signup
            </Link>
          )}
          {!user && (
            <Link
              to="/login"
              className={`flex items-center h-full font-medium px-4 py-3 hover:bg-gray-100 cursor-pointer border-b-4 ${
                pathname === "/login" ? " border-blue-500" : "border-white"
              }`}
            >
              Login
            </Link>
          )}
          {/* {user && (
            <a
              href="/logout"
              onClick={() => {
                requestLogout(user, setUser, history);
              }}
              className="font-medium rounded-xl px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </a>
          )} */}
          {user && (
            <Link
              to="/profile"
              className={`flex items-center h-full font-medium px-4 py-3 hover:bg-gray-100 cursor-pointer border-b-4 ${
                pathname === "/profile" ? " border-blue-500" : "border-white"
              }`}
            >
              {/* profile */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>

              {/* <div className="absolute top-14 right-0 p-3 bg-white shadow text-gray-800">
                <div>{user.email}</div>
                <div>Profile</div>
                <div>Logout</div>
              </div> */}
            </Link>
          )}
          <Link
            to="/about"
            className={`flex items-center h-full font-medium px-4 py-3 hover:bg-gray-100 cursor-pointer border-b-4 ${
              pathname === "/about" ? " border-blue-500" : "border-white"
            }`}
          >
            About
          </Link>
        </div>
      </header>
    </nav>
  );
}

export default Navbar;
