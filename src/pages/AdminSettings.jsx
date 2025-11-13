import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AdminHeader from "../components/AdminHeader";

const initialEmailState = {
  email: "",
  currentPassword: "",
};

const initialPasswordState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const AdminSettings = () => {
  const { admin, refreshAdmin } = useAuth();
  const [emailForm, setEmailForm] = useState(initialEmailState);
  const [passwordForm, setPasswordForm] = useState(initialPasswordState);
  const [emailStatus, setEmailStatus] = useState({ type: "", message: "" });
  const [passwordStatus, setPasswordStatus] = useState({
    type: "",
    message: "",
  });
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (admin?.email) {
      setEmailForm((prev) => ({ ...prev, email: admin.email }));
    }
  }, [admin]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailStatus({ type: "", message: "" });

    if (!emailForm.email || !emailForm.currentPassword) {
      setEmailStatus({
        type: "error",
        message: "Please provide the new email and your current password.",
      });
      return;
    }

    setEmailLoading(true);
    try {
      await axios.patch("/api/auth/me/profile", {
        email: emailForm.email,
        currentPassword: emailForm.currentPassword,
      });
      await refreshAdmin();
      setEmailStatus({
        type: "success",
        message: "Email updated successfully.",
      });
      setEmailForm((prev) => ({ ...prev, currentPassword: "" }));
    } catch (error) {
      setEmailStatus({
        type: "error",
        message:
          error.response?.data?.message || "Failed to update email. Try again.",
      });
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus({ type: "", message: "" });

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordStatus({
        type: "error",
        message: "Please fill in all password fields.",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({
        type: "error",
        message: "New password and confirmation do not match.",
      });
      return;
    }

    setPasswordLoading(true);
    try {
      await axios.patch("/api/auth/me/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordStatus({
        type: "success",
        message: "Password updated successfully.",
      });
      setPasswordForm(initialPasswordState);
    } catch (error) {
      setPasswordStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to update password. Try again.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A]">
      <AdminHeader />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-[#1B9AAA]/20 mb-6">
          <h1 className="text-2xl font-bold text-[#0D1B2A]">
            Account Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Update your admin email and password. For security, changes require
            your current password.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#1B9AAA]/20 p-6">
            <h2 className="text-lg font-semibold text-[#0D1B2A] mb-4">
              Update Email
            </h2>
            <form className="space-y-4" onSubmit={handleEmailSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailForm.email}
                  onChange={(e) =>
                    setEmailForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={emailForm.currentPassword}
                  onChange={(e) =>
                    setEmailForm((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                  required
                />
              </div>
              {emailStatus.message && (
                <p
                  className={`text-sm ${
                    emailStatus.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {emailStatus.message}
                </p>
              )}
              <button
                type="submit"
                disabled={emailLoading}
                className="px-5 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#158A9A] transition-colors disabled:opacity-50"
              >
                {emailLoading ? "Updating..." : "Update Email"}
              </button>
            </form>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#1B9AAA]/20 p-6">
            <h2 className="text-lg font-semibold text-[#0D1B2A] mb-4">
              Change Password
            </h2>
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
                  required
                />
              </div>
              {passwordStatus.message && (
                <p
                  className={`text-sm ${
                    passwordStatus.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {passwordStatus.message}
                </p>
              )}
              <button
                type="submit"
                disabled={passwordLoading}
                className="px-5 py-2 bg-[#0D1B2A] text-white rounded-lg hover:bg-[#11263a] transition-colors disabled:opacity-50"
              >
                {passwordLoading ? "Updating..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;


