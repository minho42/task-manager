import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";
import TaskItem from "./TaskItem";
import { DetailModal } from "./DetailModal";

const TaskList = () => {
  const { user, setUser } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNeedingRefetch, setIsNeedingRefetch] = useState(false);
  const newTaskInputRef = useRef();
  const history = useHistory();

  const fetchData = async () => {
    // console.log("fetchData called");
    if (!user) {
      setTasks([]);
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/tasks", {
        credentials: "include",
      });
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const requestDelete = async (id) => {
    console.log("delete: ", id);
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = (id) => {
    const deleted = requestDelete(id);
    setIsNeedingRefetch(!isNeedingRefetch);
  };

  const showDetail = async (id) => {
    if (!tasks || tasks.length === 0) return;

    const task = await tasks.find((task) => task._id === id);
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
    setIsDetailModalOpen(false);
  };

  const updateDescription = async (id, newDescription) => {
    if (!tasks || tasks.length === 0) return;

    const task = await tasks.find((task) => task._id === id);
    if (task.description === newDescription.trim()) {
      return;
    }
    task.description = newDescription;
    const updated = await requestUpdateTask(task);
    setIsNeedingRefetch(!isNeedingRefetch);
  };

  const toggleCompleted = async (id) => {
    if (!tasks || tasks.length === 0) return;

    const task = await tasks.find((task) => task._id === id);
    task.completed = !task.completed;
    const updated = await requestUpdateTask(task);
    setIsNeedingRefetch(!isNeedingRefetch);
    // console.log(updated);
    // const toggled = tasks.map((task) => {
    //   if (task._id === id) {
    //     task.completed = !task.completed;
    //   }
    //   return task;
    // });

    // setTasks(toggled);
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

  const slashToFocus = (e) => {
    if (e.keyCode === 65 || e.keyCode === 191) {
      newTaskInputRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", slashToFocus);

    return () => {
      document.removeEventListener("keyup", slashToFocus);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [user, isNeedingRefetch]);

  const requestUpdateTask = async (task) => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ description: task.description, completed: task.completed }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

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
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleNewTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      return null;
    }
    const added = await requestNewTask(newTask.trim());
    if (added) {
      setTasks([...tasks, added]);
      setNewTask("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2 px-10 mt-3 mb-6">
      <form className="space-y-4">
        <div>
          <label htmlFor="task" className="font-medium text-gray-600 text-sm">
            Add task
          </label>
          <div className="flex">
            <input
              ref={newTaskInputRef}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              type="task"
              id="task"
              placeholder="New task"
              className="input w-full"
              autoFocus
            />
            <button onClick={handleNewTask} className="text-blue-600 p-1">
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
        tasks: {tasks && completedCount()}/{tasks && tasks.length}
        {/* Tasks: {tasks && tasks.length} */}
      </h1>

      <div className="flex flex-col max-w-md w-full px-4">
        {tasks.length > 0 &&
          tasks.map((task, i) => {
            return (
              <TaskItem
                key={task._id}
                index={i + 1}
                task={task}
                handleClick={showDetail}
                handleToggle={toggleCompleted}
              />
            );
          })}
      </div>

      {selectedTask && isDetailModalOpen && (
        <DetailModal
          task={selectedTask}
          isOpen={isDetailModalOpen}
          onClose={handleModalClose}
          handleSave={updateDescription}
          handleDelete={deleteTask}
        />
      )}
    </div>
  );
};

export default TaskList;
