import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  BarChart3,
  Settings,
  LayoutDashboard,
  // New Icons imported here
  TrendingUp,
  Circle,
  Clock,
  CheckCircle2,
} from "lucide-react";

// Components
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import CreateTaskModal from "./components/CreateTaskModal";
import AnalyticsView from "./components/AnalyticsView";
import SettingsView from "./components/SettingsView";
import { defaultTasks } from "./data/mockData";

const STORAGE_KEY = "enterprise-tasks";

// --- Configuration for Kanban Columns (New) ---
const columnConfig = {
  pending: {
    title: "To Do",
    icon: Circle,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  "in-progress": {
    title: "In Progress",
    icon: Clock,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  done: {
    title: "Done",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
};

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [tasks, setTasks] = useState(defaultTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleCreateTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([task, ...tasks]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const onDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const onDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== status) {
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, status } : t
      );
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> New Task
          </button>
        </header>

        {/* Views */}
        <div className="flex-1 overflow-auto p-6">
          {activeView === "dashboard" && (
            <>
              {/* Analytics Widget (Updated with Graph Icon) */}
              <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-md">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-slate-500 font-medium">
                      Overall Progress
                    </h2>
                  </div>
                  <span className="text-2xl font-bold text-slate-800">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>

              {/* Kanban Board (Updated with Header Icons) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {/* We now map over the config object entries instead of just strings */}
                {Object.entries(columnConfig).map(([status, config]) => (
                  <div
                    key={status}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(e, status)}
                    className="flex flex-col h-full rounded-xl bg-slate-100/50 border border-slate-200/60 p-4"
                  >
                    {/* Header with Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${config.bgColor}`}>
                          <config.icon
                            className={`h-4 w-4 ${config.iconColor}`}
                          />
                        </div>
                        <h3 className="font-semibold text-slate-700">
                          {config.title}
                        </h3>
                      </div>
                      <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">
                        {
                          filteredTasks.filter((t) => t.status === status)
                            .length
                        }
                      </span>
                    </div>

                    {/* Tasks list */}
                    <div className="space-y-3 overflow-y-auto">
                      {filteredTasks
                        .filter((t) => t.status === status)
                        .map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onDragStart={onDragStart}
                            onDelete={handleDeleteTask}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeView === "analytics" && <AnalyticsView tasks={tasks} />}

          {activeView === "settings" && (
            <SettingsView tasks={tasks} setTasks={setTasks} />
          )}
        </div>
      </main>

      <CreateTaskModal
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}
