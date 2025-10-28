import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const CourseModal = ({
  isOpen,
  course,
  courses,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!isOpen || !course) return null;

  const prevIndex =
    (currentIndex - 1 + (courses?.length || 1)) % (courses?.length || 1);
  const nextIndex = (currentIndex + 1) % (courses?.length || 1);
  const prevCourseName = courses?.[prevIndex]?.title || "Previous";
  const nextCourseName = courses?.[nextIndex]?.title || "Next";

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[99999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header with logo and close button */}
        <div className="relative bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={course.logo}
              alt={`${course.title} logo`}
              className="h-12 w-12 bg-white rounded-xl p-1.5 shadow-md object-contain"
            />
            <div>
              <h3 className="text-lg font-bold text-white">{course.title}</h3>
              <p className="text-xs text-white/90">{course.college}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/application"
              className="hidden sm:inline-block px-3 py-1 text-xs bg-white text-[#1B9AAA] font-semibold rounded-lg hover:bg-gray-100 shadow"
            >
              Apply Now
            </Link>
            <button
              onClick={onClose}
              className="bg-white/90 hover:bg-white text-[#0D1B2A] rounded-full p-2 shadow-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
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
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Duration & Units */}
          <div className="flex gap-2 mb-4">
            {course.duration && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1B9AAA]/10 text-[#1B9AAA]">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {course.duration}
              </span>
            )}
            {course.units && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {course.units}
              </span>
            )}
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Description Card */}
            <div className="col-span-2 bg-[#1B9AAA]/5 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-[#0D1B2A] mb-2">
                Description
              </h3>
              <p className="text-xs text-gray-700">{course.description}</p>
            </div>

            {/* Requirements Card */}
            {course.requirements && (
              <div className="bg-white border border-[#1B9AAA]/20 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-[#0D1B2A] mb-2">
                  Requirements
                </h3>
                <ul className="space-y-1">
                  {course.requirements.slice(0, 3).map((req, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-700 flex items-start"
                    >
                      <span className="text-[#1B9AAA] mr-1">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Curriculum Card */}
            {course.curriculum && (
              <div className="bg-white border border-[#1B9AAA]/20 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-[#0D1B2A] mb-2">
                  Curriculum
                </h3>
                <ul className="space-y-1">
                  {course.curriculum.slice(0, 3).map((subj, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-700 flex items-start"
                    >
                      <span className="text-[#1B9AAA] mr-1">•</span>
                      {subj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Career Opportunities Card */}
            {course.careerOpportunities && (
              <div className="col-span-2 bg-gradient-to-br from-[#1B9AAA]/10 to-transparent rounded-lg p-3">
                <h3 className="text-sm font-semibold text-[#0D1B2A] mb-2">
                  Career Opportunities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.careerOpportunities.slice(0, 4).map((career, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white px-2 py-1 rounded border border-[#1B9AAA]/20"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation with course names */}
          <div className="flex justify-between items-center gap-4 mt-6">
            <button
              onClick={onPrev}
              className="text-sm text-[#1B9AAA] hover:text-[#158A9A] font-semibold truncate max-w-[40%]"
              title={prevCourseName}
            >
              ← {prevCourseName}
            </button>
            <button
              onClick={onNext}
              className="text-sm text-[#1B9AAA] hover:text-[#158A9A] font-semibold truncate max-w-[40%] text-right ml-auto"
              title={nextCourseName}
            >
              {nextCourseName} →
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CourseModal;
