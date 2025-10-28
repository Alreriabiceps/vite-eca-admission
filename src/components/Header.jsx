import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#0D1B2A] text-white">
      {/* Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center">
          {/* Left Side - Logo and University Info (Clickable) */}
          <Link
            to="/"
            className="flex items-center flex-1 hover:opacity-90 transition-opacity duration-200"
          >
            <div className="flex-shrink-0 mr-6">
              <img
                src="/logo na pogi.png"
                alt="Exact Colleges of Asia Logo"
                className="h-16 w-16 object-contain"
              />
            </div>

            {/* Center-Left - University Info */}
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
                EXACT COLLEGES OF ASIA
              </h1>
              <p className="text-sm text-[#F5F7FA]">Suclayin Arayat Pampanga</p>
            </div>
          </Link>

          {/* Right Side - CTA removed per request */}
        </div>
      </div>
    </div>
  );
};

export default Header;
