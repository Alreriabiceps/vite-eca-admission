import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignaturePad from "react-signature-canvas";

const RequiredMark = () => (
  <span className="text-[#E63946] ml-0.5" aria-hidden="true">
    *
  </span>
);

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: "",
    givenName: "",
    middleName: "",
    schoolLastAttended: "",
    previousSchoolAddress: "",
    honorsAwards: "",
    courseApplied: "",
    presentAddress: "",
    addressHouseNo: "",
    addressStreet: "",
    addressBarangay: "",
    addressCityMunicipality: "",
    addressProvince: "",
    email: "",
    contact: "",
    telephoneNumber: "",
    dateOfBirth: "",
    age: "",
    sex: "",
    nationality: "",
    religion: "",
    civilStatus: "",
    fatherLastName: "",
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherMobileNumber: "",
    fatherEmail: "",
    fatherOccupation: "",
    fatherWorkAddress: "",
    motherLastName: "",
    motherFirstName: "",
    motherMiddleName: "",
    motherMobileNumber: "",
    motherEmail: "",
    motherOccupation: "",
    motherWorkAddress: "",
    dateSigned: new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
    // Examination Permit fields
    examDateTime: "",
    examinerDateSigned: "",
    privacyConsent: false,
  });
  const [photo, setPhoto] = useState(null);
  const [signaturePad, setSignaturePad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  // Check if selected course is a maritime course
  const isMaritimeCourse =
    formData.courseApplied === "Bachelor of Science in Marine Transportation" ||
    formData.courseApplied === "Bachelor of Science in Marine Engineering";

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { [name]: value };

    // Auto-calculate age when date of birth changes
    if (name === "dateOfBirth" && value) {
      const age = calculateAge(value);
      updatedData.age = age.toString();
    }

    setFormData((prev) => ({
      ...prev,
      ...updatedData,
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

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.givenName.trim())
      newErrors.givenName = "Given name is required";
    if (!formData.schoolLastAttended.trim())
      newErrors.schoolLastAttended = "School last attended is required";
    if (!formData.courseApplied)
      newErrors.courseApplied = "Please select a course";
    if (!formData.presentAddress.trim())
      newErrors.presentAddress = "Present address is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.sex) newErrors.sex = "Please select sex";
    if (!photo) newErrors.photo = "Profile photo is required";
    if (signaturePad?.isEmpty())
      newErrors.signature = "Digital signature is required";
    if (!formData.privacyConsent)
      newErrors.privacyConsent =
        "You must acknowledge the Data Privacy Act notice to continue.";
    if (
      formData.fatherEmail.trim() &&
      !/\S+@\S+\.\S+/.test(formData.fatherEmail)
    )
      newErrors.fatherEmail = "Invalid email format";
    if (
      formData.motherEmail.trim() &&
      !/\S+@\S+\.\S+/.test(formData.motherEmail)
    )
      newErrors.motherEmail = "Invalid email format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Show confirmation modal instead of submitting directly
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      // Combine name fields for backend compatibility
      const fullName = `${formData.lastName}, ${formData.givenName} ${formData.middleName}`;
      formDataToSend.append("name", fullName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("givenName", formData.givenName);
      formDataToSend.append("middleName", formData.middleName);
      formDataToSend.append("schoolLastAttended", formData.schoolLastAttended);
      formDataToSend.append(
        "previousSchoolAddress",
        formData.previousSchoolAddress
      );
      formDataToSend.append("honorsAwards", formData.honorsAwards);
      formDataToSend.append("courseApplied", formData.courseApplied);
      formDataToSend.append("presentAddress", formData.presentAddress);
      formDataToSend.append("addressHouseNo", formData.addressHouseNo);
      formDataToSend.append("addressStreet", formData.addressStreet);
      formDataToSend.append("addressBarangay", formData.addressBarangay);
      formDataToSend.append(
        "addressCityMunicipality",
        formData.addressCityMunicipality
      );
      formDataToSend.append("addressProvince", formData.addressProvince);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("telephoneNumber", formData.telephoneNumber);
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("sex", formData.sex);
      formDataToSend.append("nationality", formData.nationality);
      formDataToSend.append("religion", formData.religion);
      formDataToSend.append("civilStatus", formData.civilStatus);
      formDataToSend.append("fatherLastName", formData.fatherLastName);
      formDataToSend.append("fatherFirstName", formData.fatherFirstName);
      formDataToSend.append("fatherMiddleName", formData.fatherMiddleName);
      formDataToSend.append(
        "fatherMobileNumber",
        formData.fatherMobileNumber
      );
      formDataToSend.append("fatherEmail", formData.fatherEmail);
      formDataToSend.append("fatherOccupation", formData.fatherOccupation);
      formDataToSend.append("fatherWorkAddress", formData.fatherWorkAddress);
      formDataToSend.append("motherLastName", formData.motherLastName);
      formDataToSend.append("motherFirstName", formData.motherFirstName);
      formDataToSend.append("motherMiddleName", formData.motherMiddleName);
      formDataToSend.append(
        "motherMobileNumber",
        formData.motherMobileNumber
      );
      formDataToSend.append("motherEmail", formData.motherEmail);
      formDataToSend.append("motherOccupation", formData.motherOccupation);
      formDataToSend.append("motherWorkAddress", formData.motherWorkAddress);
      formDataToSend.append("dateSigned", formData.dateSigned);
      formDataToSend.append("photo", photo);
      formDataToSend.append(
        "privacyConsent",
        formData.privacyConsent ? "true" : "false"
      );

      // Add examiner fields if they exist (for maritime courses)
      if (formData.examDateTime) {
        formDataToSend.append("examDateTime", formData.examDateTime);
      }
      if (formData.examinerDateSigned) {
        formDataToSend.append(
          "examinerDateSigned",
          formData.examinerDateSigned
        );
      }

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
    <div className="min-h-screen bg-deep-navy-blue text-white relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Form Container - Styled like the physical form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-10 mb-8 border-t-4 border-warm-gold">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <img
                src="/logo na pogi.png"
                alt="Exact Colleges of Asia Logo"
                className="h-24 w-24 object-contain drop-shadow-md"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-deep-navy-blue tracking-wide">
                  EXACT COLLEGES OF ASIA
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Suclayin, Arayat, Pampanga
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Tel. No. 0925-870-1013 | Email: exact.colleges@yahoo.com
                </p>
              </div>
            </div>
            <div className="inline-block bg-deep-navy-blue py-2 px-6 rounded-full shadow-md">
              <p className="text-sm font-bold text-warm-gold uppercase tracking-wider">
                GUIDANCE OFFICE
              </p>
            </div>
          </div>

          {/* Form Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-[#0D1B2A] mb-3 underline">
              ADMISSIONS REGISTRATION FORM
            </h2>
            <p className="text-sm text-[#343A40] text-center italic">
              To the Applicant: Kindly fill-out this form. Please provide
              accurate information.
            </p>
            <p className="text-xs text-[#6B7280] text-center mt-2">
              Fields marked with <span className="text-[#E63946]">*</span> are
              required. All other fields may be left blank.
            </p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-600 font-medium">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* NAME OF APPLICANT */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                NAME OF APPLICANT
                <RequiredMark />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all ${
                      errors.lastName ? "border-crimson-red" : "border-gray-300"
                    }`}
                    placeholder="Last Name"
                  />
                  <p className="text-xs text-[#6B7280] mt-1 text-center">
                    Last Name <span className="text-[#E63946]">*</span>
                  </p>
                  {errors.lastName && (
                    <p className="text-xs text-[#E63946] font-medium">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="givenName"
                    value={formData.givenName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all ${
                      errors.givenName ? "border-crimson-red" : "border-gray-300"
                    }`}
                    placeholder="Given Name"
                  />
                  <p className="text-xs text-[#6B7280] mt-1 text-center">
                    Given Name <span className="text-[#E63946]">*</span>
                  </p>
                  {errors.givenName && (
                    <p className="text-xs text-[#E63946] font-medium">
                      {errors.givenName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                    placeholder="Middle Name"
                  />
                  <p className="text-xs text-[#6B7280] mt-1 text-center">
                    Middle Name (optional)
                  </p>
                </div>
              </div>
            </div>

            {/* SCHOOL LAST ATTENDED */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                SCHOOL LAST ATTENDED
                <RequiredMark />
              </label>
              <input
                type="text"
                name="schoolLastAttended"
                value={formData.schoolLastAttended}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all ${
                  errors.schoolLastAttended
                    ? "border-crimson-red"
                    : "border-gray-300"
                }`}
                placeholder="Enter school name"
              />
              {errors.schoolLastAttended && (
                <p className="text-xs text-[#E63946] font-medium">
                  {errors.schoolLastAttended}
                </p>
              )}
            </div>

            {/* PREVIOUS SCHOOL DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  SCHOOL ADDRESS
                </label>
                <input
                  type="text"
                  name="previousSchoolAddress"
                  value={formData.previousSchoolAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="Enter previous school address"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  HONORS / AWARDS RECEIVED
                </label>
                <input
                  type="text"
                  name="honorsAwards"
                  value={formData.honorsAwards}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="Enter awards, if any"
                />
              </div>
            </div>

            {/* COURSE APPLYING FOR */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                COURSE APPLYING FOR
                <RequiredMark />
              </label>
              <select
                name="courseApplied"
                value={formData.courseApplied}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue focus:outline-none focus:border-warm-gold transition-all ${
                  errors.courseApplied ? "border-crimson-red" : "border-gray-300"
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
                <p className="text-xs text-[#E63946] font-medium">
                  {errors.courseApplied}
                </p>
              )}
            </div>

            {/* PRESENT ADDRESS */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                PRESENT ADDRESS
                <RequiredMark />
              </label>
              <input
                type="text"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all ${
                  errors.presentAddress
                    ? "border-crimson-red"
                    : "border-gray-300"
                }`}
                placeholder="Enter complete address"
              />
              {errors.presentAddress && (
                <p className="text-xs text-[#E63946] font-medium">
                  {errors.presentAddress}
                </p>
              )}
            </div>

            {/* ADDRESS DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                  No.
                </label>
                <input
                  type="text"
                  name="addressHouseNo"
                  value={formData.addressHouseNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="No."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                  Street
                </label>
                <input
                  type="text"
                  name="addressStreet"
                  value={formData.addressStreet}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="Street"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                  Brgy. / Village
                </label>
                <input
                  type="text"
                  name="addressBarangay"
                  value={formData.addressBarangay}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="Barangay"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                  City / Municipality
                </label>
                <input
                  type="text"
                  name="addressCityMunicipality"
                  value={formData.addressCityMunicipality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="City / Municipality"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                  Province
                </label>
                <input
                  type="text"
                  name="addressProvince"
                  value={formData.addressProvince}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="Province"
                />
              </div>
            </div>

            {/* EMAIL AND CONTACT NUMBER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  EMAIL ADDRESS
                  <RequiredMark />
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all ${
                    errors.email ? "border-crimson-red" : "border-gray-300"
                  }`}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-[#E63946] font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  CONTACT NUMBER
                  <RequiredMark />
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all ${
                    errors.contact ? "border-crimson-red" : "border-gray-300"
                  }`}
                  placeholder="09XX-XXX-XXXX"
                />
                {errors.contact && (
                  <p className="text-xs text-[#E63946] font-medium">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  TELEPHONE NUMBER
                </label>
                <input
                  type="tel"
                  name="telephoneNumber"
                  value={formData.telephoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="Landline number"
                />
              </div>
            </div>

            {/* DATE OF BIRTH, AGE, SEX */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  DATE OF BIRTH
                  <RequiredMark />
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue focus:outline-none focus:border-warm-gold transition-all ${
                    errors.dateOfBirth ? "border-crimson-red" : "border-gray-300"
                  }`}
                />
                <p className="text-xs text-[#6B7280] italic">
                  (month/day/year)
                </p>
                {errors.dateOfBirth && (
                  <p className="text-xs text-[#E63946] font-medium">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  AGE
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  readOnly
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-[#F9FAFB] text-[#0D1B2A] border-[#343A40] focus:outline-none"
                  placeholder="Auto-calculated"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase mb-2">
                  SEX
                  <RequiredMark />
                </label>
                <div className="flex gap-6 items-center pt-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="Male"
                      checked={formData.sex === "Male"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1B9AAA] focus:ring-[#1B9AAA] cursor-pointer"
                    />
                    <span className="ml-2 text-[#0D1B2A] font-medium">
                      Male
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="Female"
                      checked={formData.sex === "Female"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1B9AAA] focus:ring-[#1B9AAA] cursor-pointer"
                    />
                    <span className="ml-2 text-[#0D1B2A] font-medium">
                      Female
                    </span>
                  </label>
                </div>
                {errors.sex && (
                  <p className="text-xs text-[#E63946] font-medium">
                    {errors.sex}
                  </p>
                )}
              </div>
            </div>

            {/* ADDITIONAL STUDENT INFORMATION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  NATIONALITY
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="e.g., Filipino"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  RELIGION
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-transparent text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                  placeholder="Religion"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase mb-2">
                  CIVIL STATUS
                </label>
                <div className="flex gap-6 items-center pt-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="civilStatus"
                      value="Single"
                      checked={formData.civilStatus === "Single"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1B9AAA] focus:ring-[#1B9AAA] cursor-pointer"
                    />
                    <span className="ml-2 text-[#0D1B2A] font-medium">
                      Single
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="civilStatus"
                      value="Married"
                      checked={formData.civilStatus === "Married"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#1B9AAA] focus:ring-[#1B9AAA] cursor-pointer"
                    />
                    <span className="ml-2 text-[#0D1B2A] font-medium">
                      Married
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Parents Information */}
            <div className="border-t-2 border-[#E5E7EB] pt-6 mt-8">
              <h3 className="text-lg font-bold text-[#0D1B2A] uppercase mb-1">
                Parents' Information
              </h3>
              <p className="text-xs text-[#6B7280] mb-4 italic">
                Optional — leave blank if not applicable
              </p>

              <div className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                <h4 className="text-sm font-bold text-[#0D1B2A] uppercase mb-4">
                  Father
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fatherLastName"
                      value={formData.fatherLastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Last Name"
                    />
                    <p className="text-xs text-[#6B7280] mt-1 text-center">
                      Last Name
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="fatherFirstName"
                      value={formData.fatherFirstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="First Name"
                    />
                    <p className="text-xs text-[#6B7280] mt-1 text-center">
                      First Name
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="fatherMiddleName"
                      value={formData.fatherMiddleName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Middle Name"
                    />
                    <p className="text-xs text-[#6B7280] mt-1 text-center">
                      Middle Name
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                      Mobile No.
                    </label>
                    <input
                      type="tel"
                      name="fatherMobileNumber"
                      value={formData.fatherMobileNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Father's mobile number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                      E-mail Address (optional)
                    </label>
                    <input
                      type="text"
                      inputMode="email"
                      name="fatherEmail"
                      value={formData.fatherEmail}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all ${
                        errors.fatherEmail ? "border-crimson-red" : "border-gray-300"
                      }`}
                      placeholder="Father's email (optional)"
                    />
                    {errors.fatherEmail && (
                      <p className="text-xs text-[#E63946] font-medium">
                        {errors.fatherEmail}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Father's occupation"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                      Work Address
                    </label>
                    <input
                      type="text"
                      name="fatherWorkAddress"
                      value={formData.fatherWorkAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Father's work address"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                <h4 className="text-sm font-bold text-[#0D1B2A] uppercase mb-4">
                  Mother (Full Maiden Name)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      name="motherLastName"
                      value={formData.motherLastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Last Name"
                    />
                    <p className="text-xs text-[#6B7280] mt-1 text-center">
                      Last Name
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="motherFirstName"
                      value={formData.motherFirstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="First Name"
                    />
                    <p className="text-xs text-[#6B7280] mt-1 text-center">
                      First Name
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="motherMiddleName"
                      value={formData.motherMiddleName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Middle Name"
                    />
                    <p className="text-xs text-[#6B7280] mt-1 text-center">
                      Middle Name
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                      Mobile No.
                    </label>
                    <input
                      type="tel"
                      name="motherMobileNumber"
                      value={formData.motherMobileNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Mother's mobile number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                      E-mail Address (optional)
                    </label>
                    <input
                      type="text"
                      inputMode="email"
                      name="motherEmail"
                      value={formData.motherEmail}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all ${
                        errors.motherEmail ? "border-crimson-red" : "border-gray-300"
                      }`}
                      placeholder="Mother's email (optional)"
                    />
                    {errors.motherEmail && (
                      <p className="text-xs text-[#E63946] font-medium">
                        {errors.motherEmail}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Mother's occupation"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#0D1B2A] uppercase">
                      Work Address
                    </label>
                    <input
                      type="text"
                      name="motherWorkAddress"
                      value={formData.motherWorkAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-white text-deep-navy-blue placeholder-gray-400 focus:outline-none focus:border-warm-gold transition-all border-gray-300"
                      placeholder="Mother's work address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="border-t-2 border-[#E5E7EB] pt-6 mt-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                  Profile Photo (2x2)
                  <RequiredMark />
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className={`w-full px-4 py-2 border-2 rounded-lg text-[#0D1B2A] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1B9AAA] file:text-white hover:file:bg-[#158A9A] ${
                      errors.photo ? "border-[#E63946]" : "border-[#343A40]"
                    }`}
                  />
                </div>
                {errors.photo && (
                  <p className="text-xs text-[#E63946] font-medium">
                    {errors.photo}
                  </p>
                )}
                {photo && (
                  <div className="mt-4 flex justify-center">
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Preview"
                        className="w-32 h-32 object-cover border-2 border-[#343A40] shadow-md"
                      />
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Certification Statement */}
            <div className="border-t-2 border-[#E5E7EB] pt-6 mt-6">
              <p className="text-center text-[#0D1B2A] italic font-medium mb-6">
                I certify that all these information is true and correct.
              </p>

              {/* Digital Signature */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#0D1B2A] text-center uppercase">
                  Signature over printed name
                  <RequiredMark />
                </label>
                <div className="border-2 border-[#343A40] rounded-md p-4 bg-[#F9FAFB]">
                  <SignaturePad
                    ref={setSignaturePad}
                    canvasProps={{
                      className: "w-full h-32 border-0 bg-white",
                    }}
                  />
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-xs text-[#6B7280]">
                      Sign above using your mouse or touch
                    </p>
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="px-3 py-1 bg-[#F5F7FA] text-[#0D1B2A] border border-[#343A40] rounded hover:bg-[#E5E7EB] transition-all text-xs font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                {errors.signature && (
                  <p className="text-xs text-[#E63946] font-medium text-center">
                    {errors.signature}
                  </p>
                )}
              </div>

              {/* Date Signed */}
              <div className="mt-6 max-w-xs mx-auto">
                <label className="block text-sm font-bold text-[#0D1B2A] uppercase mb-2">
                  Date Signed:
                </label>
                <input
                  type="text"
                  name="dateSigned"
                  value={formData.dateSigned}
                  readOnly
                  className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-[#F9FAFB] text-[#0D1B2A] border-[#343A40] focus:outline-none text-center"
                />
              </div>
            </div>

            {/* EXAMINATION PERMIT - Only for Maritime Courses */}
            {isMaritimeCourse && (
              <div className="border-t-4 border-[#0D1B2A] pt-8 mt-8">
                <h2 className="text-2xl font-bold text-center text-[#0D1B2A] mb-6 underline uppercase">
                  EXAMINATION PERMIT
                </h2>

                {/* NAME OF APPLICANT (Display Only) */}
                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                    NAME OF APPLICANT
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        value={formData.lastName}
                        readOnly
                        className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-[#F9FAFB] text-[#0D1B2A] border-[#343A40] focus:outline-none"
                        placeholder="Last Name"
                      />
                      <p className="text-xs text-[#6B7280] mt-1 text-center">
                        Last Name
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData.givenName}
                        readOnly
                        className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-[#F9FAFB] text-[#0D1B2A] border-[#343A40] focus:outline-none"
                        placeholder="Given Name"
                      />
                      <p className="text-xs text-[#6B7280] mt-1 text-center">
                        Given Name
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData.middleName}
                        readOnly
                        className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-[#F9FAFB] text-[#0D1B2A] border-[#343A40] focus:outline-none"
                        placeholder="Middle Name"
                      />
                      <p className="text-xs text-[#6B7280] mt-1 text-center">
                        Middle Name
                      </p>
                    </div>
                  </div>
                </div>

                {/* SCHOOL LAST ATTENDED (Display Only) */}
                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                    SCHOOL LAST ATTENDED
                  </label>
                  <input
                    type="text"
                    value={formData.schoolLastAttended}
                    readOnly
                    className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-[#F9FAFB] text-[#0D1B2A] border-[#343A40] focus:outline-none"
                  />
                </div>

                {/* COURSE APPLYING FOR (Display Only) */}
                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-bold text-[#0D1B2A] uppercase">
                    COURSE APPLYING FOR
                  </label>
                  <input
                    type="text"
                    value={formData.courseApplied}
                    readOnly
                    className="w-full px-4 py-2 border-b-2 border-t-0 border-x-0 bg-[#F9FAFB] text-[#0D1B2A] border-[#343A40] focus:outline-none"
                  />
                </div>

                {/* To be filled by the examiner */}
                <div className="bg-[#FFF5F5] border-2 border-[#E63946] rounded-lg p-6 mt-8">
                  <p className="text-[#E63946] font-bold text-center mb-4 uppercase text-sm">
                    To be filled by the examiner
                  </p>

                  <div className="space-y-4">
                    {/* DATE/TIME OF TEST (Optional) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-[#343A40] uppercase">
                        DATE/TIME OF TEST (Optional)
                      </label>
                      <input
                        type="datetime-local"
                        name="examDateTime"
                        value={formData.examDateTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 rounded-lg bg-white text-[#0D1B2A] border-[#343A40] focus:outline-none focus:border-[#1B9AAA] focus:ring-2 focus:ring-[#1B9AAA]"
                      />
                      <p className="text-xs text-[#6B7280] italic">
                        Select date and time for the examination (if already scheduled)
                      </p>
                    </div>

                    {/* Date Signed (Optional) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-[#343A40] uppercase">
                        Date Signed (Optional)
                      </label>
                      <input
                        type="date"
                        name="examinerDateSigned"
                        value={formData.examinerDateSigned}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 rounded-lg bg-white text-[#0D1B2A] border-[#343A40] focus:outline-none focus:border-[#1B9AAA] focus:ring-2 focus:ring-[#1B9AAA]"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] text-center mt-6 italic">
                    GO-ARF/00/Sept.2020
                  </p>
                </div>
              </div>
            )}

            {/* Data Privacy Consent */}
            <div className="mt-8 bg-[#F5F7FA] border border-[#1B9AAA]/30 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <input
                  id="privacyConsent"
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => ({
                      ...prev,
                      privacyConsent: checked,
                    }));
                    if (errors.privacyConsent && checked) {
                      setErrors((prev) => ({
                        ...prev,
                        privacyConsent: "",
                      }));
                    }
                  }}
                  className="mt-1 h-4 w-4 text-[#1B9AAA] focus:ring-[#1B9AAA] border-gray-300 rounded"
                />
                <label htmlFor="privacyConsent" className="text-sm text-[#0D1B2A] leading-relaxed">
                  I hereby acknowledge that I have read and understood the{" "}
                  <span className="font-semibold">Data Privacy Act of 2012 (RA 10173)</span> and
                  consent to the collection and processing of my personal information by Exact
                  Colleges of Asia for admission and related academic purposes.
                  <RequiredMark />
                </label>
              </div>
              {errors.privacyConsent && (
                <p className="mt-2 text-xs text-[#E63946] font-medium">
                  {errors.privacyConsent}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t-2 border-[#E5E7EB] mt-8">
              <button
                type="submit"
                disabled={loading || !formData.privacyConsent}
                className="w-full bg-warm-gold hover:bg-yellow-500 text-deep-navy-blue font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase"
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
            className="inline-flex items-center text-warm-gold hover:text-white text-sm font-medium transition-colors duration-200"
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
            className="inline-flex items-center text-warm-gold hover:text-white text-sm font-medium transition-colors duration-200"
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          style={{ zIndex: 9999 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              console.log("🔄 Modal backdrop clicked - closing modal");
              setShowConfirmModal(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confirm Application Submission
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-600 mb-6">
                Please make sure all your credentials and information are
                accurate and true. Once submitted, you cannot modify your
                application.
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  I'll Check Again
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  I'm Sure, Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
