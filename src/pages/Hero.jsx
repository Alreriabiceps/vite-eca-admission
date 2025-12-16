import LogoCarousel from "../components/LogoCarousel";
import CoursesCarousel from "../components/CoursesCarousel";
import CourseModal from "../components/CourseModal";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  // removed modal state for news; using dedicated page

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
        "Prepare for a career at sea with our comprehensive Marine Transportation program. Students learn navigation, ship operations, maritime law, and safety procedures essential for maritime careers.",
      duration: "4 years",
      units: "160+ units",
      color: "from-blue-500 to-blue-700",
      requirements: [
        "High School Diploma or equivalent",
        "Physical and medical fitness for maritime work",
        "Passing entrance examination",
        "Basic swimming skills",
        "Good eyesight and hearing",
      ],
      curriculum: [
        "Maritime Navigation",
        "Ship Operations",
        "Maritime Law and Regulations",
        "Marine Safety and Security",
        "Port Management",
        "Maritime Economics",
      ],
      careerOpportunities: [
        "Ship Captain",
        "Marine Officer",
        "Port Operations Manager",
        "Maritime Safety Inspector",
        "Navigation Officer",
        "Maritime Consultant",
      ],
      theme: {
        // College of Maritime Education — deep navy blue
        headerFrom: "#003B8E",
        headerTo: "#001F4D",
        accent: "#003B8E",
        accentText: "#ffffff",
        accentSoft: "rgba(0, 59, 142, 0.12)",
        border: "rgba(0, 59, 142, 0.4)",
        badgeBg: "rgba(0, 59, 142, 0.18)",
        badgeText: "#0D1B2A",
        tagBg: "rgba(0, 59, 142, 0.18)",
      },
    },
    {
      id: "marine-engineering",
      title: "Marine Engineering",
      fullTitle: "Bachelor of Science in Marine Engineering",
      college: "College of Maritime Education",
      logo: "/logo/maritime.png",
      description:
        "Master the technical aspects of ship operations and marine technology. This program covers marine propulsion systems, electrical systems, and ship maintenance essential for marine engineering careers.",
      duration: "4 years",
      units: "160+ units",
      color: "from-blue-500 to-blue-700",
      requirements: [
        "High School Diploma or equivalent",
        "Strong foundation in Mathematics and Science",
        "Physical fitness for maritime work",
        "Passing entrance examination",
        "Technical aptitude",
      ],
      curriculum: [
        "Marine Propulsion Systems",
        "Marine Electrical Systems",
        "Ship Construction and Design",
        "Marine Machinery",
        "Marine Safety Engineering",
        "Marine Environmental Engineering",
      ],
      careerOpportunities: [
        "Marine Engineer",
        "Ship Engineer",
        "Marine Surveyor",
        "Port Engineer",
        "Marine Equipment Specialist",
        "Maritime Technical Consultant",
      ],
      theme: {
        // College of Maritime Education — deep navy blue
        headerFrom: "#003B8E",
        headerTo: "#001F4D",
        accent: "#003B8E",
        accentText: "#ffffff",
        accentSoft: "rgba(0, 59, 142, 0.12)",
        border: "rgba(0, 59, 142, 0.4)",
        badgeBg: "rgba(0, 59, 142, 0.18)",
        badgeText: "#0D1B2A",
        tagBg: "rgba(0, 59, 142, 0.18)",
      },
    },
    {
      id: "nursing",
      title: "Nursing",
      fullTitle: "Bachelor of Science in Nursing",
      college: "College of Nursing",
      logo: "/logo/nurse.png",
      description:
        "Develop compassionate care skills and medical knowledge to serve communities as professional nurses. Our program combines theoretical learning with extensive clinical practice.",
      duration: "4 years",
      units: "160+ units",
      color: "from-red-500 to-red-700",
      requirements: [
        "High School Diploma or equivalent",
        "Passing entrance examination",
        "Good communication skills",
        "Compassionate nature",
        "Physical and mental fitness",
      ],
      curriculum: [
        "Fundamentals of Nursing",
        "Medical-Surgical Nursing",
        "Maternal and Child Health",
        "Community Health Nursing",
        "Mental Health Nursing",
        "Nursing Research",
      ],
      careerOpportunities: [
        "Registered Nurse",
        "Nurse Educator",
        "Public Health Nurse",
        "Nurse Administrator",
        "Clinical Nurse Specialist",
        "Nurse Researcher",
      ],
      theme: {
        // College of Nursing — medium green
        headerFrom: "#1E8A3A",
        headerTo: "#145423",
        accent: "#1E8A3A",
        accentText: "#ffffff",
        accentSoft: "rgba(30, 138, 58, 0.15)",
        border: "rgba(30, 138, 58, 0.4)",
        badgeBg: "rgba(30, 138, 58, 0.22)",
        badgeText: "#ffffff",
        tagBg: "rgba(30, 138, 58, 0.2)",
      },
    },
    {
      id: "early-childhood-education",
      title: "Early Childhood Education",
      fullTitle: "Bachelor of Early Childhood Education",
      college: "College of Education",
      logo: "/logo/educ.png",
      description:
        "Shape young minds and build the foundation for lifelong learning. This program prepares educators to work with children from birth to age 8, focusing on developmental needs and educational strategies.",
      duration: "4 years",
      units: "160+ units",
      color: "from-green-500 to-green-700",
      requirements: [
        "High School Diploma or equivalent",
        "Passing entrance examination",
        "Patience and creativity",
        "Good communication skills",
        "Love for children",
      ],
      curriculum: [
        "Child Development",
        "Early Childhood Curriculum",
        "Educational Psychology",
        "Teaching Methods",
        "Child Assessment",
        "Family and Community Relations",
      ],
      careerOpportunities: [
        "Preschool Teacher",
        "Kindergarten Teacher",
        "Child Development Specialist",
        "Early Childhood Program Director",
        "Educational Consultant",
        "Childcare Center Administrator",
      ],
      theme: {
        // College of Education — royal blue
        headerFrom: "#0066CC",
        headerTo: "#003A73",
        accent: "#0066CC",
        accentText: "#ffffff",
        accentSoft: "rgba(0, 102, 204, 0.15)",
        border: "rgba(0, 102, 204, 0.4)",
        badgeBg: "rgba(0, 102, 204, 0.22)",
        badgeText: "#ffffff",
        tagBg: "rgba(0, 102, 204, 0.2)",
      },
    },
    {
      id: "technical-vocational-teacher",
      title: "Technical-Vocational Teacher Education",
      fullTitle:
        "Bachelor of Technical-Vocational Teacher Education (Major in Food and Service Management)",
      college: "College of Education",
      logo: "/logo/educ.png",
      description:
        "Train future technical-vocational educators specializing in food and service management. This program combines culinary arts education with teaching methodologies for technical-vocational schools.",
      duration: "4 years",
      units: "160+ units",
      color: "from-green-500 to-green-700",
      requirements: [
        "High School Diploma or equivalent",
        "Passing entrance examination",
        "Interest in culinary arts",
        "Teaching aptitude",
        "Good organizational skills",
      ],
      curriculum: [
        "Food Preparation Techniques",
        "Service Management",
        "Teaching Methods",
        "Curriculum Development",
        "Restaurant Operations",
        "Food Safety and Sanitation",
      ],
      careerOpportunities: [
        "Technical-Vocational Teacher",
        "Culinary Arts Instructor",
        "Food Service Manager",
        "Restaurant Operations Manager",
        "Hospitality Educator",
        "Culinary Consultant",
      ],
      theme: {
        // College of Education — royal blue
        headerFrom: "#0066CC",
        headerTo: "#003A73",
        accent: "#0066CC",
        accentText: "#ffffff",
        accentSoft: "rgba(0, 102, 204, 0.15)",
        border: "rgba(0, 102, 204, 0.4)",
        badgeBg: "rgba(0, 102, 204, 0.22)",
        badgeText: "#ffffff",
        tagBg: "rgba(0, 102, 204, 0.2)",
      },
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship",
      fullTitle: "Bachelor of Science in Entrepreneurship",
      college: "College of Business Administration",
      logo: "/logo/business admin.png",
      description:
        "Develop the skills and mindset to start and manage successful businesses. This program covers business planning, financial management, marketing, and innovation strategies for aspiring entrepreneurs.",
      duration: "4 years",
      units: "160+ units",
      color: "from-purple-500 to-purple-700",
      requirements: [
        "High School Diploma or equivalent",
        "Passing entrance examination",
        "Creative thinking",
        "Leadership potential",
        "Risk-taking ability",
      ],
      curriculum: [
        "Business Planning",
        "Financial Management",
        "Marketing Strategy",
        "Innovation and Creativity",
        "Business Law",
        "Operations Management",
      ],
      careerOpportunities: [
        "Business Owner",
        "Startup Founder",
        "Business Consultant",
        "Innovation Manager",
        "Venture Capitalist",
        "Business Development Manager",
      ],
      theme: {
        // College of Business Administration — golden yellow
        headerFrom: "#FFC300",
        headerTo: "#D4A100",
        accent: "#FFC300",
        accentText: "#1F2937",
        accentSoft: "rgba(255, 195, 0, 0.18)",
        border: "rgba(255, 195, 0, 0.5)",
        badgeBg: "rgba(255, 195, 0, 0.22)",
        badgeText: "#1F2937",
        tagBg: "rgba(255, 195, 0, 0.2)",
      },
    },
    {
      id: "management-accounting",
      title: "Management Accounting",
      fullTitle: "Bachelor of Science in Management Accounting",
      college: "College of Business Administration",
      logo: "/logo/business admin.png",
      description:
        "Master financial analysis and management accounting principles to support business decision-making. This program focuses on cost analysis, budgeting, and financial reporting for organizations.",
      duration: "4 years",
      units: "160+ units",
      color: "from-purple-500 to-purple-700",
      requirements: [
        "High School Diploma or equivalent",
        "Passing entrance examination",
        "Strong analytical skills",
        "Attention to detail",
        "Mathematical aptitude",
      ],
      curriculum: [
        "Financial Accounting",
        "Cost Accounting",
        "Management Accounting",
        "Financial Analysis",
        "Budgeting and Planning",
        "Taxation",
      ],
      careerOpportunities: [
        "Management Accountant",
        "Financial Analyst",
        "Cost Accountant",
        "Budget Analyst",
        "Financial Controller",
        "Business Analyst",
      ],
      theme: {
        // College of Business Administration — golden yellow
        headerFrom: "#FFC300",
        headerTo: "#D4A100",
        accent: "#FFC300",
        accentText: "#1F2937",
        accentSoft: "rgba(255, 195, 0, 0.18)",
        border: "rgba(255, 195, 0, 0.5)",
        badgeBg: "rgba(255, 195, 0, 0.22)",
        badgeText: "#1F2937",
        tagBg: "rgba(255, 195, 0, 0.2)",
      },
    },
    {
      id: "information-system",
      title: "Information System",
      fullTitle: "Bachelor of Science in Information System",
      college: "College of Information Technology",
      logo: "/logo/information system.png",
      description:
        "Design and manage information systems that support business operations. This program combines business knowledge with technical skills to create efficient and effective information solutions.",
      duration: "4 years",
      units: "160+ units",
      color: "from-indigo-500 to-indigo-700",
      requirements: [
        "High School Diploma or equivalent",
        "Passing entrance examination",
        "Logical thinking",
        "Problem-solving skills",
        "Interest in technology",
      ],
      curriculum: [
        "Programming Fundamentals",
        "Database Management",
        "Systems Analysis and Design",
        "Network Administration",
        "Web Development",
        "IT Project Management",
      ],
      careerOpportunities: [
        "Systems Analyst",
        "IT Consultant",
        "Database Administrator",
        "Business Analyst",
        "IT Project Manager",
        "Information Systems Manager",
      ],
      theme: {
        // BS Information System — neutral gray treatment
        headerFrom: "#4B5563",
        headerTo: "#111827",
        accent: "#4B5563",
        accentText: "#ffffff",
        accentSoft: "rgba(75, 85, 99, 0.15)",
        border: "rgba(75, 85, 99, 0.45)",
        badgeBg: "rgba(75, 85, 99, 0.22)",
        badgeText: "#ffffff",
        tagBg: "rgba(75, 85, 99, 0.2)",
      },
    },
    {
      id: "tourism-management",
      title: "Tourism Management",
      fullTitle: "Bachelor of Science in Tourism Management",
      college: "College of Tourism",
      logo: "/logo/tourism.png",
      description:
        "Explore the dynamic world of tourism and hospitality. This program prepares students for careers in travel, hospitality, and tourism management with focus on customer service and destination marketing.",
      duration: "4 years",
      units: "160+ units",
      color: "from-orange-500 to-orange-700",
      requirements: [
        "High School Diploma or equivalent",
        "Passing entrance examination",
        "Good communication skills",
        "Customer service orientation",
        "Cultural awareness",
      ],
      curriculum: [
        "Tourism Principles",
        "Hospitality Management",
        "Destination Marketing",
        "Travel Operations",
        "Event Management",
        "Cultural Tourism",
      ],
      careerOpportunities: [
        "Tourism Manager",
        "Travel Agent",
        "Hotel Manager",
        "Event Coordinator",
        "Destination Marketing Manager",
        "Tourism Consultant",
      ],
      theme: {
        // College of Tourism Management — warm pink
        headerFrom: "#F06A8A",
        headerTo: "#C93C60",
        accent: "#F06A8A",
        accentText: "#ffffff",
        accentSoft: "rgba(240, 106, 138, 0.15)",
        border: "rgba(240, 106, 138, 0.4)",
        badgeBg: "rgba(240, 106, 138, 0.22)",
        badgeText: "#ffffff",
        tagBg: "rgba(240, 106, 138, 0.2)",
      },
    },
    {
      id: "criminology",
      title: "Criminology",
      fullTitle: "Bachelor of Science in Criminology",
      college: "College of Criminology",
      logo: "/logo/crime.png",
      description:
        "Study crime, criminal behavior, and the criminal justice system. This program provides comprehensive knowledge of law enforcement, criminal investigation, and crime prevention strategies.",
      duration: "4 years",
      units: "160+ units",
      color: "from-gray-500 to-gray-700",
      requirements: [
        "High School Diploma or equivalent",
        "Passing entrance examination",
        "Physical fitness",
        "Integrity and honesty",
        "Strong moral character",
      ],
      curriculum: [
        "Criminal Law",
        "Criminal Investigation",
        "Criminology Theories",
        "Forensic Science",
        "Police Administration",
        "Correctional Administration",
      ],
      careerOpportunities: [
        "Police Officer",
        "Criminal Investigator",
        "Probation Officer",
        "Security Manager",
        "Crime Analyst",
        "Law Enforcement Administrator",
      ],
      theme: {
        // College of Criminology / Criminal Justice — dark maroon
        headerFrom: "#8B0000",
        headerTo: "#4A0000",
        accent: "#8B0000",
        accentText: "#ffffff",
        accentSoft: "rgba(139, 0, 0, 0.15)",
        border: "rgba(139, 0, 0, 0.5)",
        badgeBg: "rgba(139, 0, 0, 0.22)",
        badgeText: "#ffffff",
        tagBg: "rgba(139, 0, 0, 0.2)",
      },
    },
  ];

  // News cards data used to route to full post page
  const newsCards = [
    {
      slug: "feature-gg-well-code",
      image: "/news/q.jpg",
      title:
        "FEATURE | Team GG Well Code Reaches Top 5 at the Byte Forward Hackathon Final Pitch",
    },
    {
      slug: "haunted-treasure-hunt",
      image: "/news/w.jpg",
      title: "HAUNTED TREASURE HUNT | Adventure Awaits",
    },
    {
      slug: "battle-of-the-bands-2025",
      image: "/news/e.jpg",
      title: "BATTLE OF THE BANDS 2025 – GUIDELINES AND MECHANICS",
    },
  ];

  // Scroll reveal for course cards and sections
  const courseContainerRef = useRef(null);
  const [revealedCourseIdxs, setRevealedCourseIdxs] = useState(new Set());
  const [revealedSections, setRevealedSections] = useState({});

  useEffect(() => {
    const container = courseContainerRef.current;
    if (!container) return;

    const courseObserver = new IntersectionObserver(
      (entries) => {
        setRevealedCourseIdxs((prev) => {
          const next = new Set(prev);
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const idx = e.target.getAttribute("data-idx");
              if (idx !== null) next.add(Number(idx));
            }
          });
          return next;
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );

    const cards = container.querySelectorAll('[data-role="course-card"]');
    cards.forEach((el) => courseObserver.observe(el));

    return () => courseObserver.disconnect();
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        setRevealedSections((prev) => {
          const next = { ...prev };
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const key = e.target.getAttribute("data-section");
              if (key) next[key] = true;
            }
          });
          return next;
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll("[data-section]")
      .forEach((el) => sectionObserver.observe(el));

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Top Hero Banner */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url("/headerbg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Build Your Future at <br />
              <span className="text-warm-gold">Exact Colleges of Asia</span>
            </h1>
            <p className="text-soft-off-white text-lg sm:text-xl md:text-2xl mb-8 font-light max-w-2xl">
              Excellence in education, hands-on training, and a community dedicated to your success.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/application"
                className="bg-warm-gold hover:bg-yellow-500 text-deep-navy-blue font-bold py-4 px-8 rounded-lg shadow-xl transition-all hover:-translate-y-1"
              >
                Apply Now
              </Link>
              <a
                href="#programs"
                className="bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg border-2 border-white/30 hover:border-white/50 transition-all"
              >
                Explore Programs
              </a>
            </div>
          </div>
        

        {/* Quick Stats Strip removed per request */}
      </section>
      {/* Available Programs Section */}
      <div
        id="programs"
        className="py-8 sm:py-12 md:py-16 lg:py-20 relative"
        style={{
          backgroundImage: `url("/bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        data-section="programs"
      >
        {/* Overlay for better text readability */}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-deep-navy-blue/80 mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div
            className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1200 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Available Programs
            </h2>
            <div className="w-24 h-1.5 bg-warm-gold mx-auto rounded-full mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto px-2">
              Choose from our comprehensive range of undergraduate programs
              designed for professional success.
            </p>
          </div>

          {/* Course Cards Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-1200 delay-400 ${
              revealedSections["programs"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            ref={courseContainerRef}
          >
            {courses.map((course, index) => (
              <button
                key={course.id}
                onClick={() => {
                  setSelectedCourseIndex(index);
                  setShowCourseModal(true);
                }}
                className={`group relative flex flex-col bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden transform w-full ${
                  revealedCourseIdxs.has(index)
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  transitionDelay: `${index * 120}ms`,
                }}
                data-role="course-card"
                data-idx={index}
              >
                {/* Colored header with large faint logo */}
                <div
                  className="relative px-4 pt-4 pb-3 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${
                      course.theme?.headerFrom || "#1B9AAA"
                    }, ${course.theme?.headerTo || "#0D1B2A"})`,
                  }}
                >
                  {/* Big watermark logo */}
                  <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    <img
                      src={course.logo}
                      alt=""
                      className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <p className="text-[11px] font-medium text-white/80 uppercase tracking-wide">
                        {course.college}
                      </p>
                      <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2">
                        {course.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col px-4 pb-4 pt-3 bg-white/95">
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
                      style={{
                        backgroundColor:
                          course.theme?.accentSoft || "rgba(27, 154, 170, 0.08)",
                        color: course.theme?.accent || "#1B9AAA",
                      }}
                    >
                      Program details
                    </span>
                    <span className="flex items-center text-xs font-semibold text-[#1B9AAA] group-hover:translate-x-0.5 transition-transform">
                      View more
                      <svg
                        className="w-3.5 h-3.5 ml-1"
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
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Modal removed; using dedicated page */}
      {/* Why Choose Us */}


      {/* Testimonials Section */}
      <section className="bg-[#0D1B2A] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white">
              <p className="text-sm mb-3">
                The hands-on training at ECA prepared me for my first job
                immediately after graduation.
              </p>
              <footer className="text-xs text-white/80">
                — Alumni, BS Nursing
              </footer>
            </blockquote>
            <blockquote className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white">
              <p className="text-sm mb-3">
                Professors truly care about our success and the curriculum
                matches industry needs.
              </p>
              <footer className="text-xs text-white/80">
                — Student, BS Information System
              </footer>
            </blockquote>
            <blockquote className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white">
              <p className="text-sm mb-3">
                Affordable tuition and scholarships made quality education
                possible for me.
              </p>
              <footer className="text-xs text-white/80">
                — Parent of ECA Student
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white py-12 md:py-16" data-section="news">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D1B2A] text-center mb-8">
            News & Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsCards.map((item) => (
              <Link
                key={item.slug}
                to={`/news/${item.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-[#1B9AAA]/20 hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 right-3 bg-white text-[#0D1B2A] rounded-full p-2 shadow">
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Image Carousel */}
      <section
        className="bg-gradient-to-b from-[#0D1B2A] to-[#1a2332] py-12 md:py-16"
        data-section="campus"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Campus Life & Facilities
          </h2>
          <p className="text-center text-white/80 mb-8 max-w-2xl mx-auto">
            Explore our modern facilities, classrooms, and vibrant campus
            environment
          </p>
          <CoursesCarousel />
        </div>
      </section>

      {/* Logo Carousel Section */}
      <div
        className={`bg-white py-8 sm:py-12 md:py-16 transition-all duration-1200 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-navy-blue mb-3 sm:mb-4">
              Our Departments
            </h2>
            <div className="w-24 h-1.5 bg-warm-gold mx-auto rounded-full mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-[#343A40] max-w-2xl mx-auto px-2">
              Explore the diverse colleges and departments that make up our
              educational institution
            </p>
          </div>
          <LogoCarousel />
        </div>
      </div>

      {/* Final Call to Action */}
      <section className="bg-warm-gold py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-blue mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-deep-navy-blue/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join a community of scholars, innovators, and leaders. Apply today and shape your future at Exact Colleges of Asia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/application"
              className="bg-deep-navy-blue text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-opacity-90 transition-all hover:-translate-y-1"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-deep-navy-blue text-deep-navy-blue font-bold py-4 px-10 rounded-lg hover:bg-deep-navy-blue/10 transition-all"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* Course Modal */}
      {showCourseModal && (
        <CourseModal
          isOpen={showCourseModal}
          course={courses[selectedCourseIndex]}
          courses={courses}
          currentIndex={selectedCourseIndex}
          onClose={() => setShowCourseModal(false)}
          onPrev={() => {
            setSelectedCourseIndex(
              (prev) => (prev - 1 + courses.length) % courses.length
            );
          }}
          onNext={() => {
            setSelectedCourseIndex((prev) => (prev + 1) % courses.length);
          }}
        />
      )}
    </div>
  );
};

export default Hero;
