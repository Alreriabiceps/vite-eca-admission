import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignaturePad from "react-signature-canvas";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    courseApplied: "",
  });
  const [photo, setPhoto] = useState(null);
  const [signaturePad, setSignaturePad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const courses = [
    // College of Maritime Education
    "Bachelor of Science in Marine Transportation",
    "Bachelor of Science in Marine Engineering",

    // College of Nursing
    "Bachelor of Science in Nursing",

    // College of Education
    "Bachelor of Early Childhood Education",
    "Bachelor of Technical-Vocational Teacher Education (Major in Food and Service Management)",

    // College of Business Administration
    "Bachelor of Science in Entrepreneurship",
    "Bachelor of Science in Management Accounting",

    // College of Information System
    "Bachelor of Science in Information System",

    // College of Tourism Management
    "Bachelor of Science in Tourism Management",

    // College of Criminal Justice Education
    "Bachelor of Science in Criminology",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          photo: "Please select a valid image file",
        }));
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "File size must be less than 5MB",
        }));
        return;
      }

      setPhoto(file);
      setErrors((prev) => ({
        ...prev,
        photo: "",
      }));
    }
  };

  const clearSignature = () => {
    signaturePad.clear();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required";
    if (!formData.courseApplied)
      newErrors.courseApplied = "Please select a course";
    if (!photo) newErrors.photo = "Profile photo is required";
    if (signaturePad?.isEmpty())
      newErrors.signature = "Digital signature is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("courseApplied", formData.courseApplied);
      formDataToSend.append("photo", photo);

      // Convert signature to blob
      const signatureDataURL = signaturePad.toDataURL();
      const signatureBlob = await fetch(signatureDataURL).then((r) => r.blob());
      formDataToSend.append("signature", signatureBlob, "signature.png");

      await axios.post("/api/applications/submit", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 second timeout
      });

      navigate("/confirmation");
    } catch (error) {
      console.error("Submission error:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });

      let errorMessage = "Failed to submit application. Please try again.";
      if (error.code === "ECONNABORTED") {
        errorMessage =
          "Request timed out. Please check your connection and try again.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] text-white relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B9AAA' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="h-20 w-20 bg-gradient-to-br from-[#1B9AAA] to-[#158A9A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Application Form
          </h1>
          <div className="w-20 h-1 bg-[#1B9AAA] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-[#F5F7FA] max-w-2xl mx-auto">
            Complete your application to{" "}
            <span className="text-[#1B9AAA] font-semibold">
              Exact Colleges of Asia
            </span>
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-8 text-center">
            Personal Information
          </h2>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-600 font-medium">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#0D1B2A] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#F5F7FA] border-2 rounded-xl text-[#0D1B2A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent transition-all duration-200 ${
                    errors.name ? "border-[#E63946]" : "border-[#E5E7EB]"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-sm text-[#E63946] font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#0D1B2A] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#F5F7FA] border-2 rounded-xl text-[#0D1B2A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent transition-all duration-200 ${
                    errors.email ? "border-[#E63946]" : "border-[#E5E7EB]"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-[#E63946] font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#0D1B2A] mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#F5F7FA] border-2 rounded-xl text-[#0D1B2A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent transition-all duration-200 ${
                    errors.contact ? "border-[#E63946]" : "border-[#E5E7EB]"
                  }`}
                  placeholder="Enter your contact number"
                />
                {errors.contact && (
                  <p className="text-sm text-[#E63946] font-medium">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#0D1B2A] mb-2">
                  Course Applied For *
                </label>
                <select
                  name="courseApplied"
                  value={formData.courseApplied}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#F5F7FA] border-2 rounded-xl text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent transition-all duration-200 ${
                    errors.courseApplied
                      ? "border-[#E63946]"
                      : "border-[#E5E7EB]"
                  }`}
                >
                  <option value="">Select a course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                {errors.courseApplied && (
                  <p className="text-sm text-[#E63946] font-medium">
                    {errors.courseApplied}
                  </p>
                )}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#0D1B2A] mb-2">
                Profile Photo *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={`w-full px-4 py-3 bg-[#F5F7FA] border-2 rounded-xl text-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA] focus:border-transparent transition-all duration-200 ${
                    errors.photo ? "border-[#E63946]" : "border-[#E5E7EB]"
                  }`}
                />
              </div>
              {errors.photo && (
                <p className="text-sm text-[#E63946] font-medium">
                  {errors.photo}
                </p>
              )}
              {photo && (
                <div className="mt-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-xl border-4 border-[#1B9AAA] shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#1B9AAA] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Digital Signature */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#0D1B2A] mb-2">
                Digital Signature *
              </label>
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 bg-[#F9FAFB] hover:border-[#1B9AAA] transition-colors duration-200">
                <SignaturePad
                  ref={setSignaturePad}
                  canvasProps={{
                    className:
                      "w-full h-32 border-0 rounded-lg bg-white shadow-inner",
                  }}
                />
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-sm text-[#6B7280]">
                    Sign above using your mouse or touch
                  </p>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="px-4 py-2 bg-[#F5F7FA] text-[#0D1B2A] border border-[#E5E7EB] rounded-lg hover:bg-[#E5E7EB] hover:border-[#1B9AAA] transition-all duration-200 text-sm font-medium"
                  >
                    Clear Signature
                  </button>
                </div>
              </div>
              {errors.signature && (
                <p className="text-sm text-[#E63946] font-medium">
                  {errors.signature}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#1B9AAA] to-[#158A9A] hover:from-[#158A9A] hover:to-[#1B9AAA] text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                    Submitting Application...
                  </div>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Navigation Links */}
        <div className="text-center mt-8 space-x-8">
          <a
            href="/"
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
          </a>
          <a
            href="/admin/login"
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Admin Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
