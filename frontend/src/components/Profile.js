import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex justify-center text-center py-8">
      <div className="flex flex-col max-w-md w-full px-4 space-y-6">
        <Link to="/profile/edit" className="rounded-md border  border-gray-400 font-medium px-3 py-2 w-full">
          Edit profile
        </Link>
        <button
          onClick={() => requestLogout(user, setUser, history)}
          className="rounded-md bg-blue-600 text-white font-medium px-3 py-2 w-full"
        >
          Log out
        </button>
        <button
          onClick={() => requestLogoutAll(user, setUser, history)}
          className="rounded-md bg-blue-600 text-white font-medium px-3 py-2 w-full"
        >
          Log out from all devices
        </button>
        <a onClick={handleDelete} href="/profile/delete" className="">
          Delete account
        </a>
        {isDeleteModalOpen && (
          <DeleteModal
            user={user}
            isOpen={isDeleteModalOpen}
            reallyDelete={() => requestDeleteAccount(user, setUser, history)}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
