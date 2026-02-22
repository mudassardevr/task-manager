import React, { useEffect, useState } from "react";
import plusSvg from "../../src/assets/icons/plus.svg";
import crossSvg from "../../src/assets/icons/cross.svg";
import {
  fetchTasksAPI,
  addTaskAPI,
  deleteTaskAPI,
  toggleTaskAPI,
} from "../services/taskService";

function Home() {
  const [tasks, setTasks] = useState([]); // this is for tasks
  const [input, setInput] = useState(""); // this is for check box
  const [loading, setLoading] = useState(true); // this is for loading spinner
  const [adding, setAdding] = useState(false); // adding button loading

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasksAPI();

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.log("Invalid response", data);
        setTasks([]); // prevent crash
      }
    } catch (error) {
      console.log("Fetch Error:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // adding tasks
  const addTasks = async () => {
    try {
      setAdding(true);

      if (!input.trim()) return;

      const newTasks = await addTaskAPI(input);
      setTasks([...tasks, newTasks]);
      setInput("");
    } finally {
      setAdding(false);
    }
  };

  // delete Tasks
  const deleteTask = async (id) => {
    await deleteTaskAPI(id);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // remaining tasks
  const remaining = tasks.filter((t) => !t.completed).length;

  // Total tasks
  const totalTasks = tasks.length;

  // completed tasks
  const completedTasks = tasks.filter((t) => t.completed).length;

  /// toggle Tasks
  const toggleTask = async (task) => {
    const updated = await toggleTaskAPI(task);

    setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <main className="max-w-xl mx-auto bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mt-5 pb-10">
        <section>
          {/* title */}
          <h1 className="text-xl font-bold mb-4 text-gray-600">Your Task</h1>

          {/* input in row */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="add new Tasks"
              className="flex-1 px-2 py-1 outline-none border-b text-gray-400 focus:border-gray-950 "
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            <button
              className="mx-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-md text-xl items-center h-8 w-8 active:bg-indigo-400 hover:bg-indigo-400 disabled:cursor-not-allowed"
              disabled={!input.trim()}
              onClick={addTasks}
            >
              {adding ? (
                <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <img src={plusSvg} alt="4" />
              )}
            </button>
          </div>

          {/* Task List */}
          <div className="mb-5">
            {/* // this is loading v */}
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : tasks.length === 0 ? (
              /* EMPTY STATE */
              <div className="text-center py-10 text-slate-400">
                <p className="text-lg font-semibold">Empty Tasks </p>
                <p className="text-sm">Start by adding a new task </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {tasks.map((task, index) => (
                  <li
                    key={task._id}
                    className="border-2 border-gray-400 flex justify-between rounded-xl py-3 px-3
                    transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task)}
                        className="w-4 h-4"
                      />

                      <span
                        className={`font-semibold text-gray-500 transition-all duration-200 ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <button
                      className="h-8 w-8"
                      onClick={() => deleteTask(task._id)}
                    >
                      <img src={crossSvg} alt="5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {/*loading*/}
          </div>

          <div>
            <p className="italic font-semibold text-gray-600 mb-2">
              Total : {totalTasks}
            </p>
            <p className="italic font-semibold text-gray-600 mb-2">
              completed : {completedTasks}
            </p>
            <p className="italic font-semibold text-gray-600 mb-2">
              Your remaining Task : {remaining}
            </p>
            <p className="italic font-semibold text-gray-400 text-sm">
              Doing what you love that cornerstone is having abundance in your
              life
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
