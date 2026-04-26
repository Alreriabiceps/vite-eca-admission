import LogoCarousel from "../components/LogoCarousel";
import CoursesCarousel from "../components/CoursesCarousel";
import CourseModal from "../components/CourseModal";
import ProgramsShowcase from "../components/ProgramsShowcase";
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
        headerFrom: "#1D4ED8",
        headerTo: "#B91C1C",
        accent: "#1D4ED8",
        accentText: "#ffffff",
        accentSoft: "rgba(29, 78, 216, 0.12)",
        border: "rgba(29, 78, 216, 0.25)",
        badgeBg: "rgba(185, 28, 28, 0.18)",
        badgeText: "#0D1B2A",
        tagBg: "rgba(29, 78, 216, 0.15)",
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
        headerFrom: "#1D4ED8",
        headerTo: "#B91C1C",
        accent: "#B91C1C",
        accentText: "#ffffff",
        accentSoft: "rgba(185, 28, 28, 0.12)",
        border: "rgba(185, 28, 28, 0.25)",
        badgeBg: "rgba(226, 232, 240, 0.6)",
        badgeText: "#0F172A",
        tagBg: "rgba(185, 28, 28, 0.12)",
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
        headerFrom: "#22C55E",
        headerTo: "#FACC15",
        accent: "#22C55E",
        accentText: "#0A3F1C",
        accentSoft: "rgba(34, 197, 94, 0.15)",
        border: "rgba(34, 197, 94, 0.25)",
        badgeBg: "rgba(250, 204, 21, 0.22)",
        badgeText: "#1E3A8A",
        tagBg: "rgba(34, 197, 94, 0.18)",
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
        headerFrom: "#FDE68A",
        headerTo: "#60A5FA",
        accent: "#FBBF24",
        accentText: "#1F2937",
        accentSoft: "rgba(251, 191, 36, 0.15)",
        border: "rgba(96, 165, 250, 0.25)",
        badgeBg: "rgba(251, 191, 36, 0.22)",
        badgeText: "#1F2937",
        tagBg: "rgba(96, 165, 250, 0.18)",
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
        headerFrom: "#FDE68A",
        headerTo: "#38BDF8",
        accent: "#38BDF8",
        accentText: "#0C4A6E",
        accentSoft: "rgba(56, 189, 248, 0.12)",
        border: "rgba(56, 189, 248, 0.25)",
        badgeBg: "rgba(253, 230, 138, 0.22)",
        badgeText: "#92400E",
        tagBg: "rgba(56, 189, 248, 0.18)",
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
        headerFrom: "#047857",
        headerTo: "#60A5FA",
        accent: "#047857",
        accentText: "#ffffff",
        accentSoft: "rgba(4, 120, 87, 0.12)",
        border: "rgba(4, 120, 87, 0.25)",
        badgeBg: "rgba(96, 165, 250, 0.2)",
        badgeText: "#0F172A",
        tagBg: "rgba(4, 120, 87, 0.18)",
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
        headerFrom: "#047857",
        headerTo: "#064E3B",
        accent: "#047857",
        accentText: "#ffffff",
        accentSoft: "rgba(4, 120, 87, 0.12)",
        border: "rgba(4, 120, 87, 0.25)",
        badgeBg: "rgba(4, 120, 87, 0.18)",
        badgeText: "#063222",
        tagBg: "rgba(4, 120, 87, 0.15)",
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
        headerFrom: "#2563EB",
        headerTo: "#FACC15",
        accent: "#2563EB",
        accentText: "#ffffff",
        accentSoft: "rgba(37, 99, 235, 0.12)",
        border: "rgba(37, 99, 235, 0.25)",
        badgeBg: "rgba(250, 204, 21, 0.22)",
        badgeText: "#1E3A8A",
        tagBg: "rgba(37, 99, 235, 0.18)",
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
        headerFrom: "#EC4899",
        headerTo: "#BE123C",
        accent: "#EC4899",
        accentText: "#ffffff",
        accentSoft: "rgba(236, 72, 153, 0.12)",
        border: "rgba(236, 72, 153, 0.25)",
        badgeBg: "rgba(236, 72, 153, 0.18)",
        badgeText: "#5F0D2A",
        tagBg: "rgba(236, 72, 153, 0.15)",
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
        headerFrom: "#DC2626",
        headerTo: "#FBBF24",
        accent: "#DC2626",
        accentText: "#1F2937",
        accentSoft: "rgba(220, 38, 38, 0.12)",
        border: "rgba(251, 191, 36, 0.25)",
        badgeBg: "rgba(220, 38, 38, 0.18)",
        badgeText: "#7C2D12",
        tagBg: "rgba(251, 191, 36, 0.18)",
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
      <ProgramsShowcase
        courses={courses}
        onCourseClick={(index) => {
          setSelectedCourseIndex(index);
          setShowCourseModal(true);
        }}
      />

      {/* News Modal removed; using dedicated page */}
      {/* Why Choose Us */}
      <section className="bg-white py-20 md:py-28">
        {/* Why Choose ECA — redesigned */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#1B9AAA] text-xs font-bold tracking-[0.3em] uppercase mb-3">Why ECA</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight">Built for Your Success</h2>
            <div className="w-12 h-1 bg-[#1B9AAA] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Industry-Aligned Curriculum",
                desc: "Programs designed with employer input to prepare you for real jobs.",
                num: "01",
                icon: <svg className="w-6 h-6 text-[#1B9AAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              },
              {
                title: "Hands-on Learning",
                desc: "Laboratories, simulations, and internships for practical experience.",
                num: "02",
                icon: <svg className="w-6 h-6 text-[#1B9AAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              },
              {
                title: "Supportive Community",
                desc: "Advising and mentoring to help you succeed from day one.",
                num: "03",
                icon: <svg className="w-6 h-6 text-[#1B9AAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              },
              {
                title: "Affordable Tuition",
                desc: "Scholarships and flexible payment options available.",
                num: "04",
                icon: <svg className="w-6 h-6 text-[#1B9AAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              },
            ].map((item) => (
              <div key={item.num} className="group relative bg-white rounded-xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 overflow-hidden">
                <span className="absolute -top-3 -right-1 text-8xl font-black text-[#1B9AAA]/5 select-none leading-none">{item.num}</span>
                <div className="w-12 h-12 rounded-lg bg-[#1B9AAA]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="w-8 h-0.5 bg-[#1B9AAA] rounded-full mb-4" />
                <h3 className="font-black text-[#0D1B2A] text-base mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1B9AAA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0a2a3a 60%, #0D1B2A 100%)" }}>
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1B9AAA]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#1B9AAA]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#1B9AAA] text-xs font-bold tracking-[0.3em] uppercase mb-3">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">What Our Students Say</h2>
            <div className="w-12 h-1 bg-[#1B9AAA] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "The hands-on training at ECA prepared me for my first job immediately after graduation.", author: "Alumni", program: "BS Nursing", initial: "A" },
              { quote: "Professors truly care about our success and the curriculum matches industry needs.", author: "Student", program: "BS Information System", initial: "S" },
              { quote: "Affordable tuition and scholarships made quality education possible for me.", author: "Parent", program: "ECA Student", initial: "P" },
            ].map((t, i) => (
              <blockquote key={i} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#1B9AAA]/40 rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <span className="absolute top-4 right-6 text-7xl font-black text-white/5 leading-none select-none">"</span>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-[#1B9AAA]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 text-base leading-relaxed mb-8 italic">"{t.quote}"</p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1B9AAA]/30 border border-[#1B9AAA]/50 flex items-center justify-center text-white font-black text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.author}</p>
                    <p className="text-white/40 text-xs">{t.program}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
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
