import { useParams, Link } from "react-router-dom";

const CourseDetails = () => {
  const { courseSlug } = useParams();

  // Course data with detailed information
  const courseData = {
    "marine-transportation": {
      title: "Bachelor of Science in Marine Transportation",
      shortTitle: "Marine Transportation",
      college: "College of Maritime Education",
      logo: "/logo/maritime.png",
      description:
        "Prepare for a career at sea with our comprehensive Marine Transportation program. Students learn navigation, ship operations, maritime law, and safety procedures essential for maritime careers.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Ship Captain",
        "Marine Officer",
        "Port Operations Manager",
        "Maritime Safety Inspector",
        "Navigation Officer",
        "Maritime Consultant",
      ],
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
        "Marine Engineering Basics",
        "International Maritime Conventions",
      ],
    },
    "marine-engineering": {
      title: "Bachelor of Science in Marine Engineering",
      shortTitle: "Marine Engineering",
      college: "College of Maritime Education",
      logo: "/logo/maritime.png",
      description:
        "Master the technical aspects of ship operations and marine technology. This program covers marine propulsion systems, electrical systems, and ship maintenance essential for marine engineering careers.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Marine Engineer",
        "Ship Engineer",
        "Marine Surveyor",
        "Port Engineer",
        "Marine Equipment Specialist",
        "Maritime Technical Consultant",
      ],
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
        "Marine Automation",
        "Marine Maintenance",
      ],
    },
    nursing: {
      title: "Bachelor of Science in Nursing",
      shortTitle: "Nursing",
      college: "College of Nursing",
      logo: "/logo/nurse.png",
      description:
        "Develop compassionate care skills and medical knowledge to serve communities as professional nurses. Our program combines theoretical learning with extensive clinical practice.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Registered Nurse",
        "Nurse Educator",
        "Public Health Nurse",
        "Nurse Administrator",
        "Clinical Nurse Specialist",
        "Nurse Researcher",
      ],
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
        "Nursing Leadership",
        "Clinical Practice",
      ],
    },
    "early-childhood-education": {
      title: "Bachelor of Early Childhood Education",
      shortTitle: "Early Childhood Education",
      college: "College of Education",
      logo: "/logo/educ.png",
      description:
        "Shape young minds and build the foundation for lifelong learning. This program prepares educators to work with children from birth to age 8, focusing on developmental needs and educational strategies.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Preschool Teacher",
        "Kindergarten Teacher",
        "Child Development Specialist",
        "Early Childhood Program Director",
        "Educational Consultant",
        "Childcare Center Administrator",
      ],
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
        "Special Needs Education",
        "Educational Technology",
      ],
    },
    "technical-vocational-teacher": {
      title:
        "Bachelor of Technical-Vocational Teacher Education (Major in Food and Service Management)",
      shortTitle: "Technical-Vocational Teacher Education",
      college: "College of Education",
      logo: "/logo/educ.png",
      description:
        "Train future technical-vocational educators specializing in food and service management. This program combines culinary arts education with teaching methodologies for technical-vocational schools.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Technical-Vocational Teacher",
        "Culinary Arts Instructor",
        "Food Service Manager",
        "Restaurant Operations Manager",
        "Hospitality Educator",
        "Culinary Consultant",
      ],
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
        "Hospitality Management",
        "Educational Assessment",
      ],
    },
    entrepreneurship: {
      title: "Bachelor of Science in Entrepreneurship",
      shortTitle: "Entrepreneurship",
      college: "College of Business Administration",
      logo: "/logo/business admin.png",
      description:
        "Develop the skills and mindset to start and manage successful businesses. This program covers business planning, financial management, marketing, and innovation strategies for aspiring entrepreneurs.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Business Owner",
        "Startup Founder",
        "Business Consultant",
        "Innovation Manager",
        "Venture Capitalist",
        "Business Development Manager",
      ],
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
        "Digital Entrepreneurship",
        "Business Ethics",
      ],
    },
    "management-accounting": {
      title: "Bachelor of Science in Management Accounting",
      shortTitle: "Management Accounting",
      college: "College of Business Administration",
      logo: "/logo/business admin.png",
      description:
        "Master financial analysis and management accounting principles to support business decision-making. This program focuses on cost analysis, budgeting, and financial reporting for organizations.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Management Accountant",
        "Financial Analyst",
        "Cost Accountant",
        "Budget Analyst",
        "Financial Controller",
        "Business Analyst",
      ],
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
        "Auditing",
        "Business Statistics",
      ],
    },
    "information-system": {
      title: "Bachelor of Science in Information System",
      shortTitle: "Information System",
      college: "College of Information Technology",
      logo: "/logo/information system.png",
      description:
        "Design and manage information systems that support business operations. This program combines business knowledge with technical skills to create efficient and effective information solutions.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Systems Analyst",
        "IT Consultant",
        "Database Administrator",
        "Business Analyst",
        "IT Project Manager",
        "Information Systems Manager",
      ],
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
        "Business Process Management",
        "Information Security",
      ],
    },
    "tourism-management": {
      title: "Bachelor of Science in Tourism Management",
      shortTitle: "Tourism Management",
      college: "College of Tourism",
      logo: "/logo/tourism.png",
      description:
        "Explore the dynamic world of tourism and hospitality. This program prepares students for careers in travel, hospitality, and tourism management with focus on customer service and destination marketing.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Tourism Manager",
        "Travel Agent",
        "Hotel Manager",
        "Event Coordinator",
        "Destination Marketing Manager",
        "Tourism Consultant",
      ],
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
        "Sustainable Tourism",
        "Tourism Law and Ethics",
      ],
    },
    criminology: {
      title: "Bachelor of Science in Criminology",
      shortTitle: "Criminology",
      college: "College of Criminology",
      logo: "/logo/crime.png",
      description:
        "Study crime, criminal behavior, and the criminal justice system. This program provides comprehensive knowledge of law enforcement, criminal investigation, and crime prevention strategies.",
      duration: "4 years",
      units: "160+ units",
      careerOpportunities: [
        "Police Officer",
        "Criminal Investigator",
        "Probation Officer",
        "Security Manager",
        "Crime Analyst",
        "Law Enforcement Administrator",
      ],
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
        "Juvenile Delinquency",
        "Crime Prevention",
      ],
    },
  };

  const course = courseData[courseSlug];

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Course Not Found
            </h1>
            <p className="text-gray-300 mb-6">
              The course you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg hover:bg-[#158A9A] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#1B9AAA]/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 p-2">
              <img
                src={course.logo}
                alt={`${course.shortTitle} logo`}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#0D1B2A] mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-[#1B9AAA] font-semibold mb-2">
                {course.college}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Duration: {course.duration}
                </span>
                <span className="flex items-center gap-2">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Units: {course.units}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to="/application"
                className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg hover:bg-[#158A9A] transition-colors font-semibold"
              >
                Apply Now
              </Link>
              <Link
                to="/"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Back to Programs
              </Link>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-[#1B9AAA]/20 p-6">
              <h2 className="text-2xl font-bold text-[#0D1B2A] mb-4">
                Program Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Curriculum */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-[#1B9AAA]/20 p-6">
              <h2 className="text-2xl font-bold text-[#0D1B2A] mb-4">
                Curriculum Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.curriculum.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-[#1B9AAA]/5 rounded-lg"
                  >
                    <div className="h-2 w-2 bg-[#1B9AAA] rounded-full"></div>
                    <span className="text-gray-700">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Requirements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-[#1B9AAA]/20 p-6">
              <h3 className="text-xl font-bold text-[#0D1B2A] mb-4">
                Admission Requirements
              </h3>
              <ul className="space-y-2">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#1B9AAA] mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Opportunities */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-[#1B9AAA]/20 p-6">
              <h3 className="text-xl font-bold text-[#0D1B2A] mb-4">
                Career Opportunities
              </h3>
              <ul className="space-y-2">
                {course.careerOpportunities.map((career, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{career}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Now CTA */}
            <div className="bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">
                Ready to Start Your Journey?
              </h3>
              <p className="text-sm mb-4 opacity-90">
                Join thousands of students who have chosen ECA for their
                education.
              </p>
              <Link
                to="/application"
                className="block w-full bg-white text-[#1B9AAA] text-center py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
