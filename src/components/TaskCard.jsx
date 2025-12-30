import React from "react";
import { Trash2, Calendar } from "lucide-react";
import PriorityBadge from "./ui/PriorityBadge";

const TaskCard = ({ task, onDrag, onDelete }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDrag(e, task)}
      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-move group"
    >
      <div className="flex justify-between items-start mb-2">
        <PriorityBadge priority={task.priority} />
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <h3 className="font-semibold text-slate-800 mb-1">{task.title}</h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-3">
        {task.description}
      </p>
      <div className="flex items-center text-xs text-slate-400">
        <Calendar size={12} className="mr-1" />
        {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskCard;
