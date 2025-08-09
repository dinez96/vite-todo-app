import React from "react";

const FilterBar = ({ filter, setFilter }) => {
  const filters = ["All", "Active", "Completed"];

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4 px-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded-full text-sm font-medium transition ${
            filter === f
              ? "bg-yellow-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-yellow-400"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;