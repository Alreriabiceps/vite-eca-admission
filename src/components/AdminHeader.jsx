import { useAuth } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const navLinkClasses = (path) =>
    `group relative px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive(path)
        ? "bg-white/20 text-white shadow-lg"
        : "text-[#F5F7FA]/90 hover:text-white hover:bg-white/10"
    }`;

  const indicatorClasses = (path) =>
    `absolute bottom-0 left-0 w-full h-0.5 bg-[#1B9AAA] transform transition-transform duration-300 ${
      isActive(path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    }`;

  return (
    <header className="bg-gradient-to-r from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] shadow-2xl border-b border-[#1B9AAA]/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Left Side - Logo and Title */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-14 w-14 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-[#1B9AAA]/20">
                <svg
                  className="h-8 w-8 text-white"
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
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-[#F5F7FA]/80 text-sm font-medium">
                Student Admission Management System
              </p>
            </div>
          </div>

          {/* Right Side - Navigation, User Info and Logout */}
          <div className="flex items-center space-x-2">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 mr-6">
              <Link
                to="/admin/dashboard"
                className={navLinkClasses("/admin/dashboard")}
              >
                <span className="flex items-center space-x-2">
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
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                    />
                  </svg>
                  <span className="font-medium">Admission</span>
                </span>
                <div className={indicatorClasses("/admin/dashboard")}></div>
              </Link>
              <Link
                to="/admin/backup"
                className={navLinkClasses("/admin/backup")}
              >
                <span className="flex items-center space-x-2">
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <span className="font-medium">Backup</span>
                </span>
                <div className={indicatorClasses("/admin/backup")}></div>
              </Link>
              <Link
                to="/admin/archives"
                className={navLinkClasses("/admin/archives")}
              >
                <span className="flex items-center space-x-2">
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
                      d="M5 8l4 4m0 0l4-4m-4 4V3m6 5v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8"
                    />
                  </svg>
                  <span className="font-medium">Archives</span>
                </span>
                <div className={indicatorClasses("/admin/archives")}></div>
              </Link>
              <Link
                to="/admin/analytics"
                className={navLinkClasses("/admin/analytics")}
              >
                <span className="flex items-center space-x-2">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span className="font-medium">Analytics</span>
                </span>
                <div className={indicatorClasses("/admin/analytics")}></div>
              </Link>
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/settings")}
                className="hidden sm:flex items-center space-x-3 text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs text-[#F5F7FA]/60 font-medium">
                    Welcome back,
                  </p>
                  <p className="text-sm font-semibold text-white truncate max-w-32">
                    {admin?.email}
                  </p>
                </div>
                <div className="h-10 w-10 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <span className="text-white font-semibold text-sm">
                    {admin?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </button>

              <button
                onClick={() => navigate("/admin/settings")}
                className="sm:hidden flex items-center justify-center h-10 w-10 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-full shadow-lg ring-2 ring-white/20 text-white font-semibold text-sm hover:scale-105 transition-transform"
                title="Settings"
              >
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
                    d="M12 6V4m0 16v-2m8-6h2M4 12H2m15.364-7.364L18.5 4.5M5.5 19.5l1.136-1.136M18.5 19.5l-1.136-1.136M5.5 4.5l1.136 1.136"
                  />
                </svg>
              </button>

              <button
                onClick={logout}
                className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
              >
                <span className="flex items-center space-x-2">
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </span>
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
