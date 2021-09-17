import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export const DetailModal = ({ task, children, isOpen, onClose, handleToggle }) => {
  const [newDescription, setNewDescription] = useState(task.description);

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

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0">
      <div
        id="overlay"
        className="min-h-screen min-w-screen bg-black opacity-40"
        onClick={() => onClose()}
      ></div>
      <div className="fixed w-96 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-2 bg-white rounded-lg shadow-2xl p-4">
        <div className="flex items-center justify-end">
          <span onClick={() => onClose()} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-2"
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
        <div className="flex flex-col space-y-2">
          <div className="flex w-full space-x-2 items-center">
            <input
              onChange={(e) => {
                // e.stopPropagation();
                setNewCompleted(!newCompleted);
                handleToggle(task._id);
              }}
              type="checkbox"
              className="w-5 h-5"
              checked={newCompleted}
            />
            <textarea
              rows="2"
              className="border border-gray-400 rounded p-2 resize-none w-full"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <flex className="space-x-2 justify-center">
              <button className="rounded px-2 py-1 border border-gray-300 bg-red-600 text-white">Save</button>
              <button
                onClick={() => onClose()}
                className="rounded px-2 py-1 border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
            </flex>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};
