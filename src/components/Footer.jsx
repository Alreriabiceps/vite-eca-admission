const Footer = () => {
  return (
    <footer className="bg-[#0D1B2A] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Left Section - Logo and University Name */}
          <div className="flex items-start space-x-4">
            <img
              src="/logo na pogi.png"
              alt="Exact Colleges of Asia Logo"
              className="h-12 w-12 object-contain flex-shrink-0"
            />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                EXACT COLLEGES OF ASIA
              </h3>
              <p className="text-sm text-[#F5F7FA]">Suclayin Arayat Pampanga</p>
            </div>
          </div>

          {/* Middle Section - Contact Information */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white mb-2">
              Contact Information
            </h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 text-[#1B9AAA] flex-shrink-0"
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
                <span className="text-sm text-[#F5F7FA]">
                  Suclayin, Arayat, Pampanga, Philippines
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 text-[#1B9AAA] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-[#F5F7FA]">
                  info@exactcolleges.edu.ph
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 text-[#1B9AAA] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm text-[#F5F7FA]">(045) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 text-[#1B9AAA] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                <span className="text-sm text-[#F5F7FA]">
                  @ExactCollegesAsia
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Quick Links
            </h4>
            <div className="space-y-1">
              <a
                href="/"
                className="block text-sm text-[#F5F7FA] hover:text-[#1B9AAA] transition-colors"
              >
                Home
              </a>
              <a
                href="/application"
                className="block text-sm text-[#F5F7FA] hover:text-[#1B9AAA] transition-colors"
              >
                Admission
              </a>
              <a
                href="/admin/login"
                className="block text-sm text-[#F5F7FA] hover:text-[#1B9AAA] transition-colors"
              >
                Admin Portal
              </a>
              <a
                href="#"
                className="block text-sm text-[#F5F7FA] hover:text-[#1B9AAA] transition-colors"
              >
                Programs
              </a>
              <a
                href="#"
                className="block text-sm text-[#F5F7FA] hover:text-[#1B9AAA] transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-sm text-[#F5F7FA] hover:text-[#1B9AAA] transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#343A40] pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-[#F5F7FA] mb-4 md:mb-0">
            © 2024 Exact Colleges of Asia. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-[#F5F7FA]">
              Admission Management System (AMS)
            </span>
            <button className="bg-[#1B9AAA] hover:bg-[#158A9A] text-white p-2 rounded transition-colors">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
