import React from "react";
import { LayoutDashboard, BarChart3, Settings, X } from "lucide-react";

const Sidebar = ({ view, setView, open, setOpen }) => {
  const btnClass = (id) =>
    `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      view === id
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  const Nav = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-200 justify-between">
        <div className="flex items-center">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
            <LayoutDashboard className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-lg">TaskFlow</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="md:hidden text-slate-400"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="p-4 space-y-1">
        <button
          onClick={() => {
            setView("dashboard");
            setOpen(false);
          }}
          className={btnClass("dashboard")}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button
          onClick={() => {
            setView("analytics");
            setOpen(false);
          }}
          className={btnClass("analytics")}
        >
          <BarChart3 size={18} /> Analytics
        </button>
        <button
          onClick={() => {
            setView("settings");
            setOpen(false);
          }}
          className={btnClass("settings")}
        >
          <Settings size={18} /> Settings
        </button>
      </nav>
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <Nav />
      </aside>

      {/* MOBILE SIDEBAR (Drawer) */}
      {/* We use invisible/visible + translate to animate it smoothly */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop (Fades in) */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Sidebar (Slides in) */}
        <aside
          className={`relative w-64 bg-white h-full shadow-2xl transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Nav />
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
