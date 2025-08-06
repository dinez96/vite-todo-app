import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import ToDoItems from "./ToDoItems";

const ToDo = () => {
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef();
  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    if (editId !== null) {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text: inputText } : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
      };
      setTodoList((prev) => [...prev, newTodo]);
    }

    inputRef.current.value = "";
  };

  const editTodo = (id) => {
    const itemToEdit = todoList.find((todo) => todo.id === id);
    if (!itemToEdit) return;

    inputRef.current.value = itemToEdit.text;
    setEditId(id);
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {}, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[500px]  rounded-xl">
      <div className="flex justify-center mt-3 gap-3">
        <FontAwesomeIcon
          icon={faListUl}
          className="text-3xl text-yellow-700 p-[5px]"
        />
        <h1 className="text-center text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-12 p-6 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-yellow-500 w-24 h-14 text-lg font-medium"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      <div>
        {todoList.map((item, index) => {
          return (
            <ToDoItems
              key={index}
              task={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;
