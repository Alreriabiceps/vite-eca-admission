import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const Analytics = () => {
  const { admin } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [comparisonData, setComparisonData] = useState(null);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [courseTargets, setCourseTargets] = useState([]);
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [printing, setPrinting] = useState(false);

  const terms = [
    { value: "all", label: "All Terms" },
    { value: "1st", label: "1st Term" },
    { value: "2nd", label: "2nd Term" },
    { value: "summer", label: "Summer" },
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/analytics/enrollment?year=${selectedYear}&term=${selectedTerm}`
      );
      console.log("Analytics data received:", response.data);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComparisonData = async () => {
    try {
      const response = await axios.get(
        `/api/analytics/comparison?year=${selectedYear}`
      );
      console.log("Comparison data received:", response.data);
      setComparisonData(response.data);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  const fetchCourseTargets = async () => {
    try {
      const response = await axios.get(
        `/api/course-targets?year=${selectedYear}&term=${selectedTerm}`
      );
      setCourseTargets(response.data);
    } catch (error) {
      console.error("Error fetching course targets:", error);
    }
  };

  const handleStartEditing = () => {
    // Initialize edit values with current targets
    const initialValues = {};
    analyticsData?.courseData?.forEach((course) => {
      const target = courseTargets.find(
        (t) => t.courseName === course.courseName
      );
      initialValues[course.courseName] = (target?.target ?? 50).toString();
    });
    setEditValues(initialValues);
    setIsEditingAll(true);
  };

  const handleEditValueChange = (courseName, value) => {
    setEditValues((prev) => ({
      ...prev,
      [courseName]: value,
    }));
  };

  const handleSaveAllTargets = async () => {
    try {
      setSaving(true);

      // Validate all values
      for (const [courseName, value] of Object.entries(editValues)) {
        const numeric = parseInt(value);
        if (Number.isNaN(numeric) || numeric < 0) {
          alert(`Please enter a valid non-negative number for ${courseName}`);
          return;
        }
      }

      // Save all targets
      const savePromises = Object.entries(editValues).map(
        async ([courseName, value]) => {
          const numeric = parseInt(value);
          const target = courseTargets.find((t) => t.courseName === courseName);

          if (target) {
            // Update existing
            return axios.put(`/api/course-targets/${target._id}`, {
              target: numeric,
            });
          } else {
            // Create new
            return axios.post(`/api/course-targets`, {
              courseName: courseName,
              target: numeric,
              academicYear: selectedYear.toString(),
              term: selectedTerm,
            });
          }
        }
      );

      await Promise.all(savePromises);
      await fetchCourseTargets();
      await fetchAnalyticsData(); // Refresh analytics data
      setIsEditingAll(false);
      setEditValues({});
      alert("All targets updated successfully!");
    } catch (error) {
      console.error("Error saving targets:", error);
      alert("Failed to save targets. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingAll(false);
    setEditValues({});
  };

  useEffect(() => {
    console.log("Fetching data for year:", selectedYear, "term:", selectedTerm);
    fetchAnalyticsData();
    fetchComparisonData();
    fetchCourseTargets();
  }, [selectedYear, selectedTerm]);

  useEffect(() => {
    console.log("Analytics data state:", analyticsData);
    console.log("Comparison data state:", comparisonData);
    console.log("Loading state:", loading);
  }, [analyticsData, comparisonData, loading]);

  const getStatusColor = (actual, target) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 100) return "text-green-600";
    if (percentage >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (actual, target) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 100) return "bg-green-100 text-green-800";
    if (percentage >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusText = (actual, target) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 100) return "Target Met";
    if (percentage >= 80) return "Near Target";
    return "Below Target";
  };

  const handleCustomPrint = () => {
    const today = new Date().toLocaleString();
    const data = analyticsData;
    const compare = comparisonData;

    const safe = (v) => (v === undefined || v === null ? "-" : v);

    const coursesRows = (data?.courseData || [])
      .map(
        (c, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>${c.courseName}</td>
            <td>${safe(c.target)}</td>
            <td>${safe(c.actual)}</td>
            <td>${safe(c.achievement)}%</td>
            <td>${getStatusText(c.actual, c.target)}</td>
            <td>${c.variance >= 0 ? "+" : ""}${safe(c.variance)}</td>
          </tr>
        `
      )
      .join("");

    const yearlyRows = (compare?.yearlyData || [])
      .map(
        (y) => `
          <tr>
            <td>${y.year}</td>
            <td>${safe(y.enrollment)}</td>
            <td>${y.growth > 0 ? "+" : ""}${safe(y.growth)}%</td>
          </tr>
        `
      )
      .join("");

    const topCourseRows = (compare?.topCourses || [])
      .map(
        (c, i) => `
          <tr>
            <td>#${i + 1}</td>
            <td>${c.name}</td>
            <td>${safe(c.enrollment)}</td>
            <td>${c.growth > 0 ? "+" : ""}${safe(c.growth)}%</td>
          </tr>
        `
      )
      .join("");

    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Admission Analytics Report</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#0D1B2A; margin:0; }
            .container { padding: 24px; }
            .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
            .title { font-size:20px; font-weight:800; }
            .meta { font-size:12px; color:#475569; }
            .cards { display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin:16px 0 24px; }
            .card { border:1px solid #e2e8f0; border-radius:10px; padding:12px; background:#fff; }
            .card h4 { margin:0 0 6px; font-size:11px; color:#475569; font-weight:600; }
            .card p { margin:0; font-size:20px; font-weight:800; }
            h3 { font-size:15px; margin:18px 0 8px; }
            table { width:100%; border-collapse:collapse; background:#fff; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; }
            thead { background:#F5F7FA; }
            th, td { padding:8px 10px; font-size:12px; border-bottom:1px solid #e2e8f0; text-align:left; }
            th { font-weight:700; color:#0D1B2A; }
            tr:last-child td { border-bottom:none; }
            .grid-2 { display:grid; grid-template-columns: 1fr 1fr; gap:16px; }
            @media print {
              .container { padding: 12mm; }
              .cards { grid-template-columns: repeat(4, 1fr); }
              .grid-2 { grid-template-columns: 1fr 1fr; }
              .no-print { display:none !important; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div>
                <div class="title">Admission Analytics Report</div>
                <div class="meta">Academic Year: ${selectedYear} ${
      selectedTerm !== "all"
        ? `(${terms.find((t) => t.value === selectedTerm)?.label})`
        : "(All Terms)"
    }</div>
              </div>
              <div class="meta">Generated: ${today}</div>
            </div>

            <div class="cards">
              <div class="card"><h4>Total Enrolled</h4><p>${safe(
                data?.totalEnrolled
              )}</p></div>
              <div class="card"><h4>Target Met</h4><p>${safe(
                data?.coursesMeetingTarget
              )}</p></div>
              <div class="card"><h4>Average Achievement</h4><p>${safe(
                data?.averageAchievement
              )}%</p></div>
              <div class="card"><h4>Below Target</h4><p>${safe(
                data?.coursesBelowTarget
              )}</p></div>
            </div>

            <h3>Course Enrollment Analysis - ${selectedYear}</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course</th>
                  <th>Target</th>
                  <th>Actual</th>
                  <th>Achievement</th>
                  <th>Status</th>
                  <th>Variance</th>
                </tr>
              </thead>
              <tbody>
                ${coursesRows}
              </tbody>
            </table>

            <div class="grid-2">
              <div>
                <h3>Year-to-Year Trend</h3>
                <table>
                  <thead><tr><th>Year</th><th>Enrollment</th><th>Growth</th></tr></thead>
                  <tbody>${yearlyRows}</tbody>
                </table>
              </div>
              <div>
                <h3>Top Performing Courses</h3>
                <table>
                  <thead><tr><th>Rank</th><th>Course</th><th>Enrollment</th><th>Growth</th></tr></thead>
                  <tbody>${topCourseRows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </body>
      </html>`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    // Give time for layout/images
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
        <AdminHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA] mx-auto"></div>
            <p className="mt-4 text-white text-lg">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] print:bg-white">
      <AdminHeader />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:px-0 print:py-0"
        id="analytics-print-area"
      >
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#1B9AAA]/20 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0D1B2A] mb-2">
                Admission Analytics Report
              </h1>
              <p className="text-gray-600">
                Track and compare enrollment data per course across different
                years and terms
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
              <div>
                <label className="block text-sm font-medium text-[#0D1B2A] mb-2">
                  Academic Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent bg-white shadow-sm"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year} - {year + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0D1B2A] mb-2">
                  Term
                </label>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent bg-white shadow-sm"
                >
                  {terms.map((term) => (
                    <option key={term.value} value={term.value}>
                      {term.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-3">
                <button
                  onClick={() => setShowTargetModal(true)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Edit Targets
                </button>
                <button
                  onClick={handleCustomPrint}
                  className="px-6 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#158A9A] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:ring-offset-2 transition-all duration-200"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {analyticsData ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#1B9AAA]/20">
              <div className="flex items-center">
                <div className="p-3 bg-[#1B9AAA]/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-[#1B9AAA]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Enrolled
                  </p>
                  <p className="text-2xl font-bold text-[#0D1B2A]">
                    {analyticsData.totalEnrolled}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#22c55e]/20">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Target Met
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {analyticsData.coursesMeetingTarget}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#FFC300]/20">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Average Achievement
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {analyticsData.averageAchievement}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#ef4444]/20">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Below Target
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {analyticsData.coursesBelowTarget}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-[#1B9AAA]/20 mb-8">
            <div className="text-center">
              <div className="text-gray-500 text-lg">
                No analytics data available
              </div>
              <div className="text-gray-400 text-sm mt-2">
                Data is being loaded or no applications found for the selected
                period
              </div>
            </div>
          </div>
        )}

        {/* Course Enrollment Analysis */}
        {analyticsData ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#1B9AAA]/20 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-[#1B9AAA]/20">
              <h3 className="text-xl font-semibold text-[#0D1B2A]">
                Course Enrollment Analysis - {selectedYear}
              </h3>
              <p className="text-gray-600 mt-1">
                Target vs Actual enrollment by course
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#1B9AAA]/20">
                <thead className="bg-[#F5F7FA]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Target
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Actual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Achievement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#0D1B2A] uppercase tracking-wider">
                      Variance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-[#1B9AAA]/20">
                  {analyticsData.courseData.map((course, index) => (
                    <tr key={index} className="hover:bg-[#F5F7FA]/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {course.courseName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.target}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.actual}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                course.achievement >= 100
                                  ? "bg-green-500"
                                  : course.achievement >= 80
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${Math.min(course.achievement, 100)}%`,
                              }}
                            ></div>
                          </div>
                          <span
                            className={`text-sm font-medium ${getStatusColor(
                              course.actual,
                              course.target
                            )}`}
                          >
                            {course.achievement}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                            course.actual,
                            course.target
                          )}`}
                        >
                          {getStatusText(course.actual, course.target)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            course.variance >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {course.variance >= 0 ? "+" : ""}
                          {course.variance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {/* Year-to-Year Comparison */}
        {comparisonData ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#1B9AAA]/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1B9AAA]/20">
              <h3 className="text-xl font-semibold text-[#0D1B2A]">
                Year-to-Year Comparison
              </h3>
              <p className="text-gray-600 mt-1">
                Enrollment trends and growth analysis
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Total Enrollment Trend */}
                <div>
                  <h4 className="text-lg font-semibold text-[#0D1B2A] mb-4">
                    Total Enrollment Trend
                  </h4>
                  <div className="space-y-3">
                    {comparisonData.yearlyData.map((year, index) => (
                      <div
                        key={year.year}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium text-gray-700">
                          {year.year}
                        </span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">
                            {year.enrollment}
                          </span>
                          {index > 0 && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                year.growth > 0
                                  ? "bg-green-100 text-green-800"
                                  : year.growth < 0
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {year.growth > 0 ? "+" : ""}
                              {year.growth}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Courses */}
                <div>
                  <h4 className="text-lg font-semibold text-[#0D1B2A] mb-4">
                    Top Performing Courses
                  </h4>
                  <div className="space-y-3">
                    {comparisonData.topCourses.map((course, index) => (
                      <div
                        key={course.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-500">
                            #{index + 1}
                          </span>
                          <span className="font-medium text-gray-700">
                            {course.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {course.enrollment}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            {course.growth}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-[#1B9AAA]/20">
            <div className="text-center">
              <div className="text-gray-500 text-lg">
                No comparison data available
              </div>
              <div className="text-gray-400 text-sm mt-2">
                Historical data is being loaded or not available
              </div>
            </div>
          </div>
        )}

        {/* Edit Targets Modal */}
        {showTargetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Course Targets - {selectedYear}{" "}
                  {selectedTerm !== "all" &&
                    `(${terms.find((t) => t.value === selectedTerm)?.label})`}
                </h3>
                <button
                  onClick={() => setShowTargetModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
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

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-3">
                  {analyticsData?.courseData?.map((course, index) => {
                    const target = courseTargets.find(
                      (t) => t.courseName === course.courseName
                    );
                    const currentValue = isEditingAll
                      ? editValues[course.courseName]
                      : target?.target ?? 50;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {course.courseName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Current: {course.actual} | Target:{" "}
                            {isEditingAll ? (
                              <span className="font-medium text-blue-600">
                                Editing...
                              </span>
                            ) : (
                              course.target
                            )}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          {isEditingAll ? (
                            <input
                              type="number"
                              value={currentValue}
                              onChange={(e) =>
                                handleEditValueChange(
                                  course.courseName,
                                  e.target.value
                                )
                              }
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              min="0"
                              max="1000"
                              placeholder="Target"
                            />
                          ) : (
                            <div className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-medium text-gray-700">
                              {currentValue}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                {isEditingAll ? (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAllTargets}
                      disabled={saving}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {saving ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save All Changes</span>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowTargetModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleStartEditing}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit All Targets
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
