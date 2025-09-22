import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const BackupManagement = () => {
  const { admin } = useAuth();
  const [backups, setBackups] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchBackups();
    fetchStats();
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchBackups();
        fetchStats();
      }, 30000); // Refresh every 30 seconds
      setRefreshInterval(interval);
    } else {
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [autoRefresh]);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 5000);
  };

  const fetchBackups = async () => {
    try {
      console.log("Fetching backups...");
      const response = await axios.get("/api/backup/list");
      console.log("Backup response:", response.data);
      setBackups(response.data.backups);
    } catch (error) {
      console.error("Error fetching backups:", error);
      console.error("Error details:", error.response?.data);
      showNotification(
        "Failed to fetch backups. Please check authentication.",
        "error"
      );
    }
  };

  const fetchStats = async () => {
    try {
      console.log("Fetching backup stats...");
      const response = await axios.get("/api/backup/stats");
      console.log("Stats response:", response.data);
      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching backup stats:", error);
      console.error("Error details:", error.response?.data);
      showNotification(
        "Failed to fetch backup stats. Please check authentication.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFullBackup = async () => {
    setActionLoading(true);
    try {
      console.log("Creating full backup...");
      const response = await axios.post(
        "/api/backup/create-full",
        {},
        {
          timeout: 300000, // 5 minutes timeout
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backup response:", response.data);
      showNotification(
        `Full backup created successfully! Backup: ${response.data.backupName}`
      );
      fetchBackups();
      fetchStats();
    } catch (error) {
      console.error("Error creating full backup:", error);
      if (error.code === "ECONNABORTED") {
        showNotification(
          "Backup request timed out. Please check if backup was created successfully.",
          "warning"
        );
      } else if (error.response?.status === 500) {
        showNotification(
          `Backup failed: ${
            error.response.data.error || error.response.data.message
          }`,
          "error"
        );
      } else {
        showNotification(
          "Failed to create full backup. Please try again.",
          "error"
        );
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateIncrementalBackup = async () => {
    setActionLoading(true);
    try {
      await axios.post("/api/backup/create-incremental");
      alert("Incremental backup created successfully!");
      fetchBackups();
      fetchStats();
    } catch (error) {
      console.error("Error creating incremental backup:", error);
      alert("Failed to create incremental backup. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadBackup = async (backupName) => {
    try {
      const response = await axios.get(`/api/backup/download/${backupName}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${backupName}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading backup:", error);
      alert("Failed to download backup. Please try again.");
    }
  };

  const handleDeleteBackup = async (backupName) => {
    if (
      !window.confirm(`Are you sure you want to delete backup "${backupName}"?`)
    ) {
      return;
    }

    try {
      await axios.delete(`/api/backup/delete/${backupName}`);
      alert("Backup deleted successfully!");
      fetchBackups();
      fetchStats();
    } catch (error) {
      console.error("Error deleting backup:", error);
      alert("Failed to delete backup. Please try again.");
    }
  };

  const handleRestoreBackup = async () => {
    if (!selectedBackup) return;

    setActionLoading(true);
    try {
      await axios.post(`/api/backup/restore/${selectedBackup.name}`);
      alert("Backup restored successfully!");
      setShowRestoreModal(false);
      setSelectedBackup(null);
    } catch (error) {
      console.error("Error restoring backup:", error);
      alert("Failed to restore backup. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = async () => {
    setExportLoading(true);
    try {
      const response = await axios.get("/api/export/applications/csv", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "applications-export.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export CSV. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setExportLoading(true);
    try {
      const response = await axios.get("/api/export/applications/excel", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "applications-export.json");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      alert("Failed to export Excel. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportPackage = async () => {
    setExportLoading(true);
    try {
      const response = await axios.get("/api/export/package", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sam-export-package.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting package:", error);
      alert("Failed to export package. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
        <AdminHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
      <AdminHeader />

      {/* Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-500"
                : notification.type === "warning"
                ? "bg-yellow-500"
                : "bg-red-500"
            } text-white`}
          >
            <div className="flex items-center">
              <span className="mr-2">
                {notification.type === "success"
                  ? "✅"
                  : notification.type === "warning"
                  ? "⚠️"
                  : "❌"}
              </span>
              <span>{notification.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Backup Management
              </h1>
              <p className="text-[#F5F7FA]">
                Manage system backups and data recovery
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  fetchBackups();
                  fetchStats();
                }}
                className="px-4 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#158A9A] transition-colors"
              >
                🔄 Refresh
              </button>
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 text-[#1B9AAA] bg-gray-100 border-gray-300 rounded focus:ring-[#1B9AAA] focus:ring-2"
                />
                <span className="text-sm">Auto-refresh (30s)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#1B9AAA]/20">
              <h3 className="text-lg font-medium text-[#0D1B2A] mb-2">
                Total Backups
              </h3>
              <p className="text-3xl font-bold text-[#1B9AAA]">
                {stats.totalBackups}
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#22c55e]/20">
              <h3 className="text-lg font-medium text-[#0D1B2A] mb-2">
                Total Size
              </h3>
              <p className="text-3xl font-bold text-[#22c55e]">
                {formatFileSize(stats.totalSize)}
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#FFC300]/20">
              <h3 className="text-lg font-medium text-[#0D1B2A] mb-2">
                Last Backup
              </h3>
              <p className="text-sm font-bold text-[#FFC300]">
                {stats.lastBackup ? formatDate(stats.lastBackup) : "Never"}
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#E63946]/20">
              <h3 className="text-lg font-medium text-[#0D1B2A] mb-2">
                Full Backups
              </h3>
              <p className="text-3xl font-bold text-[#E63946]">
                {stats.fullBackups}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Backup Actions */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#1B9AAA]/20">
            <h3 className="text-lg font-medium text-[#0D1B2A] mb-4">
              Backup Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreateFullBackup}
                disabled={actionLoading}
                className="bg-[#1B9AAA] hover:bg-[#158A9A] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {actionLoading ? "Creating..." : "Create Full Backup"}
              </button>
              <button
                onClick={handleCreateIncrementalBackup}
                disabled={actionLoading}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {actionLoading ? "Creating..." : "Create Incremental Backup"}
              </button>
              <button
                onClick={() => {
                  fetchBackups();
                  fetchStats();
                }}
                className="bg-[#FFC300] hover:bg-[#E6AC00] text-[#0D1B2A] font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Export Actions */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#22c55e]/20">
            <h3 className="text-lg font-medium text-[#0D1B2A] mb-4">
              Export Data
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleExportCSV}
                disabled={exportLoading}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {exportLoading ? "Exporting..." : "Export CSV"}
              </button>
              <button
                onClick={handleExportExcel}
                disabled={exportLoading}
                className="bg-[#1B9AAA] hover:bg-[#158A9A] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {exportLoading ? "Exporting..." : "Export Excel"}
              </button>
              <button
                onClick={handleExportPackage}
                disabled={exportLoading}
                className="bg-[#FFC300] hover:bg-[#E6AC00] text-[#0D1B2A] font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {exportLoading ? "Exporting..." : "Export Package"}
              </button>
            </div>
          </div>
        </div>

        {/* Backups List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#1B9AAA]/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1B9AAA]/20">
            <h3 className="text-lg font-medium text-[#0D1B2A]">
              Available Backups
            </h3>
          </div>

          {backups.length === 0 ? (
            <div className="p-8 text-center text-[#0D1B2A]">
              No backups available. Create your first backup to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#1B9AAA]/20">
                <thead className="bg-[#F5F7FA]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Records
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-[#1B9AAA]/20">
                  {backups.map((backup, index) => (
                    <tr key={index} className="hover:bg-[#F5F7FA]/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0D1B2A]">
                        {backup.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1B2A]">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            backup.type === "full"
                              ? "bg-[#1B9AAA] text-white"
                              : "bg-[#22c55e] text-white"
                          }`}
                        >
                          {backup.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1B2A]">
                        {formatFileSize(backup.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1B2A]">
                        {formatDate(backup.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1B2A]">
                        {backup.records.applications + backup.records.admins}{" "}
                        total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDownloadBackup(backup.name)}
                            className="text-[#1B9AAA] hover:text-[#158A9A]"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => {
                              setSelectedBackup(backup);
                              setShowRestoreModal(true);
                            }}
                            className="text-[#22c55e] hover:text-[#16a34a]"
                          >
                            Restore
                          </button>
                          <button
                            onClick={() => handleDeleteBackup(backup.name)}
                            className="text-[#E63946] hover:text-[#DC2626]"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Restore Confirmation Modal */}
        {showRestoreModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Restore Backup
                </h3>
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to restore from backup{" "}
                  <strong>"{selectedBackup?.name}"</strong>?
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Warning:</strong> This action will replace all
                    current data with the backup data. This cannot be undone.
                    Make sure to create a current backup before proceeding.
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowRestoreModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRestoreBackup}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-[#E63946] text-white rounded-lg hover:bg-[#DC2626] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading ? "Restoring..." : "Restore Backup"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackupManagement;
