import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    course: "",
    search: "",
  });
  const [selectedCourseTab, setSelectedCourseTab] = useState("all");
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });
  const [stats, setStats] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showMissingRequirementsModal, setShowMissingRequirementsModal] =
    useState(false);
  const [showCustomNotificationModal, setShowCustomNotificationModal] =
    useState(false);
  const [missingRequirements, setMissingRequirements] = useState([]);
  const [customMessage, setCustomMessage] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [customNotificationMessage, setCustomNotificationMessage] =
    useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [courseTabCounts, setCourseTabCounts] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    contact: "",
    courseApplied: "",
    status: "",
  });

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "incomplete", label: "Incomplete" },
    { value: "admitted", label: "Admitted" },
    { value: "rejected", label: "Rejected" },
  ];

  const courseTabs = [
    {
      id: "all",
      name: "All Courses",
      logo: "/logo na pogi.png",
      courses: [],
    },
    {
      id: "maritime",
      name: "Maritime Education",
      logo: "/logo/maritime.png",
      courses: [
        "Bachelor of Science in Marine Transportation",
        "Bachelor of Science in Marine Engineering",
      ],
    },
    {
      id: "nursing",
      name: "Nursing",
      logo: "/logo/nurse.png",
      courses: ["Bachelor of Science in Nursing"],
    },
    {
      id: "education",
      name: "Education",
      logo: "/logo/educ.png",
      courses: [
        "Bachelor of Early Childhood Education",
        "Bachelor of Technical-Vocational Teacher Education (Major in Food and Service Management)",
      ],
    },
    {
      id: "business",
      name: "Business Administration",
      logo: "/logo/business admin.png",
      courses: [
        "Bachelor of Science in Entrepreneurship",
        "Bachelor of Science in Management Accounting",
      ],
    },
    {
      id: "information",
      name: "Information System",
      logo: "/logo/information system.png",
      courses: ["Bachelor of Science in Information System"],
    },
    {
      id: "tourism",
      name: "Tourism Management",
      logo: "/logo/tourism.png",
      courses: ["Bachelor of Science in Tourism Management"],
    },
    {
      id: "criminology",
      name: "Criminology",
      logo: "/logo/crime.png",
      courses: ["Bachelor of Science in Criminology"],
    },
  ];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    verified: "bg-blue-100 text-blue-800",
    incomplete: "bg-orange-100 text-orange-800",
    admitted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const fetchApplications = async (page = 1, courseTabId = null) => {
    try {
      setLoading(true);

      // Use the provided courseTabId or fall back to selectedCourseTab
      const currentCourseTab = courseTabId || selectedCourseTab;

      // Build course filter based on selected tab
      let courseFilter = "";
      if (currentCourseTab !== "all") {
        const selectedTab = courseTabs.find(
          (tab) => tab.id === currentCourseTab
        );
        if (selectedTab && selectedTab.courses.length > 0) {
          // Send all courses for the selected tab as comma-separated values
          courseFilter = selectedTab.courses.join(",");
        }
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...filters,
        ...(courseFilter && { course: courseFilter }),
      });

      const response = await axios.get(`/api/applications?${params}`);

      setApplications(response.data.applications);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/applications/stats/overview");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchCourseTabCounts = async () => {
    try {
      const counts = {};
      for (const tab of courseTabs) {
        if (tab.id === "all") {
          // Get total count for "all" tab
          const response = await axios.get("/api/applications?limit=1");
          counts.all = response.data.pagination.total;
        } else if (tab.courses.length > 0) {
          // Get count for specific course tab
          const courseFilter = tab.courses.join(",");
          const response = await axios.get(
            `/api/applications?course=${encodeURIComponent(
              courseFilter
            )}&limit=1`
          );
          counts[tab.id] = response.data.pagination.total;
        }
      }
      setCourseTabCounts(counts);
    } catch (error) {
      console.error("Error fetching course tab counts:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchStats();
    fetchCourseTabCounts();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Trigger refresh when filters change
    setTimeout(() => {
      fetchApplications(1);
    }, 100);
  };

  const handleCourseTabChange = (tabId) => {
    setSelectedCourseTab(tabId);
    // Reset to first page when changing tabs
    setPagination((prev) => ({ ...prev, current: 1 }));
    // Trigger refresh when course tab changes - pass tabId directly
    setTimeout(() => {
      fetchApplications(1, tabId);
      fetchCourseTabCounts(); // Refresh counts when switching tabs
    }, 100);
  };

  const getCourseTabCount = (tab) => {
    return courseTabCounts[tab.id] || 0;
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await axios.patch(`/api/applications/${applicationId}/status`, {
        status: newStatus,
      });

      // Refresh applications
      fetchApplications(pagination.current);
      fetchStats();
      fetchCourseTabCounts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditApplication = (application) => {
    setEditingApplication(application);
    setEditFormData({
      name: application.name,
      email: application.email,
      contact: application.contact,
      courseApplied: application.courseApplied,
      status: application.status,
    });
    setShowEditModal(true);
  };

  const handleUpdateApplication = async () => {
    try {
      await axios.put(
        `/api/applications/${editingApplication._id}`,
        editFormData
      );
      setShowEditModal(false);
      fetchApplications(pagination.current);
      fetchStats();
      fetchCourseTabCounts();
      alert("Application updated successfully!");
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Failed to update application. Please try again.");
    }
  };

  const handleDeleteApplication = async (application) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${application.name}'s application? This action cannot be undone.`
      )
    ) {
      try {
        await axios.delete(`/api/applications/${application._id}`);
        fetchApplications(pagination.current);
        fetchStats();
        fetchCourseTabCounts();
        alert("Application deleted successfully!");
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Failed to delete application. Please try again.");
      }
    }
  };

  const handleArchiveApplication = async (application) => {
    if (
      window.confirm(
        `Are you sure you want to archive ${application.name}'s application?`
      )
    ) {
      try {
        await axios.patch(`/api/applications/${application._id}/archive`);
        fetchApplications(pagination.current);
        fetchStats();
        fetchCourseTabCounts();
        alert("Application archived successfully!");
      } catch (error) {
        console.error("Error archiving application:", error);
        alert("Failed to archive application. Please try again.");
      }
    }
  };

  const handlePageChange = (page) => {
    fetchApplications(page);
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

  const handleSendMissingRequirements = async () => {
    if (!selectedApplication || missingRequirements.length === 0) return;

    setSendingEmail(true);
    try {
      await axios.post(
        `/api/applications/${selectedApplication._id}/send-missing-requirements`,
        {
          missingItems: missingRequirements,
          customMessage: customMessage,
        }
      );

      alert("Missing requirements notification sent successfully!");
      setShowMissingRequirementsModal(false);
      setMissingRequirements([]);
      setCustomMessage("");
    } catch (error) {
      console.error("Error sending missing requirements:", error);
      alert("Failed to send notification. Please try again.");
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSendCustomNotification = async () => {
    if (!selectedApplication || !customSubject || !customNotificationMessage)
      return;

    setSendingEmail(true);
    try {
      await axios.post(
        `/api/applications/${selectedApplication._id}/send-custom-notification`,
        {
          subject: customSubject,
          message: customNotificationMessage,
          notificationType: "custom",
        }
      );

      alert("Custom notification sent successfully!");
      setShowCustomNotificationModal(false);
      setCustomSubject("");
      setCustomNotificationMessage("");
    } catch (error) {
      console.error("Error sending custom notification:", error);
      alert("Failed to send notification. Please try again.");
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#1B9AAA]/20">
              <h3 className="text-lg font-medium text-[#0D1B2A] mb-2">
                Total Applications
              </h3>
              <p className="text-3xl font-bold text-[#1B9AAA]">
                {stats.totalApplications}
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#22c55e]/20">
              <h3 className="text-lg font-medium text-[#0D1B2A] mb-2">
                This Week
              </h3>
              <p className="text-3xl font-bold text-[#22c55e]">
                {stats.recentApplications}
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#FFC300]/20">
              <h3 className="text-lg font-medium text-[#0D1B2A] mb-2">
                Pending
              </h3>
              <p className="text-3xl font-bold text-[#FFC300]">
                {stats.statusBreakdown.find((s) => s._id === "pending")
                  ?.count || 0}
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#22c55e]/20">
              <h3 className="text-lg font-medium text-[#0D1B2A] mb-2">
                Admitted
              </h3>
              <p className="text-3xl font-bold text-[#22c55e]">
                {stats.statusBreakdown.find((s) => s._id === "admitted")
                  ?.count || 0}
              </p>
            </div>
          </div>
        )}

        {/* Course Tabs */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#1B9AAA]/20 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#0D1B2A] mb-2">
              Filter by Course
            </h3>
            <div className="flex flex-wrap gap-3">
              {courseTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleCourseTabChange(tab.id)}
                  className={`flex items-center space-x-3 px-5 py-3 rounded-xl transition-all duration-300 border-2 ${
                    selectedCourseTab === tab.id
                      ? "bg-[#1B9AAA] text-white shadow-xl transform scale-105 border-[#1B9AAA]"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg border-gray-200 hover:border-[#1B9AAA]/30"
                  }`}
                >
                  <img
                    src={tab.logo}
                    alt={tab.name}
                    className="w-7 h-7 object-contain"
                  />
                  <span className="font-semibold text-sm">{tab.name}</span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      selectedCourseTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-[#1B9AAA]/10 text-[#1B9AAA]"
                    }`}
                  >
                    {getCourseTabCount(tab)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0D1B2A] mb-2">
                Status Filter
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent bg-white shadow-sm transition-all duration-200 hover:border-[#1B9AAA]/50"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0D1B2A] mb-2">
                Search Applications
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent bg-white shadow-sm transition-all duration-200 hover:border-[#1B9AAA]/50"
                  placeholder="Search by name or email"
                />
                {filters.search && (
                  <button
                    onClick={() => handleFilterChange("search", "")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    title="Clear search"
                  >
                    <svg
                      className="h-5 w-5"
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
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#1B9AAA]/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1B9AAA]/20">
            <h3 className="text-lg font-medium text-[#0D1B2A]">Applications</h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B9AAA] mx-auto"></div>
              <p className="mt-2 text-[#0D1B2A]">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-8 text-center text-[#0D1B2A]">
              No applications found
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
                      Submitted
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider w-48">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-[#1B9AAA]/20">
                  {applications.map((application) => (
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
                        {formatDate(application.submittedAt)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <select
                            value={application.status}
                            onChange={(e) =>
                              handleStatusUpdate(
                                application._id,
                                e.target.value
                              )
                            }
                            className="text-xs border border-gray-300 rounded-md px-3 py-2 min-w-[90px] max-w-[120px] bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[#1B9AAA] focus:border-[#1B9AAA] transition-all duration-200 hover:border-[#1B9AAA]/50"
                          >
                            {statusOptions.slice(1).map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="flex space-x-1">
                            <button
                              onClick={() =>
                                setSelectedApplication(application)
                              }
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="View Details"
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleEditApplication(application)}
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              title="Edit Application"
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                handleArchiveApplication(application)
                              }
                              className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                              title="Archive Application"
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
                                  d="M5 8l4 4m0 0l4-4m-4 4V3m6 5v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteApplication(application)
                              }
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

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Application Details
              </h3>
              <button
                onClick={() => setSelectedApplication(null)}
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
              <div className="flex items-center space-x-4">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src={selectedApplication.photoUrl}
                  alt={selectedApplication.name}
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {selectedApplication.name}
                  </h4>
                  <p className="text-gray-600">{selectedApplication.email}</p>
                  <p className="text-gray-600">{selectedApplication.contact}</p>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900">
                  Course Applied For:
                </h5>
                <p className="text-gray-600">
                  {selectedApplication.courseApplied}
                </p>
              </div>

              <div>
                <h5 className="font-medium text-gray-900">
                  Digital Signature:
                </h5>
                <img
                  src={selectedApplication.signatureUrl}
                  alt="Signature"
                  className="border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-500">
                  Submitted: {formatDate(selectedApplication.submittedAt)}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    statusColors[selectedApplication.status]
                  }`}
                >
                  {selectedApplication.status}
                </span>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <button
                  onClick={() => setShowMissingRequirementsModal(true)}
                  className="bg-[#FFC300] hover:bg-[#E6AC00] text-[#0D1B2A] font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Missing Requirements
                </button>
                <button
                  onClick={() => setShowCustomNotificationModal(true)}
                  className="bg-[#1B9AAA] hover:bg-[#158A9A] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Custom Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Missing Requirements Modal */}
      {showMissingRequirementsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Send Missing Requirements Notification
              </h3>
              <button
                onClick={() => setShowMissingRequirementsModal(false)}
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
                Select the missing requirements to notify{" "}
                <strong>{selectedApplication?.name}</strong> about:
              </p>

              <div className="space-y-2">
                {[
                  "Updated profile photo",
                  "Clear digital signature",
                  "Valid ID document",
                  "Academic transcripts",
                  "Recommendation letter",
                  "Medical certificate",
                  "Other supporting documents",
                ].map((item, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={missingRequirements.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMissingRequirements([
                            ...missingRequirements,
                            item,
                          ]);
                        } else {
                          setMissingRequirements(
                            missingRequirements.filter((req) => req !== item)
                          );
                        }
                      }}
                      className="rounded border-gray-300 text-[#1B9AAA] focus:ring-[#1B9AAA]"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Instructions (Optional)
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add any specific instructions or details about the missing requirements..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowMissingRequirementsModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMissingRequirements}
                  disabled={missingRequirements.length === 0 || sendingEmail}
                  className="px-4 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#158A9A] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingEmail ? "Sending..." : "Send Notification"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Notification Modal */}
      {showCustomNotificationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Send Custom Notification
              </h3>
              <button
                onClick={() => setShowCustomNotificationModal(false)}
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
                Send a custom notification to{" "}
                <strong>{selectedApplication?.name}</strong>:
              </p>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="e.g., Application Update, Important Information, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  value={customNotificationMessage}
                  onChange={(e) => setCustomNotificationMessage(e.target.value)}
                  placeholder="Write your custom message here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent"
                  rows={6}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> You can use line breaks in your message.
                  The email will be formatted professionally with your
                  institution's branding.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCustomNotificationModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendCustomNotification}
                  disabled={
                    !customSubject || !customNotificationMessage || sendingEmail
                  }
                  className="px-4 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#158A9A] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingEmail ? "Sending..." : "Send Notification"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Application Modal */}
      {showEditModal && editingApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Edit Application
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="text"
                  value={editFormData.contact}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      contact: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Applied
                </label>
                <select
                  value={editFormData.courseApplied}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      courseApplied: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent"
                >
                  <option value="">Select a course</option>
                  {[
                    "Bachelor of Science in Marine Transportation",
                    "Bachelor of Science in Marine Engineering",
                    "Bachelor of Science in Nursing",
                    "Bachelor of Early Childhood Education",
                    "Bachelor of Technical-Vocational Teacher Education (Major in Food and Service Management)",
                    "Bachelor of Science in Entrepreneurship",
                    "Bachelor of Science in Management Accounting",
                    "Bachelor of Science in Information System",
                    "Bachelor of Science in Tourism Management",
                    "Bachelor of Science in Criminology",
                  ].map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent"
                >
                  {statusOptions.slice(1).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateApplication}
                  className="px-4 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#158A9A]"
                >
                  Update Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
