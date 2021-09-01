const TaskItem = ({ task, handleClick, index }) => {
  const toggleCompleted = () => {
    handleClick(task._id);
  };

  return (
    <div className="rounded-lg border-2 border-gray-500 hover:bg-purple-100 px-3 py-2 divide-y space-y-2">
      <div
        onClick={toggleCompleted}
        className={`relative cursor-pointer pl-4 ${
          task.completed ? "line-through text-gray-500 font-normal" : "font-semibold"
        }`}
      >
        {task.description}
        <span className="absolute bottom-1 right-2 text-xs font-normal text-gray-500 pl-4">
          {task.ownerName}
        </span>
        <div className="absolute -top-4 -right-8 flex items-center justify-center  rounded w-8 h-6 border border-gray-400 bg-white text-sm font-semibold">
          {index}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
