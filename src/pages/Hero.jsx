import LogoCarousel from "../components/LogoCarousel";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the hero animation to start after intro completes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  // Course data with individual course information
  const courses = [
    {
      id: "marine-transportation",
      title: "Marine Transportation",
      fullTitle: "Bachelor of Science in Marine Transportation",
      college: "College of Maritime Education",
      logo: "/logo/maritime.png",
      description:
        "Navigate the seas with expertise in ship operations and maritime law.",
      duration: "4 years",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "marine-engineering",
      title: "Marine Engineering",
      fullTitle: "Bachelor of Science in Marine Engineering",
      college: "College of Maritime Education",
      logo: "/logo/maritime.png",
      description:
        "Master marine propulsion systems and ship maintenance technology.",
      duration: "4 years",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "nursing",
      title: "Nursing",
      fullTitle: "Bachelor of Science in Nursing",
      college: "College of Nursing",
      logo: "/logo/nurse.png",
      description:
        "Develop compassionate care skills for professional nursing careers.",
      duration: "4 years",
      color: "from-red-500 to-red-700",
    },
    {
      id: "early-childhood-education",
      title: "Early Childhood Education",
      fullTitle: "Bachelor of Early Childhood Education",
      college: "College of Education",
      logo: "/logo/educ.png",
      description:
        "Shape young minds and build foundations for lifelong learning.",
      duration: "4 years",
      color: "from-green-500 to-green-700",
    },
    {
      id: "technical-vocational-teacher",
      title: "Technical-Vocational Teacher Education",
      fullTitle: "Bachelor of Technical-Vocational Teacher Education",
      college: "College of Education",
      logo: "/logo/educ.png",
      description:
        "Train future educators specializing in food and service management.",
      duration: "4 years",
      color: "from-green-500 to-green-700",
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship",
      fullTitle: "Bachelor of Science in Entrepreneurship",
      college: "College of Business Administration",
      logo: "/logo/business admin.png",
      description: "Develop skills to start and manage successful businesses.",
      duration: "4 years",
      color: "from-purple-500 to-purple-700",
    },
    {
      id: "management-accounting",
      title: "Management Accounting",
      fullTitle: "Bachelor of Science in Management Accounting",
      college: "College of Business Administration",
      logo: "/logo/business admin.png",
      description:
        "Master financial analysis and management accounting principles.",
      duration: "4 years",
      color: "from-purple-500 to-purple-700",
    },
    {
      id: "information-system",
      title: "Information System",
      fullTitle: "Bachelor of Science in Information System",
      college: "College of Information Technology",
      logo: "/logo/information system.png",
      description:
        "Design and manage information systems for business operations.",
      duration: "4 years",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      id: "tourism-management",
      title: "Tourism Management",
      fullTitle: "Bachelor of Science in Tourism Management",
      college: "College of Tourism",
      logo: "/logo/tourism.png",
      description:
        "Explore the dynamic world of tourism and hospitality management.",
      duration: "4 years",
      color: "from-orange-500 to-orange-700",
    },
    {
      id: "criminology",
      title: "Criminology",
      fullTitle: "Bachelor of Science in Criminology",
      college: "College of Criminology",
      logo: "/logo/crime.png",
      description:
        "Study crime, criminal behavior, and the criminal justice system.",
      duration: "4 years",
      color: "from-gray-500 to-gray-700",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Available Programs Section */}
      <div
        className="py-8 sm:py-12 md:py-16 lg:py-20 relative"
        style={{
          backgroundImage: `url("/bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div
            className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1200 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-white">
              Available Programs
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#1B9AAA] mx-auto rounded-full mb-2 sm:mb-3"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto px-2">
              Choose from our comprehensive range of undergraduate programs
              designed for professional success.
            </p>
          </div>

          {/* Course Books Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-1200 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {courses.map((course, index) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden transform perspective-1000 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transitionDelay: `${600 + index * 100}ms`,
                }}
              >
                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-300 to-gray-400 rounded-l-2xl"></div>

                {/* Course Content */}
                <div className="relative p-4 sm:p-6">
                  {/* Logo */}
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                      <img
                        src={course.logo}
                        alt={`${course.title} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Course Title */}
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-bold text-[#0D1B2A] mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#1B9AAA] font-medium">
                      {course.college}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3 text-center">
                    {course.description}
                  </p>

                  {/* Duration Badge */}
                  <div className="flex justify-center">
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
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B9AAA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  {/* Read More Indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#1B9AAA] text-white p-2 rounded-full shadow-lg">
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Logo Carousel Section */}
      <div
        className={`bg-white py-8 sm:py-12 md:py-16 transition-all duration-1200 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-3 sm:mb-4">
              Our Departments
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#1B9AAA] mx-auto rounded-full mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-[#343A40] max-w-2xl mx-auto px-2">
              Explore the diverse colleges and departments that make up our
              educational institution
            </p>
          </div>
          <LogoCarousel />
        </div>
      </div>
    </div>
  );
};

export default Hero;
