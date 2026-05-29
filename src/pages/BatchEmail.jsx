import { useCallback, useEffect, useMemo, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const courseGroups = [
  { id: "all", name: "All Courses", courses: [] },
  {
    id: "maritime",
    name: "Maritime Education",
    courses: [
      "Bachelor of Science in Marine Transportation",
      "Bachelor of Science in Marine Engineering",
    ],
  },
  { id: "nursing", name: "Nursing", courses: ["Bachelor of Science in Nursing"] },
  {
    id: "education",
    name: "Education",
    courses: [
      "Bachelor of Early Childhood Education",
      "Bachelor of Technical-Vocational Teacher Education (Major in Food and Service Management)",
    ],
  },
  {
    id: "business",
    name: "Business Administration",
    courses: [
      "Bachelor of Science in Entrepreneurship",
      "Bachelor of Science in Management Accounting",
    ],
  },
  {
    id: "information",
    name: "Information System",
    courses: ["Bachelor of Science in Information System"],
  },
  {
    id: "tourism",
    name: "Tourism Management",
    courses: ["Bachelor of Science in Tourism Management"],
  },
  {
    id: "criminology",
    name: "Criminology",
    courses: ["Bachelor of Science in Criminology"],
  },
];

const allCourses = courseGroups
  .flatMap((group) => group.courses)
  .filter((course, index, courses) => courses.indexOf(course) === index);

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "incomplete", label: "Incomplete" },
  { value: "enrolled", label: "Enrolled" },
  { value: "admitted", label: "Admitted" },
  { value: "rejected", label: "Rejected" },
];

const messageTemplates = [
  {
    id: "general",
    label: "General",
    build: ({ dayDate }) => ({
      subject: `Important Announcement - ${dayDate}`,
      message: `Good day, Exactians!

Please be informed of the following announcement for ${dayDate}.

[Write announcement details here.]

Thank you.
Exact Colleges of Asia`,
    }),
  },
  {
    id: "maritime-medical",
    label: "Maritime Medical",
    build: ({ dayDate }) => ({
      subject: `Maritime Medical Schedule - ${dayDate}`,
      message: `Good day, Maritime students!

Please be informed that the maritime medical schedule is set for ${dayDate}.

Kindly monitor the Exact Colleges of Asia Maritime Education Facebook Page and prepare your required documents.

Thank you.
Exact Colleges of Asia`,
    }),
  },
  {
    id: "requirements",
    label: "Requirements",
    build: ({ dayDate }) => ({
      subject: `Requirements Submission Reminder - ${dayDate}`,
      message: `Good day!

This is a reminder to submit your pending admission/enrollment requirements on ${dayDate}.

Please prepare your documents and submit them to the Registrar's Office.

Thank you.
Exact Colleges of Asia`,
    }),
  },
  {
    id: "enrollment",
    label: "Enrollment",
    build: ({ dayDate }) => ({
      subject: `Enrollment Reminder - ${dayDate}`,
      message: `Good day!

Please be reminded to complete your enrollment process on ${dayDate}.

For questions or concerns, you may contact the admissions office.

Thank you.
Exact Colleges of Asia`,
    }),
  },
];

const getAutoDayDate = () => {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const date = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    day,
    date,
    dayDate: `${day}, ${date}`,
  };
};

