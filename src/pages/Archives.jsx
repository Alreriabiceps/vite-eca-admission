import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const Archives = () => {
  const { admin } = useAuth();
  const [archivedApplications, setArchivedApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    verified: "bg-blue-100 text-blue-800",
    incomplete: "bg-orange-100 text-orange-800",
    admitted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const fetchArchivedApplications = async (page = 1) => {
    try {
      setLoading(true);
      console.log("Fetching archived applications...");
      const response = await axios.get(
        `/api/applications/archived?page=${page}&limit=10`
      );
      console.log("Archived applications response:", response.data);
      setArchivedApplications(response.data.applications);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching archived applications:", error);
      alert("Failed to fetch archived applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedApplications();
  }, []);

  const handleUnarchiveApplication = async (application) => {
    if (
      window.confirm(
        `Are you sure you want to unarchive ${application.name}'s application?`
      )
    ) {
      try {
        await axios.patch(`/api/applications/${application._id}/unarchive`);
        fetchArchivedApplications(pagination.current);
        alert("Application unarchived successfully!");
      } catch (error) {
        console.error("Error unarchiving application:", error);
        alert("Failed to unarchive application. Please try again.");
      }
    }
  };

  const handleDeleteApplication = async (application) => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete ${application.name}'s application? This action cannot be undone.`
      )
    ) {
      try {
        await axios.delete(`/api/applications/${application._id}`);
        fetchArchivedApplications(pagination.current);
        alert("Application deleted successfully!");
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Failed to delete application. Please try again.");
      }
    }
  };

  const handlePageChange = (page) => {
    fetchArchivedApplications(page);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#1B9AAA]/20 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0D1B2A]">
                Archived Applications
              </h1>
              <p className="text-gray-600 mt-1">
                View and manage archived applications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Total: {pagination.total} archived applications
              </div>
            </div>
          </div>
        </div>

        {/* Archived Applications Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#1B9AAA]/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1B9AAA]/20">
            <h3 className="text-lg font-medium text-[#0D1B2A]">
              Archived Applications
            </h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B9AAA] mx-auto"></div>
              <p className="mt-2 text-[#0D1B2A]">
                Loading archived applications...
              </p>
            </div>
          ) : archivedApplications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500 text-lg mb-4">
                No archived applications found
              </div>
              <div className="text-gray-400 text-sm">
                Applications that are archived from the main dashboard will
                appear here.
                <br />
                To archive an application, go to the main dashboard and click
                the archive button.
              </div>
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
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Archived
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-[#1B9AAA]/20">
                  {archivedApplications.map((application) => (
                    <tr key={application._id} className="hover:bg-[#F5F7FA]/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={application.photoUrl}
                              alt={application.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.contact}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.courseApplied}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            statusColors[application.status]
                          }`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(application.archivedAt)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1">
                          <button
                            onClick={() =>
                              handleUnarchiveApplication(application)
                            }
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="Unarchive Application"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteApplication(application)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Delete Application"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {(pagination.current - 1) * 10 + 1} to{" "}
                {Math.min(pagination.current * 10, pagination.total)} of{" "}
                {pagination.total} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.current - 1)}
                  disabled={pagination.current === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.current + 1)}
                  disabled={pagination.current === pagination.pages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archives;
