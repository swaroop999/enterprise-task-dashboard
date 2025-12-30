import React from "react";

const STYLES = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-blue-100 text-blue-700 border-blue-200",
};

const PriorityBadge = ({ priority }) => {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded border ${
        STYLES[priority] || STYLES.low
      }`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

export default PriorityBadge;
