import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const MatchedEnrolled = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [sourceFile, setSourceFile] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [resettingBatch, setResettingBatch] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    course: "",
    sourceFile: "",
    schoolYear: "",
    dateFrom: "",
    dateTo: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });
  const schoolYearOptions = (() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    return Array.from({ length: 6 }, (_, index) => {
      const start = currentYear - 2 + index;
      return `${start}-${start + 1}`;
    });
  })();

  const fetchMatched = async (page = 1, filters = appliedFilters) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        ...(filters.search ? { search: filters.search } : {}),
        ...(filters.course ? { course: filters.course } : {}),
        ...(filters.sourceFile ? { sourceFile: filters.sourceFile } : {}),
        ...(filters.schoolYear ? { schoolYear: filters.schoolYear } : {}),
        ...(filters.dateFrom ? { dateFrom: filters.dateFrom } : {}),
        ...(filters.dateTo ? { dateTo: filters.dateTo } : {}),
      });
      const response = await axios.get(`/api/enrollment-import/matched?${params}`);
      setApplications(response.data.applications || []);
      setPagination(
        response.data.pagination || { current: 1, pages: 1, total: 0 }
      );
    } catch (error) {
      console.error("Error fetching matched enrolled applications:", error);
      alert("Failed to load matched enrolled records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatched(1, appliedFilters);
  }, [appliedFilters]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setAppliedFilters({
      search: search.trim(),
      course: course.trim(),
      sourceFile: sourceFile.trim(),
      schoolYear: schoolYear.trim(),
      dateFrom,
      dateTo,
    });
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";
    return new Date(dateValue).toLocaleString();
  };

  const handleResetBatch = async () => {
    const selectedSourceFile = sourceFile.trim() || appliedFilters.sourceFile;
    const selectedSchoolYear = schoolYear.trim() || appliedFilters.schoolYear;
    const scopeText =
      selectedSourceFile || selectedSchoolYear
        ? `for filtered scope${
            selectedSourceFile ? ` (file: ${selectedSourceFile})` : ""
          }${selectedSchoolYear ? ` (school year: ${selectedSchoolYear})` : ""}`
        : "for ALL matched imported records";
    const confirmed = window.confirm(
      `Reset batch ${scopeText}?\n\nThis will move matched imported students back to VERIFIED and clear import tags.`
    );
    if (!confirmed) return;

    try {
      setResettingBatch(true);
      const response = await axios.delete("/api/enrollment-import/batch", {
        data: {
          sourceFile: selectedSourceFile,
          ...(selectedSchoolYear ? { schoolYear: selectedSchoolYear } : {}),
        },
      });
      const resetCount = response.data.resetCount || 0;
      if (resetCount === 0) {
        alert(
          "No records were reset. Check filters (Source File / School Year) and ensure records are currently enrolled via import."
        );
      } else {
        alert(`Batch reset complete. ${resetCount} record(s) reverted.`);
      }
      fetchMatched(1, appliedFilters);
    } catch (error) {
      console.error("Error resetting batch:", error);
      alert(error.response?.data?.message || "Failed to reset batch.");
    } finally {
      setResettingBatch(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white">Matched Enrolled</h1>
          <p className="text-sm text-gray-300">
            Applicants matched by batch import and updated to enrolled.
          </p>
        </div>

        <div className="bg-white/90 rounded-lg border border-gray-200 p-4 mb-4">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, or course"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
            />
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Filter course"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
            />
            <input
              type="text"
              value={sourceFile}
              onChange={(e) => setSourceFile(e.target.value)}
              placeholder="Filter source file"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
            />
            <select
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] bg-white"
            >
              <option value="">All School Years</option>
              {schoolYearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              title="Imported from date"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              title="Imported to date"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
            />
            <div className="md:col-span-2 lg:col-span-6 flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#1B9AAA] text-white rounded-md hover:bg-[#158A9A]"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCourse("");
                  setSourceFile("");
                  setSchoolYear("");
                  setDateFrom("");
                  setDateTo("");
                  setAppliedFilters({
                    search: "",
                    course: "",
                    sourceFile: "",
                    schoolYear: "",
                    dateFrom: "",
                    dateTo: "",
                  });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleResetBatch}
                disabled={resettingBatch}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-60"
                title="Reset matched imported records (all or filtered)"
              >
                {resettingBatch ? "Resetting..." : "Reset Matched"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white/90 rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              Imported Enrolled Records
            </h2>
            <span className="text-xs text-gray-600">
              Total: {pagination.total}
            </span>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-600">Loading records...</div>
          ) : applications.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">
              No matched enrolled records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                      Course
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                      Imported At
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                      School Year
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">
                      Source File
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{app.name}</td>
                      <td className="px-4 py-3">{app.email}</td>
                      <td className="px-4 py-3">{app.courseApplied}</td>
                      <td className="px-4 py-3">
                        {formatDate(app.enrolledImportedAt)}
                      </td>
                      <td className="px-4 py-3">
                        {app.enrolledSchoolYear || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {app.enrollmentImportFile || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <span className="text-xs text-gray-600">
              Page {pagination.current} of {pagination.pages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fetchMatched(pagination.current - 1)}
                disabled={pagination.current <= 1 || loading}
                className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => fetchMatched(pagination.current + 1)}
                disabled={pagination.current >= pagination.pages || loading}
                className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedEnrolled;
