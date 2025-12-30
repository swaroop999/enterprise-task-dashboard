import React from "react";
import { Download, Trash2, Save } from "lucide-react";

const SettingsView = ({ tasks, setTasks }) => {
  // Feature: Download all tasks as a JSON file
  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tasks-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Feature: Wipe all data
  const handleClearData = () => {
    if (
      window.confirm("Are you sure? This will delete all tasks permanently.")
    ) {
      setTasks([]);
      localStorage.removeItem("enterprise-tasks");
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500">Manage your task data and preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">
            Data Management
          </h3>
          <p className="text-sm text-slate-500">
            Export your tasks or reset the application.
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100">
                <Download size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-900">Export Data</p>
                <p className="text-xs text-slate-500">
                  Download a JSON backup of your tasks
                </p>
              </div>
            </div>
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClearData}
            className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100">
                <Trash2 size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-red-700">Clear All Data</p>
                <p className="text-xs text-red-400">
                  Permanently remove all tasks
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-2">About TaskFlow</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Version 1.0.0 <br />A modern task management solution built with React
          and Tailwind CSS. Designed for enterprise productivity with local
          persistence and real-time analytics.
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
