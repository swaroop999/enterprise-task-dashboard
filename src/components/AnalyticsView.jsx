import React from "react";
import { ListTodo, Circle, Clock, CheckCircle2 } from "lucide-react";

// 1. Updated Status Card with Colorful Icons
const StatusCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between transition-transform hover:scale-105 duration-200">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg ${color} shadow-sm`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

// 2. Priority Distribution Card
const PriorityCard = ({ label, count, color, barColor }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-medium text-slate-500">{label}</h3>
      <span
        className={`px-2 py-1 rounded text-xs font-bold text-white ${color}`}
      >
        {count}
      </span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-2">
      <div
        className={`h-full rounded-full ${barColor}`}
        style={{ width: "100%" }}
      ></div>
    </div>
  </div>
);

const AnalyticsView = ({ tasks }) => {
  // --- Calculation Logic ---
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  const high = tasks.filter((t) => t.priority === "high").length;
  const medium = tasks.filter((t) => t.priority === "medium").length;
  const low = tasks.filter((t) => t.priority === "low").length;

  const completionRate = total === 0 ? 0 : ((done / total) * 100).toFixed(1);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
        <p className="text-slate-500 mt-1">
          Overview of your task metrics and progress
        </p>
      </div>

      {/* 1. Overall Completion Section */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-medium text-slate-500 mb-6">
          Overall Completion Rate
        </h3>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-5xl font-bold text-slate-900">
            {completionRate}%
          </span>
          <span className="text-sm text-slate-500 font-medium">
            {done} of {total} tasks completed
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* 2. Task Status Grid with Icons */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Task Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusCard
            title="Total Tasks"
            value={total}
            icon={ListTodo}
            color="bg-blue-500"
          />
          <StatusCard
            title="Pending"
            value={pending}
            icon={Circle}
            color="bg-yellow-500"
          />
          <StatusCard
            title="In Progress"
            value={inProgress}
            icon={Clock}
            color="bg-orange-500"
          />
          <StatusCard
            title="Completed"
            value={done}
            icon={CheckCircle2}
            color="bg-green-500"
          />
        </div>
      </div>

      {/* 3. Priority Distribution Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Priority Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PriorityCard
            label="High Priority"
            count={high}
            color="bg-red-500"
            barColor="bg-red-500"
          />
          <PriorityCard
            label="Medium Priority"
            count={medium}
            color="bg-blue-600"
            barColor="bg-blue-600"
          />
          <PriorityCard
            label="Low Priority"
            count={low}
            color="bg-slate-400"
            barColor="bg-slate-400"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
