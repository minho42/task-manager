import { useState } from "react";

const TaskItem = ({ task, handleClick, handleToggle, handleDelete, index }) => {
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    handleDelete(task._id);
  };

  return (
    <div className="border-b border-gray-300 hover:bg-gray-50 px-3 py-1.5">
      <div onClick={() => handleClick(task._id)} className="flex items-center space-x-2 cursor-pointer">
        <input
          onChange={() => handleToggle(task._id)}
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          className="w-5 h-5"
          checked={task.completed}
        />
        <span className={`${task.completed ? "line-through text-gray-400" : ""}`}>{task.description}</span>
      </div>
    </div>
  );
};

export default TaskItem;
