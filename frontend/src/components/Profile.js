import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const requestLogout = async (user, setUser, history) => {
  try {
    const res = await fetch("http://localhost:4000/users/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("requestLogout failed");
    }
    setUser(null);
    history.push("/");
  } catch (error) {
    setUser(null);
    history.push("/");
  }
};

export const requestLogoutAll = async (user, setUser, history) => {
  try {
    const res = await fetch("http://localhost:4000/users/logoutall", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("requestLogoutAll failed");
    }
    setUser(null);
    history.push("/");
  } catch (error) {
    setUser(null);
    history.push("/");
  }
};

export const requestDeleteAccount = async (user, setUser, history) => {
  try {
    const res = await fetch("http://localhost:4000/users/me", {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("requestDeleteAccount failed");
    }
    setUser(null);
    history.push("/");
  } catch (error) {
    setUser(null);
    history.push("/");
  }
};

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  return (
    <div className="flex justify-center text-center py-8">
      <div className="flex flex-col w-96 space-y-6">
        <Link
          to="/profile/edit"
          className="rounded-md border  border-gray-400 hover:bg-gray-200 font-medium px-3 py-2 w-full"
        >
          Edit profile
        </Link>
        <a
          onClick={() => requestLogout(user, setUser, history)}
          href="/logout"
          className="rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-2 w-full"
        >
          Log out
        </a>
        <a
          onClick={() => requestLogoutAll(user, setUser, history)}
          href="/logoutall"
          className="rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-2 w-full"
        >
          Log out from all devices
        </a>
        <a
          onClick={() => requestDeleteAccount(user, setUser, history)}
          href="/profile/delete"
          className="hover:underline"
        >
          Delete account
        </a>
      </div>
    </div>
  );
};

export default Profile;
