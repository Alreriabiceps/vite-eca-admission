import { useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const AdminResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const isTokenValid = useMemo(() => token && email, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.newPassword || !form.confirmPassword) {
      setStatus({
        type: "error",
        message: "Please provide and confirm your new password.",
      });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setStatus({
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/auth/reset-password", {
        email,
        token,
        newPassword: form.newPassword,
      });

      setStatus({
        type: "success",
        message: "Password updated successfully. Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to reset password. Please request a new link.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] px-4">
        <div className="max-w-md w-full bg-white/95 rounded-2xl shadow-xl border border-[#1B9AAA]/30 p-8 text-center">
          <h1 className="text-2xl font-bold text-[#0D1B2A] mb-3">
            Invalid Reset Link
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            This password reset link is missing required information or has
            expired. Please request a new reset email.
          </p>
          <Link
            to="/admin/forgot-password"
            className="inline-block px-4 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#158A9A] transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] px-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#1B9AAA]/30 p-8">
        <h1 className="text-2xl font-bold text-[#0D1B2A] text-center mb-2">
          Set a New Password
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter a new password for the admin account <strong>{email}</strong>.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, newPassword: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
              required
              minLength={6}
            />
          </div>

          {status.message && (
            <p
              className={`text-sm ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0D1B2A] text-white font-semibold py-3 rounded-lg shadow hover:shadow-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/admin/login"
            className="text-sm text-[#1B9AAA] hover:text-[#158A9A] font-medium"
          >
            Back to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminResetPassword;









