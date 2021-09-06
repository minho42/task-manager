import { useState } from "react";

const TaskItem = ({ task, handleClick, handleDelete, index }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    handleDelete(task._id);
  };

  return (
    <div
      onMouseOver={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
      className="border-b border-gray-300 hover:bg-gray-50 px-3 py-1.5"
    >
      <div
        onClick={() => handleClick(task._id)}
        className="flex items-center relative space-x-2 cursor-pointer pl-4"
      >
        <input
          type="radio"
          className="w-4 h-4"
          // checked={!task.completed}
        />
        <span className={`${task.completed ? "line-through text-gray-400" : ""}`}>{task.description}</span>
        {/* <span className="absolute bottom-1 right-2 text-xs text-gray-500 pl-4">{task.ownerName}</span> */}
        {/* <div className="absolute -top-4 -right-8 flex items-center justify-center  rounded w-8 h-6 border border-gray-400 bg-white text-sm font-semibold">
          {index}
        </div> */}
        {showDeleteButton && (
          <span onClick={handleDeleteClick} className="absolute right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600 rounded-full p-1 hover:bg-red-100"
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
        )}
      </div>
    </div>
  );
};

export default TaskItem;
