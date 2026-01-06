import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B9AAA' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-md w-full space-y-6 relative z-10 mx-auto">
        {/* Logo / Title */}
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg mb-3">
            <img
              src="/logo na pogi.png"
              alt="Exact Colleges of Asia Logo"
              className="h-12 w-12 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Admin Sign In
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Secure access to the Admission Management System
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-7">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#0D1B2A]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F7FA] border-2 border-[#E5E7EB] rounded-xl text-[#0D1B2A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#0D1B2A]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F7FA] border-2 border-[#E5E7EB] rounded-xl text-[#0D1B2A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/admin/forgot-password"
                className="text-sm text-[#1B9AAA] hover:text-[#158A9A] font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#1B9AAA] to-[#158A9A] hover:from-[#158A9A] hover:to-[#1B9AAA] text-white font-semibold py-3 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Navigation */}
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
  );
};

export default AdminLogin;
