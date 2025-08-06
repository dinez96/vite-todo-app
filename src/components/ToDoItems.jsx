import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";


const ToDoItems = ({ task, id, isComplete, deleteTodo, editTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
       <div
        className="flex flex-1 items-center cursor-pointer"
        onClick={() => toggle(id)}  
      >
        <FontAwesomeIcon
          icon={isComplete ? faCircleCheck : faCircle}
          className={`text-xl ${isComplete ? "text-green-500" : "text-gray-400"}`}
        />
        <p
          className={`ml-4 text-[15px] ${
            isComplete ? " text-gray-700" : "text-slate-500"
          }`}
        >
          {task}
        </p>
      </div>
      <div className="flex gap-2">
        <FontAwesomeIcon
          onClick={() => editTodo(id)}
          icon={faPenToSquare}
          className="text-blue-500 text-xl"
        />
        <FontAwesomeIcon
          onClick={() => {
            deleteTodo(id);
          }}
          icon={faDeleteLeft}
          className="text-red-400 text-xl"
        />
      </div>
    </div>
  );
};

export default ToDoItems;
