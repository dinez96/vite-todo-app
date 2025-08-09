import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenToSquare,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const TaskItem = ({ task, id, isComplete, deleteTask, editTask, toggle }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg px-4 py-3 mb-3 shadow-sm transition hover:shadow-md hover:scale-[1.01] gap-2">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => toggle(id)}
      >
        <FontAwesomeIcon
          icon={isComplete ? faCircleCheck : faCircle}
          className={`text-xl ${isComplete ? "text-green-500" : "text-gray-400"}`}
        />
        <p
          className={`text-sm font-medium break-words ${
            isComplete ? "text-gray-500" : "text-gray-800"
          }`}
        >
          {task}
        </p>
      </div>
      <div className="flex gap-3">
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTask(id)}
          className="text-blue-500 cursor-pointer hover:scale-110"
        />
        <FontAwesomeIcon
          icon={faDeleteLeft}
          onClick={() => deleteTask(id)}
          className="text-red-500 cursor-pointer hover:scale-110"
        />
      </div>
    </div>
  );
};

export default TaskItem;