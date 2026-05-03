import LogoCarousel from "../components/LogoCarousel";
import CoursesCarousel from "../components/CoursesCarousel";
import CourseModal from "../components/CourseModal";
import ProgramsShowcase from "../components/ProgramsShowcase";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  // removed modal state for news; using dedicated page

  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroLogoRef = useRef(null);
  const heroTagRef = useRef(null);
  const heroH1Ref = useRef(null);
  const heroSubRef = useRef(null);
  const heroCTARef = useRef(null);
  const heroStatsRef = useRef(null);
  const heroScrollRef = useRef(null);
  const heroPillsRef = useRef(null); // unused, kept to avoid GSAP ref error
  const heroWordRef = useRef(null);
  const [heroWord, setHeroWord] = useState("Excellence");

  useEffect(() => {
    setIsVisible(true);

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(heroBgRef.current,
      { scale: 1.08 },
      { scale: 1, duration: 1.8, ease: "power3.out" }
    )
    .fromTo(heroLogoRef.current,
      { opacity: 0, y: -30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
      "-=1.2"
    )
    .fromTo(heroTagRef.current,
      { opacity: 0, y: 20, letterSpacing: "0.6em" },
      { opacity: 1, y: 0, letterSpacing: "0.35em", duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(heroH1Ref.current,
      { opacity: 0, y: 40, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "expo.out" },
      "-=0.3"
    )
    .fromTo(heroSubRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(heroCTARef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(heroStatsRef.current?.children ?? [],
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" },
      "-=0.2"
    )
    .fromTo(heroScrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      "-=0.1"
    )
    ;

    // cycle hero word
    const words = ["Excellence", "Innovation", "Leadership", "Purpose"];
    let wi = 0;
    const wordInterval = setInterval(() => {
      wi = (wi + 1) % words.length;
      if (heroWordRef.current) {
        gsap.to(heroWordRef.current, { opacity: 0, y: -10, duration: 0.25, ease: "power2.in", onComplete: () => {
          setHeroWord(words[wi]);
          gsap.fromTo(heroWordRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
        }});
      }
    }, 2800);

    // parallax on mouse move
    const hero = heroRef.current;
    const bg = heroBgRef.current;
    const onMove = (e) => {
      const rx = (e.clientX / window.innerWidth - 0.5) * 18;
      const ry = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(bg, { x: rx, y: ry, duration: 1.2, ease: "power1.out" });
    };
    hero?.addEventListener("mousemove", onMove);
    return () => {
      hero?.removeEventListener("mousemove", onMove);
      clearInterval(wordInterval);
    };
  }, []);
  // Course data with individual course information
  const courses = [
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
        badgeText: "#060d1e",
        tagBg: "rgba(29, 78, 216, 0.15)",
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
    <div className="min-h-screen" style={{ background: "#060d1e" }}>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "100vh", minHeight: 600 }}
      >
        {/* BG image — scale-animated, parallax */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url("/bg.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            transformOrigin: "center center",
          }}
        />

        {/* layered overlays — cinematic grade */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,10,22,0.92) 0%, rgba(4,10,22,0.72) 50%, rgba(4,10,22,0.25) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,10,22,1) 0%, transparent 40%)" }} />

        {/* noise grain texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

        {/* accent light — top-left glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(26,79,214,0.18) 0%, transparent 70%)" }} />

        {/* ghost watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          <span style={{
            fontSize: "clamp(180px,28vw,340px)", fontWeight: 900, lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(26,79,214,0.09)",
            letterSpacing: "-0.05em", userSelect: "none",
            whiteSpace: "nowrap",
          }}>ECA</span>
        </div>

        {/* vertical right-side text */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-none" style={{ zIndex: 5 }}>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, rgba(26,79,214,0.5))" }} />
          <span style={{
            writingMode: "vertical-rl", textOrientation: "mixed",
            fontSize: 9, fontWeight: 800, letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
          }}>Exact Colleges of Asia · Arayat · Pampanga</span>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to top, transparent, rgba(26,79,214,0.5))" }} />
        </div>

        {/* content */}
        <div className="relative z-10 h-full flex flex-col justify-center mx-auto" style={{ width: "85%", maxWidth: 1400 }}>
          <div className="max-w-2xl">

            {/* logo + college name row */}
            <div ref={heroLogoRef} className="flex items-center gap-4 mb-7" style={{ opacity: 0 }}>
              <img src="/logo na pogi.png" alt="ECA" style={{ width: 64, height: 64, filter: "drop-shadow(0 0 18px rgba(26,79,214,0.7))" }} />
              <div>
                <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: "#1a4fd6", textTransform: "uppercase" }}>Exact Colleges of Asia</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.08em" }}>Arayat, Pampanga · Est. 2011</p>
              </div>
            </div>

            {/* eyebrow tag */}
            <div ref={heroTagRef} style={{ opacity: 0 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 9, fontWeight: 900, letterSpacing: "0.35em", textTransform: "uppercase",
                color: "#1a4fd6", marginBottom: 16,
              }}>
                <span style={{ width: 28, height: 1.5, background: "#1a4fd6", display: "inline-block" }} />
                The Road to Academic Excellence
                <span style={{ width: 28, height: 1.5, background: "#1a4fd6", display: "inline-block" }} />
              </span>
            </div>

            {/* headline */}
            <h1
              ref={heroH1Ref}
              style={{ opacity: 0, fontSize: "clamp(2.4rem,5.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.08, color: "#fff", letterSpacing: "-0.02em", marginBottom: 20 }}
            >
              A Journey of<br />
              <span ref={heroWordRef} style={{ color: "#1a4fd6", display: "inline-block" }}>{heroWord}</span>
              <span style={{ color: "rgba(255,255,255,0.15)" }}> &amp;</span><br />
              <span style={{ fontSize: "0.62em", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>Welcome Aboard — The Road to Academic Excellence.</span>
            </h1>

            {/* sub */}
            <p
              ref={heroSubRef}
              style={{ opacity: 0, fontSize: "clamp(0.88rem,1.5vw,1.05rem)", color: "rgba(255,255,255,0.58)", lineHeight: 1.8, marginBottom: 28, maxWidth: 460 }}
            >
              Exact Colleges of Asia shapes driven students into licensed professionals — through world-class faculty, hands-on training, and a campus built like no other.
            </p>

            {/* CTAs */}
            <div ref={heroCTARef} className="flex flex-wrap gap-4" style={{ opacity: 0, marginBottom: 48 }}>
              <Link
                to="/application"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "linear-gradient(135deg,#1a4fd6,#0f2d8a)",
                  color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: "0.04em",
                  padding: "14px 32px",
                  boxShadow: "0 0 32px rgba(26,79,214,0.45), 0 4px 16px rgba(0,0,0,0.4)",
                  textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 44px rgba(26,79,214,0.6), 0 8px 24px rgba(0,0,0,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 32px rgba(26,79,214,0.45), 0 4px 16px rgba(0,0,0,0.4)"; }}
              >
                <svg style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                Apply Now
              </Link>
              <a
                href="#programs"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "transparent",
                  color: "rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 14,
                  padding: "14px 32px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a4fd6"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                <svg style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                Explore Programs
              </a>
            </div>

            {/* stat row — inline, clean divider */}
            <div ref={heroStatsRef} style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28 }}>
              {[
                { label: "Programs",          value: "10+" },
                { label: "Years of Excellence", value: "14+" },
                { label: "Graduates",         value: "5,000+" },
                { label: "CHED Accredited",   value: "✓" },
              ].map((s, i) => (
                <div key={s.label} style={{
                  opacity: 0, flex: 1, paddingRight: 24,
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  paddingLeft: i > 0 ? 24 : 0,
                }}>
                  <p style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", margin: "5px 0 0", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* bottom marquee strip */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ zIndex: 6, height: 32, borderTop: "1px solid rgba(26,79,214,0.12)" }}>
            <div style={{
              display: "flex", gap: 48, whiteSpace: "nowrap",
              animation: "marquee 28s linear infinite",
              fontSize: 9, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase",
              color: "rgba(26,79,214,0.45)", lineHeight: "32px", paddingLeft: "100%",
            }}>
              {Array(4).fill("Exact Colleges of Asia  ·  The Road to Academic Excellence  ·  Arayat, Pampanga  ·  Est. 2011  ·  CHED Accredited  ·  Welcome Aboard").map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>

          {/* scroll cue */}
          <div ref={heroScrollRef} className="absolute bottom-10 right-16 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
            <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>Scroll</span>
            <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(26,79,214,0.8), transparent)" }} />
          </div>
        </div>

        {/* bottom edge fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #060d1e)" }} />
      </section>
      {/* Available Programs Section — sticky scroll container */}
      {/* tall wrapper = 100vh per course so natural page scroll steps through each */}
      <div
        id="programs-scroll-container"
        style={{ height: `${courses.length * 100}vh`, position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh" }}>
          <ProgramsShowcase
            courses={courses}
            scrollContainerId="programs-scroll-container"
            onCourseClick={(index) => {
              setSelectedCourseIndex(index);
              setShowCourseModal(true);
            }}
          />
        </div>
      </div>

      {/* ── ABOUT US ── */}
      <section id="about-section" style={{ background: "#060d1e", position: "relative", overflow: "hidden", padding: "100px 0" }}>

        <div style={{
          position: "absolute", right: "-6%", top: "50%", transform: "translateY(-50%)",
          fontSize: "clamp(280px,38vw,520px)", fontWeight: 900, lineHeight: 1,
          color: "transparent", WebkitTextStroke: "1px rgba(26,79,214,0.06)",
          userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em", whiteSpace: "nowrap",
        }}>ECA</div>
        <div style={{ position:"absolute", top:-120, left:-120, width:500, height:500, background:"radial-gradient(circle,rgba(26,79,214,0.12) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-80, right:80, width:400, height:400, background:"radial-gradient(circle,rgba(26,79,214,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />

        <div style={{ width:"85%", margin:"0 auto", position:"relative", zIndex:2 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:56 }}>
            <div style={{ width:36, height:2, background:"#1a4fd6" }} />
            <span style={{ fontSize:10, fontWeight:900, letterSpacing:"0.4em", textTransform:"uppercase", color:"#1a4fd6" }}>Who We Are</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
            <div>
              <h2 style={{ fontSize:"clamp(2.2rem,4.5vw,3.6rem)", fontWeight:900, lineHeight:1.05, color:"#fff", letterSpacing:"-0.02em", marginBottom:40 }}>
                Shaping<br />
                <span style={{ color:"#1a4fd6" }}>Maritime</span><br />
                Professionals<br />
                <span style={{ fontSize:"0.5em", fontWeight:700, color:"rgba(255,255,255,0.35)", letterSpacing:"0.05em" }}>— and Beyond.</span>
              </h2>
              <div style={{ position:"relative" }}>
                <img src="/bg.jpg" alt="Exact Colleges of Asia Campus" style={{ width:"100%", height:300, objectFit:"cover", objectPosition:"center 40%", display:"block" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(4,10,22,0.7) 0%,transparent 60%)" }} />
                <div style={{ position:"absolute", bottom:20, left:20, background:"rgba(4,10,22,0.88)", backdropFilter:"blur(12px)", border:"1px solid rgba(26,79,214,0.3)", padding:"10px 18px", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:3, height:36, background:"#1a4fd6" }} />
                  <div>
                    <p style={{ fontSize:18, fontWeight:900, color:"#fff", margin:0, lineHeight:1 }}>Est. 2011</p>
                    <p style={{ fontSize:10, color:"rgba(255,255,255,0.45)", margin:0, fontWeight:600, letterSpacing:"0.1em" }}>ARAYAT, PAMPANGA</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              <p style={{ fontSize:"clamp(1rem,1.5vw,1.12rem)", color:"rgba(255,255,255,0.72)", lineHeight:1.85, marginBottom:40, fontWeight:400 }}>
                At <strong style={{ color:"#fff", fontWeight:800 }}>Exact Colleges of Asia</strong>, we shape future maritime professionals ready to take on the global stage. Based in Arayat, ECA is known for its strong maritime foundation — developing students with the <em style={{ color:"rgba(255,255,255,0.9)", fontStyle:"normal", fontWeight:700 }}>discipline, technical skills, and real-world training</em> needed to succeed at sea and beyond.
              </p>
              {[
                { num:"01", title:"Industry-Standard Training", body:"Programs built around real maritime standards. From deck to engine, we prepare students to perform with confidence, precision, and leadership in demanding environments.", icon:<svg style={{width:22,height:22}} fill="none" stroke="#1a4fd6" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg> },
                { num:"02", title:"Diverse Programs", body:"Beyond maritime, we offer IT, Business, Education, Criminology, and Hospitality — giving every student a launchpad tailored to their ambition.", icon:<svg style={{width:22,height:22}} fill="none" stroke="#1a4fd6" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg> },
                { num:"03", title:"More Than Education", body:"At ECA, education is more than a path — it's a launch point. We build leaders who meet the realities of the modern world with skill and purpose.", icon:<svg style={{width:22,height:22}} fill="none" stroke="#1a4fd6" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> },
              ].map((card, i) => (
                <div key={card.num} style={{ display:"flex", gap:20, padding:"28px 0", borderTop:"1px solid rgba(255,255,255,0.07)", borderBottom: i===2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ flexShrink:0, width:48, height:48, background:"rgba(26,79,214,0.1)", border:"1px solid rgba(26,79,214,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>{card.icon}</div>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                      <span style={{ fontSize:9, fontWeight:900, color:"rgba(26,79,214,0.5)", letterSpacing:"0.2em" }}>{card.num}</span>
                      <h3 style={{ fontSize:14, fontWeight:800, color:"#fff", margin:0, letterSpacing:"0.02em" }}>{card.title}</h3>
                    </div>
                    <p style={{ fontSize:12, color:"rgba(255,255,255,0.5)", lineHeight:1.75, margin:0 }}>{card.body}</p>
                  </div>
                </div>
              ))}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, marginTop:36, background:"rgba(26,79,214,0.08)", border:"1px solid rgba(26,79,214,0.15)" }}>
                {[{val:"10+",label:"Programs"},{val:"14+",label:"Years Strong"},{val:"5K+",label:"Graduates"}].map(s => (
                  <div key={s.label} style={{ padding:"20px 0", textAlign:"center", background:"rgba(4,10,22,0.6)" }}>
                    <p style={{ fontSize:28, fontWeight:900, color:"#1a4fd6", margin:0, lineHeight:1 }}>{s.val}</p>
                    <p style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.35)", margin:"4px 0 0", letterSpacing:"0.15em", textTransform:"uppercase" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Modal removed; using dedicated page */}
      {/* Why Choose Us */}
      <section id="why-section" className="bg-white py-20 md:py-28">
        {/* Why Choose ECA — redesigned */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#1a4fd6] text-xs font-bold tracking-[0.3em] uppercase mb-3">Why ECA</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#060d1e] tracking-tight">Built for Your Success</h2>
            <div className="w-12 h-1 bg-[#1a4fd6] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Industry-Aligned Curriculum",
                desc: "Programs designed with employer input to prepare you for real jobs.",
                num: "01",
                icon: <svg className="w-6 h-6 text-[#1a4fd6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              },
              {
                title: "Hands-on Learning",
                desc: "Laboratories, simulations, and internships for practical experience.",
                num: "02",
                icon: <svg className="w-6 h-6 text-[#1a4fd6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              },
              {
                title: "Supportive Community",
                desc: "Advising and mentoring to help you succeed from day one.",
                num: "03",
                icon: <svg className="w-6 h-6 text-[#1a4fd6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              },
              {
                title: "Affordable Tuition",
                desc: "Scholarships and flexible payment options available.",
                num: "04",
                icon: <svg className="w-6 h-6 text-[#1a4fd6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              },
            ].map((item) => (
              <div key={item.num} className="group relative bg-white rounded-xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 overflow-hidden">
                <span className="absolute -top-3 -right-1 text-8xl font-black text-[#1a4fd6]/5 select-none leading-none">{item.num}</span>
                <div className="w-12 h-12 rounded-lg bg-[#1a4fd6]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="w-8 h-0.5 bg-[#1a4fd6] rounded-full mb-4" />
                <h3 className="font-black text-[#060d1e] text-base mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1a4fd6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "linear-gradient(135deg, #060d1e 0%, #071530 60%, #060d1e 100%)" }}>
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1a4fd6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#1a4fd6]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#1a4fd6] text-xs font-bold tracking-[0.3em] uppercase mb-3">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">What Our Students Say</h2>
            <div className="w-12 h-1 bg-[#1a4fd6] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "The hands-on training at ECA prepared me for my first job immediately after graduation.", author: "Alumni", program: "BS Nursing", initial: "A" },
              { quote: "Professors truly care about our success and the curriculum matches industry needs.", author: "Student", program: "BS Information System", initial: "S" },
              { quote: "Affordable tuition and scholarships made quality education possible for me.", author: "Parent", program: "ECA Student", initial: "P" },
            ].map((t, i) => (
              <blockquote key={i} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#1a4fd6]/40 rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <span className="absolute top-4 right-6 text-7xl font-black text-white/5 leading-none select-none">"</span>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-[#1a4fd6]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 text-base leading-relaxed mb-8 italic">"{t.quote}"</p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a4fd6]/30 border border-[#1a4fd6]/50 flex items-center justify-center text-white font-black text-sm">
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
      <section id="news-section" className="bg-white py-12 md:py-16" data-section="news">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#060d1e] text-center mb-8">
            News & Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsCards.map((item) => (
              <Link
                key={item.slug}
                to={`/news/${item.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-[#1a4fd6]/20 hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 right-3 bg-white text-[#060d1e] rounded-full p-2 shadow">
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
        className="bg-gradient-to-b from-[#060d1e] to-[#1a2332] py-12 md:py-16"
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#060d1e] mb-3 sm:mb-4">
              Our Departments
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#1a4fd6] mx-auto rounded-full mb-4 sm:mb-6"></div>
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