const BatchEmail = () => {
  const [filters, setFilters] = useState({
    courseGroup: "all",
    course: "",
    status: "",
    search: "",
  });
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientInfo, setRecipientInfo] = useState({
    total: 0,
    sendableCount: 0,
    skippedCount: 0,
    preview: [],
  });
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  const courseOptions = useMemo(() => {
    const selectedGroup = courseGroups.find(
      (group) => group.id === filters.courseGroup
    );

    return selectedGroup && selectedGroup.id !== "all"
      ? selectedGroup.courses
      : allCourses;
  }, [filters.courseGroup]);

  const updateFilter = (key, value) => {
    setSendResult(null);
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
      ...(key === "courseGroup" ? { course: "" } : {}),
    }));
  };

  const fetchRecipientPreview = useCallback(async () => {
    try {
      setLoadingPreview(true);
      const params = new URLSearchParams({
        courseGroup: filters.courseGroup,
        ...(filters.course ? { course: filters.course } : {}),
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.search.trim() ? { search: filters.search.trim() } : {}),
      });
      const response = await axios.get(`/api/applications/email/recipients?${params}`);
      setRecipientInfo(response.data);
    } catch (error) {
      console.error("Error loading batch email recipients:", error);
      alert("Failed to load recipients.");
    } finally {
      setLoadingPreview(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRecipientPreview();
  }, [fetchRecipientPreview]);

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Subject and message are required.");
      return;
    }

    if (recipientInfo.sendableCount === 0) {
      alert("No students with sendable email addresses match these filters.");
      return;
    }

    const confirmed = window.confirm(
      `Send this email to ${recipientInfo.sendableCount} student(s)?`
    );
    if (!confirmed) return;

    try {
      setSending(true);
      setSendResult(null);
      const response = await axios.post("/api/applications/email/send-batch", {
        ...filters,
        search: filters.search.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      setSendResult(response.data);
      await fetchRecipientPreview();
      alert("Batch email processed.");
    } catch (error) {
      console.error("Error sending batch email:", error);
      alert(error.response?.data?.message || "Failed to send batch email.");
    } finally {
      setSending(false);
    }
  };

  const handleApplyTemplate = (template) => {
    const nextMessage = template.build(getAutoDayDate());

    setSubject(nextMessage.subject);
    setMessage(nextMessage.message);
    setSendResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
      <AdminHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white">Email</h1>
          <p className="text-sm text-gray-300">
            Send one custom email to a filtered group of students.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[22rem_1fr]">
          <section className="rounded-lg border border-[#1B9AAA]/20 bg-white/90 p-4 shadow-lg">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#0D1B2A]">
              Recipients
            </h2>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#0D1B2A]">
                  Course Group
                </label>
                <select
                  value={filters.courseGroup}
                  onChange={(event) =>
                    updateFilter("courseGroup", event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                >
                  {courseGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[#0D1B2A]">
                  Specific Course
                </label>
                <select
                  value={filters.course}
                  onChange={(event) => updateFilter("course", event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                >
                  <option value="">All courses in group</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[#0D1B2A]">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(event) => updateFilter("status", event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[#0D1B2A]">
                  Search
                </label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(event) => updateFilter("search", event.target.value)}
                  placeholder="Name, email, or course"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                />
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-gray-200 bg-[#F5F7FA] p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Matching students</span>
                <span className="font-semibold text-[#0D1B2A]">
                  {loadingPreview ? "..." : recipientInfo.total}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Can email</span>
                <span className="font-semibold text-[#1B9AAA]">
                  {loadingPreview ? "..." : recipientInfo.sendableCount}
                </span>
              </div>
              {recipientInfo.skippedCount > 0 && (
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Skipped no email</span>
                  <span className="font-semibold text-orange-600">
                    {recipientInfo.skippedCount}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 max-h-64 space-y-2 overflow-y-auto">
              {recipientInfo.preview.length === 0 ? (
                <p className="rounded-lg border border-dashed border-gray-300 p-3 text-center text-sm text-gray-500">
                  No preview records
                </p>
              ) : (
                recipientInfo.preview.map((student) => (
                  <div
                    key={student._id}
                    className="rounded-lg border border-gray-200 bg-white p-3"
                  >
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {student.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {student.email}
                    </p>
                    <p className="mt-1 truncate text-xs text-[#1B9AAA]">
                      {student.courseApplied}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-lg border border-[#1B9AAA]/20 bg-white/90 p-4 shadow-lg">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#0D1B2A]">
              Message
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#0D1B2A]">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="e.g., Maritime medical schedule reminder"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[#0D1B2A]">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write the announcement here..."
                  rows={12}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                />
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0D1B2A]">
                  Templates
                </h3>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {messageTemplates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => handleApplyTemplate(template)}
                      className="rounded-lg border border-[#1B9AAA]/30 bg-[#F5F7FA] px-3 py-2 text-sm font-semibold text-[#0D1B2A] transition-colors hover:bg-[#1B9AAA] hover:text-white"
                    >
                      {template.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-600">
                  Ready for{" "}
                  <span className="font-semibold text-[#0D1B2A]">
                    {recipientInfo.sendableCount}
                  </span>{" "}
                  recipient(s)
                </p>
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={
                    sending ||
                    !subject.trim() ||
                    !message.trim() ||
                    recipientInfo.sendableCount === 0
                  }
                  className="rounded-lg bg-[#1B9AAA] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#158A9A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Batch Email"}
                </button>
              </div>

              {sendResult && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
                  <p className="font-semibold">Batch email processed</p>
                  <p>Sent: {sendResult.sent}</p>
                  <p>Skipped: {sendResult.skipped}</p>
                  <p>Failed: {sendResult.failedCount}</p>
                  {sendResult.failed?.length > 0 && (
                    <ul className="mt-2 max-h-28 list-disc space-y-1 overflow-y-auto pl-5 text-xs">
                      {sendResult.failed.map((item, index) => (
                        <li key={`${item.email}-${index}`}>
                          {item.email}: {item.error}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BatchEmail;
