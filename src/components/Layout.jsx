import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // Don't show Header and Footer on admin pages except login
  const isAdminPage = location.pathname.startsWith("/admin");
  const isAdminLogin = location.pathname === "/admin/login";
  const isAdminDashboard = location.pathname === "/admin/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1B2A]">
      {!isAdminPage && <Header />}
      {isAdminLogin && (
        <div className="bg-[#0D1B2A] text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-lg flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
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
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Login</h1>
                  <p className="text-sm text-[#F5F7FA]">
                    Student Admission Management System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1">{children}</div>
      {!isAdminDashboard && <Footer />}
    </div>
  );
};

export default Layout;
