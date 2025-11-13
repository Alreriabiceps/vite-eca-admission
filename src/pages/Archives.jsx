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
  const [filters, setFilters] = useState({
    search: "",
    course: "all",
    status: "all",
    dateFrom: "",
    dateTo: "",
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
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (filters.search) params.set("search", filters.search);
      if (filters.course !== "all") params.set("course", filters.course);
      if (filters.status !== "all") params.set("status", filters.status);
      if (filters.dateFrom) params.set("from", filters.dateFrom);
      if (filters.dateTo) params.set("to", filters.dateTo);

      const response = await axios.get(`/api/applications/archived?${params}`);
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
    fetchArchivedApplications(1);
  }, [filters]);

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

          {/* Filters */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-2 text-sm">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
                placeholder="Name or email"
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Course
              </label>
              <select
                value={filters.course}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, course: e.target.value.trim() }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Courses</option>
                <option>Bachelor of Science in Marine Transportation</option>
                <option>Bachelor of Science in Marine Engineering</option>
                <option>Bachelor of Science in Nursing</option>
                <option>Bachelor of Early Childhood Education</option>
                <option>
                  Bachelor of Technical-Vocational Teacher Education (Major in
                  Food and Service Management)
                </option>
                <option>Bachelor of Science in Entrepreneurship</option>
                <option>Bachelor of Science in Management Accounting</option>
                <option>Bachelor of Science in Information System</option>
                <option>Bachelor of Science in Tourism Management</option>
                <option>Bachelor of Science in Criminology</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="incomplete">Incomplete</option>
                <option value="admitted">Admitted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                From
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dateFrom: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 mb-1">
                To
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, dateTo: e.target.value }))
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() =>
                    setFilters({
                      search: "",
                      course: "all",
                      status: "all",
                      dateFrom: "",
                      dateTo: "",
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
                  title="Reset filters"
                >
                  Reset
                </button>
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
