import React from "react";
import { LayoutDashboard, BarChart3, Settings } from "lucide-react";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
          <LayoutDashboard className="text-white h-5 w-5" />
        </div>
        <span className="font-bold text-lg">TaskFlow</span>
      </div>
      <nav className="p-4 space-y-1">
        {["dashboard", "analytics", "settings"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === view
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {view === "dashboard" && <LayoutDashboard size={18} />}
            {view === "analytics" && <BarChart3 size={18} />}
            {view === "settings" && <Settings size={18} />}
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
