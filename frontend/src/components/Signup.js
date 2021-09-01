import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, useHistory } from "react-router-dom";
import { requestLogin } from "./Login";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const requestSignup = async () => {
    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        console.log(res.statusText);
        throw new Error("requestSignup error");
      }
      const { user } = await res.json();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email) {
      return setErrorMessage("Please enter your email");
    }

    const signedup = await requestSignup();
    if (signedup) {
      const loggedin = await requestLogin(email, password, setUser);
      if (loggedin) {
        history.push("/");
      }
    }
    setErrorMessage("Sign up failed");
  };

  return (
    <div className="flex justify-center">
      <div className="w-96 rounded-lg shadow-lg p-4">
        <div className="space-y-4 m-3">
          <span className="text-2xl font-medium">Sign up</span>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="font-medium text-gray-600 text-sm">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value.trim())}
                type="email"
                id="email"
                className="rounded-md w-full py-1.5 px-3 border border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="font-medium text-gray-600 text-sm">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value.trim())}
                type="password"
                id="password"
                className="rounded-md w-full py-1.5 px-3 border border-gray-300"
              />

              {errorMessage && (
                <div className="flex items-center text-red-500 mt-3 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleSignup}
                className="rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-2 w-full"
              >
                Sign up
              </button>
            </div>
          </form>

          <div>
            Have an account?
            <Link to="/login" className="ml-2 text-blue-600">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
