import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import TaskItem from "./TaskItem";
import FilterBar from "./FilterBar";

const TaskNest = () => {
  const [taskList, setTaskList] = useState(() => {
    const saved = localStorage.getItem("taskList");
    return saved ? JSON.parse(saved) : [];
  });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");

  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    if (editId !== null) {
      setTaskList((prev) =>
        prev.map((task) =>
          task.id === editId ? { ...task, text: inputText } : task
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
      };
      setTaskList((prev) => [...prev, newTask]);
    }

    inputRef.current.value = "";
  };

  const editTask = (id) => {
    const itemToEdit = taskList.find((task) => task.id === id);
    if (!itemToEdit) return;

    inputRef.current.value = itemToEdit.text;
    setEditId(id);
  };

  const deleteTask = (id) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const toggle = (id) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  const filteredList = taskList.filter((task) => {
    if (filter === "Active") return !task.isComplete;
    if (filter === "Completed") return task.isComplete;
    return true;
  });

  return (
    <div className="bg-white mx-auto w-full max-w-[90%] sm:max-w-md flex flex-col px-4 py-6 rounded-2xl shadow-xl">
      <div className="flex justify-center items-center gap-3 mb-2">
        <FontAwesomeIcon icon={faListUl} className="text-3xl text-yellow-600" />
        <h1 className="text-3xl font-bold text-gray-800">To-Do App</h1>
      </div>
      <p className="text-sm text-gray-500 text-center mb-4">
        Organize. Prioritize. Achieve.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 bg-gray-200 rounded-3xl mb-4 p-3 sm:p-4">
        <input
          ref={inputRef}
          onKeyDown={(e) => e.key === "Enter" && add()}
          className="bg-white border border-gray-300 rounded-3xl outline-none h-12 px-4 placeholder:text-slate-500 text-black transition focus:ring-2 focus:ring-yellow-400 w-full"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="rounded-3xl bg-yellow-500 hover:bg-yellow-600 h-12 px-6 text-sm font-semibold text-white transition w-full sm:w-auto"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="mt-5">
        {filteredList.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <FontAwesomeIcon icon={faListUl} className="text-4xl mb-2" />
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          filteredList.map((item) => (
            <TaskItem
              key={item.id}
              task={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTask={deleteTask}
              editTask={editTask}
              toggle={toggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskNest;
