import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!email) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/request-password-reset", {
        email,
      });
      setStatus({
        type: "success",
        message:
          response.data.message ||
          "If this email is registered, a reset link has been sent.",
      });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to send reset email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] px-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#1B9AAA]/30 p-8">
        <h1 className="text-2xl font-bold text-[#0D1B2A] text-center mb-2">
          Reset Admin Password
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the admin email address. If it exists, we'll send a reset link.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] transition"
              placeholder="admin@example.com"
              required
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
            className="w-full bg-gradient-to-r from-[#1B9AAA] to-[#158A9A] text-white font-semibold py-3 rounded-lg shadow hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
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

export default AdminForgotPassword;









