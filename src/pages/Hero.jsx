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
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Build Your Future at Exact Colleges of Asia
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6">
              Quality education, hands-on training, and a community that helps
              you thrive.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/application"
                className="bg-[#1B9AAA] hover:bg-[#158A9A] text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
              >
                Apply Now
              </Link>
              <a
                href="#programs"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg border border-white/30"
              >
                Explore Programs
              </a>
            </div>
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
                className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden transform w-full ${
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
                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-300 to-gray-400 rounded-l-2xl"></div>

                {/* Course Content */}
                <div className="relative p-4 sm:p-6">
                  {/* Course Title */}
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-bold text-[#0D1B2A] mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#1B9AAA] font-medium">
                      {course.college}
                    </p>
                  </div>

                  {/* Logo moved after title */}
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                      <img
                        src={course.logo}
                        alt={`${course.title} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
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
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Modal removed; using dedicated page */}
      {/* Why Choose Us */}
      <section
        className={`bg-white py-12 md:py-16 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D1B2A] text-center mb-8">
            Why Choose ECA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-[#1B9AAA]/20 bg-[#1B9AAA]/5">
              <h3 className="font-semibold text-[#0D1B2A] mb-2">
                Industry-Aligned Curriculum
              </h3>
              <p className="text-sm text-[#343A40]">
                Programs designed with employer input to prepare you for real
                jobs.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[#1B9AAA]/20 bg-[#1B9AAA]/5">
              <h3 className="font-semibold text-[#0D1B2A] mb-2">
                Hands-on Learning
              </h3>
              <p className="text-sm text-[#343A40]">
                Laboratories, simulations, and internships for practical
                experience.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[#1B9AAA]/20 bg-[#1B9AAA]/5">
              <h3 className="font-semibold text-[#0D1B2A] mb-2">
                Supportive Community
              </h3>
              <p className="text-sm text-[#343A40]">
                Advising and mentoring to help you succeed from day one.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[#1B9AAA]/20 bg-[#1B9AAA]/5">
              <h3 className="font-semibold text-[#0D1B2A] mb-2">
                Affordable Tuition
              </h3>
              <p className="text-sm text-[#343A40]">
                Scholarships and flexible payment options available.
              </p>
            </div>
          </div>
        </div>
      </section>

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
