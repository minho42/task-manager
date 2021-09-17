import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export const DeleteModal = ({ user, children, isOpen, reallyDelete, onClose }) => {
  const [value, setValue] = useState(null);
  const [isMatch, setIsMatch] = useState(false);

  const escClose = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escClose);
    return () => {
      document.removeEventListener("keydown", escClose);
    };
  }, []);

  useEffect(() => {
    // Using useEffect to setIsMatch as useState sets it 1 letter late...
    // https://stackoverflow.com/questions/57403647/changing-state-for-input-is-delayed-by-one-character-usestate-hook

    if (value?.toLowerCase() === user.email?.toLowerCase()) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value.trim());
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40">
      <div
        id="overlay"
        className="min-h-screen min-w-screen bg-black opacity-40"
        onClick={() => onClose()}
      ></div>
      <div className="fixed max-w-md top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-2 bg-white rounded-lg shadow-2xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Are you absolutely sure?</h1>
          <span onClick={() => onClose()} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 m-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <p>This action cannot be undone. This will permanently delete your account.</p>
        <p className="border-t border-gray-300"></p>
        <p>
          Plase type <span className="font-semibold">{user.email}</span> to confirm.
        </p>
        <form className="flex flex-col space-y-2">
          <input
            onChange={handleChange}
            type="text"
            className="rounded border border-gray-400 py-1.5 px-3"
            autoFocus
          />
          <button
            onClick={() => reallyDelete()}
            className={`rounded bg-gray-100 border border-gray-300 py-1 px-3 text-red-600 
            ${isMatch ? "hover:bg-red-600 hover:text-white" : ""} `}
            disabled={!isMatch}
          >
            <span className={`${isMatch ? "opacity-100 cursor-pointer" : "opacity-50 cursor-default"}`}>
              Delete this account
            </span>
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};
