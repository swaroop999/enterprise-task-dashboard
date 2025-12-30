import React from "react";
import { Download, Trash2 } from "lucide-react";

const SettingsView = ({ tasks, setTasks }) => {
  // NOTE: Copied from SO, handles JSON download
  const downloadData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(tasks));
    const node = document.createElement("a");
    node.setAttribute("href", dataStr);
    node.setAttribute("download", "tasks_backup.json");
    document.body.appendChild(node);
    node.click();
    node.remove();
  };

  const wipeData = () => {
    if (window.confirm("Delete everything? This cannot be undone.")) {
      setTasks([]);
      localStorage.removeItem("enterprise-tasks");
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">
            Data Management
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <button
            onClick={downloadData}
            className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100">
                <Download size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-900">Export JSON</p>
                <p className="text-xs text-slate-500">
                  Download a local backup
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={wipeData}
            className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100">
                <Trash2 size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-red-700">Clear All Data</p>
                <p className="text-xs text-red-400">
                  Permanently delete local storage
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 mb-2">About TaskFlow</h3>
        <p className="text-sm text-slate-500 leading-relaxed">v1.0.0</p>
      </div>
    </div>
  );
};

export default SettingsView;
