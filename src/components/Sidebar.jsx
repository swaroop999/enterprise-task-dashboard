import React from "react";
import { LayoutDashboard, BarChart3, Settings, X } from "lucide-react";

const Sidebar = ({ activeView, setActiveView, isOpen, onClose }) => {
  // Base classes for navigation buttons
  const getButtonClass = (view) =>
    `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      activeView === view
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  const NavContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-200 justify-between">
        <div className="flex items-center">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
            <LayoutDashboard className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-lg">TaskFlow</span>
        </div>
        {/* Close Button for Mobile */}
        <button onClick={onClose} className="md:hidden text-slate-400">
          <X size={20} />
        </button>
      </div>

      <nav className="p-4 space-y-1">
        <button
          onClick={() => {
            setActiveView("dashboard");
            onClose();
          }}
          className={getButtonClass("dashboard")}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button
          onClick={() => {
            setActiveView("analytics");
            onClose();
          }}
          className={getButtonClass("analytics")}
        >
          <BarChart3 size={18} /> Analytics
        </button>
        <button
          onClick={() => {
            setActiveView("settings");
            onClose();
          }}
          className={getButtonClass("settings")}
        >
          <Settings size={18} /> Settings
        </button>
      </nav>
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR (Visible on md+) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <NavContent />
      </aside>

      {/* MOBILE SIDEBAR (Overlay + Drawer) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          ></div>

          {/* Drawer */}
          <aside className="relative w-64 bg-white h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <NavContent />
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
