import LogoCarousel from "../components/LogoCarousel";

const Hero = () => {
  return (
    <div className="min-h-screen">
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
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-white">
              Available Programs
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#1B9AAA] mx-auto rounded-full mb-2 sm:mb-3"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto px-2">
              Choose from our comprehensive range of undergraduate programs
              designed for professional success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {/* College of Maritime Education */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B9AAA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.21 15.89A8 8 0 0 1 5.21 3.89M12 2v20m-8-8h16"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mb-1 truncate">
                      Maritime Education
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1B9AAA] font-medium truncate">
                      College of Maritime
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Marine Transportation
                  </div>
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Marine Engineering
                  </div>
                </div>
              </div>
            </div>

            {/* College of Nursing */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B9AAA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mb-1 truncate">
                      Nursing
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1B9AAA] font-medium truncate">
                      College of Nursing
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Bachelor of Science in Nursing
                  </div>
                </div>
              </div>
            </div>

            {/* College of Education */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B9AAA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mb-1 truncate">
                      Education
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1B9AAA] font-medium truncate">
                      College of Education
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Early Childhood Education
                  </div>
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Technical-Vocational Teacher Education
                  </div>
                </div>
              </div>
            </div>

            {/* College of Business Administration */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B9AAA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mb-1 truncate">
                      Business Administration
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1B9AAA] font-medium truncate">
                      College of Business
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Entrepreneurship
                  </div>
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Management Accounting
                  </div>
                </div>
              </div>
            </div>

            {/* College of Information System */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B9AAA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mb-1 truncate">
                      Information System
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1B9AAA] font-medium truncate">
                      College of IT
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Bachelor of Science in Information System
                  </div>
                </div>
              </div>
            </div>

            {/* College of Tourism Management */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B9AAA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mb-1 truncate">
                      Tourism Management
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1B9AAA] font-medium truncate">
                      College of Tourism
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Bachelor of Science in Tourism Management
                  </div>
                </div>
              </div>
            </div>

            {/* College of Criminal Justice Education */}
            <div className="group relative bg-gradient-to-br from-white to-[#F5F7FA] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B9AAA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] mb-1 truncate">
                      Criminal Justice Education
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1B9AAA] font-medium truncate">
                      College of Criminology
                    </p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-[#1B9AAA]/10 text-[#0D1B2A] py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-l-4 border-[#1B9AAA]">
                    Bachelor of Science in Criminology
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Carousel Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
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
