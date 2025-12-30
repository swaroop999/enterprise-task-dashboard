import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  TrendingUp,
  Circle,
  Clock,
  CheckCircle2,
  Menu,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import CreateTaskModal from "./components/CreateTaskModal";
import AnalyticsView from "./components/AnalyticsView";
import SettingsView from "./components/SettingsView";
import { defaultTasks } from "./data/mockData";

const KEY = "enterprise-tasks";

const COLS = {
  pending: {
    title: "To Do",
    icon: Circle,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  "in-progress": {
    title: "In Progress",
    icon: Clock,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  done: {
    title: "Done",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-100",
  },
};

export default function App() {
  const [view, setView] = useState("dashboard");
  const [tasks, setTasks] = useState(defaultTasks);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(KEY);
    if (data) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const doneCount = tasks.filter((t) => t.status === "done").length;
  const progress =
    tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

  const addTask = (task) => {
    // console.log("New task:", task);
    setTasks([
      {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      },
      ...tasks,
    ]);
  };

  const delTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const onDrag = (e, task) => {
    e.dataTransfer.setData("id", task.id);
  };

  const onDrop = (e, status) => {
    const id = e.dataTransfer.getData("id");
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar
        view={view}
        setView={setView}
        open={mobileMenu}
        setOpen={setMobileMenu}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>

            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="ml-2 md:ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={16} />
            <span className="hidden md:inline">New Task</span>
            <span className="md:hidden">New</span>
          </button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6">
          {view === "dashboard" && (
            <>
              <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-md">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-slate-500 font-medium">Progress</h2>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-full pb-10">
                {Object.entries(COLS).map(([status, conf]) => (
                  <div
                    key={status}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(e, status)}
                    className="flex flex-col h-auto md:h-full rounded-xl bg-slate-100/50 border border-slate-200/60 p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${conf.bg}`}>
                          <conf.icon className={`h-4 w-4 ${conf.color}`} />
                        </div>
                        <h3 className="font-semibold text-slate-700">
                          {conf.title}
                        </h3>
                      </div>
                      <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">
                        {filtered.filter((t) => t.status === status).length}
                      </span>
                    </div>

                    <div className="space-y-3 overflow-y-auto">
                      {filtered
                        .filter((t) => t.status === status)
                        .map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onDrag={onDrag}
                            onDelete={delTask}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === "analytics" && <AnalyticsView tasks={tasks} />}
          {view === "settings" && (
            <SettingsView tasks={tasks} setTasks={setTasks} />
          )}
        </div>
      </main>

      <CreateTaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={addTask}
      />
    </div>
  );
}
