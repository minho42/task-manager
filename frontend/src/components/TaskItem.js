const TaskItem = ({ task, handleClick, index }) => {
  const toggleCompleted = () => {
    handleClick(task._id);
  };

  return (
    <div className="border-b border-gray-300 hover:bg-blue-50 px-3 py-1.5">
      <div onClick={toggleCompleted} className="flex items-center relative space-x-2 cursor-pointer pl-4">
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
      </div>
    </div>
  );
};

export default TaskItem;
