import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { user, setUser } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const history = useHistory();

  const fetchData = async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    const res = await fetch("http://localhost:4000/tasks", {
      credentials: "include",
    });
    const data = await res.json();
    setTasks(data);
  };

  const toggleCompleted = (id) => {
    if (!tasks || tasks.length === 0) return;

    const toggled = tasks.map((task) => {
      if (task._id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(toggled);
  };

  const completedCount = () => {
    let count = 0;
    if (!tasks || tasks.length === 0) return count;
    tasks.forEach((task) => {
      if (task.completed) {
        count++;
      }
    });
    return count;
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const requestNewTask = async (newTask) => {
    try {
      const res = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ description: newTask }),
      });
      if (!res.ok) {
        console.log(res.statusText);
        throw new Error("requestNewTask error");
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleNewTask = async (e) => {
    e.preventDefault();
    const added = await requestNewTask(newTask);
    if (added) {
      setTasks(...tasks, newTask);
      setNewTask("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2 mx-10 mt-3">
      <form className="space-y-4">
        <div>
          <label htmlFor="task" className="font-medium text-gray-600 text-sm">
            New task
          </label>
          <div className="flex">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value.trim())}
              type="task"
              id="task"
              placeholder="Add new task"
              className="rounded-md w-full py-1.5 px-3 border border-gray-300"
              autoFocus
            />
            <button
              onClick={handleNewTask}
              className="bg-green-500 hover:bg-green-600 text-white rounded p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <h1 className="text-center text-xl font-semibold">
        {/* tasks: {tasks && completedCount()}/{tasks && tasks.length} */}
        Tasks: {tasks && tasks.length}
      </h1>

      {tasks.length > 0 &&
        tasks.map((task, i) => {
          return <TaskItem key={task._id} index={i + 1} task={task} handleClick={toggleCompleted} />;
        })}
    </div>
  );
};

export default TaskList;
