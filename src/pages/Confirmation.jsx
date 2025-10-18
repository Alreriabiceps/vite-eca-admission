import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B9AAA' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <svg
              className="h-10 w-10 text-white"
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
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Application Submitted Successfully!
          </h1>
          <div className="w-20 h-1 bg-[#1B9AAA] mx-auto rounded-full mb-6"></div>

          <p className="text-lg text-[#F5F7FA] mb-8">
            Your application has been submitted successfully. Please wait for
            further processing.
          </p>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-[#1B9AAA] hover:text-[#158A9A] text-sm font-medium transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
