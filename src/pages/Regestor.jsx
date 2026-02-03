import React, { useContext, useState } from "react";
import axios from "axios";
import { SellerContext } from "../Context/SellerContext";
import { toast } from "react-toastify";
import {Link} from "react-router-dom"

const Register = () => {
  const { BackendURL } = useContext(SellerContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
    phone: "",
    address: "",
    gstNumber: "",
    panNumber: "",
    businessType: "",
    profileImage: null,
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = [
    "individual",
    "company",
    "Manufacturer",
    "partnership",
  ];

  const getValidationError = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 3)
          return "Name must be at least 3 characters";
        break;
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value))
          return "Must include uppercase, lowercase, number & special character";
        break;
      case "storeName":
        if (!value.trim()) return "Store name is required";
        break;
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Invalid phone number (10 digits)";
        break;
      case "address":
        if (!value.trim()) return "Address is required";
        break;
      case "gstNumber":
        if (!value) return "GST number is required";
        if (
          !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
            value
          )
        )
          return "Invalid GST format";
        break;
      case "panNumber":
        if (!value) return "PAN number is required";
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
          return "Invalid PAN format";
        break;
      case "businessType":
        if (!value) return "Business type is required";
        break;
      case "profileImage":
        if (value && !value.type.match(/image\/(jpeg|png|jpg)/))
          return "Only JPG/PNG images allowed";
        if (value && value.size > 1048576)
          return "Image size must be less than 1MB";
        break;
      case "terms":
        if (!value) return "You must accept the terms and conditions";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const val =
      type === "file" ? files[0] : type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: val });
    validateField(name, val);
  };
  console.log(formData);

  const validateField = (name, value) => {
    const errorMessage = getValidationError(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = getValidationError(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profileImage" && formData.profileImage) {
          formDataToSend.append("profileImage", formData.profileImage);
        } else if (key !== "profileImage") {
          formDataToSend.append(key, formData[key]);
        }
      });
      const response = await axios.post(
        BackendURL + "/api/seller/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create Your Seller Account
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of sellers and start reaching millions of customers
            worldwide
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/10"></div>

                <div className="relative z-10 text-center">
                  <div className="relative mb-8">
                    <div className="w-48 h-48 rounded-full bg-white/60 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center overflow-hidden shadow-2xl">
                      {formData.profileImage ? (
                        <img
                          src={URL.createObjectURL(formData.profileImage)}
                          alt="Profile"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-20 w-20 text-indigo-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="w-full max-w-xs">
                    <label
                      htmlFor="profileImage"
                      className="block text-sm font-semibold text-slate-700 mb-3"
                    >
                      Profile Photo
                    </label>
                    <div className="relative">
                      <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        className="sr-only"
                        onChange={handleChange}
                        accept="image/*"
                      />
                      <label
                        htmlFor="profileImage"
                        className="group cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-indigo-300 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
                      >
                        <svg
                          className="w-8 h-8 text-indigo-400 group-hover:text-indigo-600 transition-colors mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">
                          Upload Photo
                        </span>
                        <span className="text-xs text-slate-500 mt-1">
                          PNG, JPG up to 1MB
                        </span>
                      </label>
                    </div>
                    {errors.profileImage && (
                      <p className="text-sm text-red-500 mt-2 font-medium">
                        {errors.profileImage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-10">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name *"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                          errors.name
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-white focus:border-indigo-400"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                          errors.email
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-white focus:border-indigo-400"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password *"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                          errors.password
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-white focus:border-indigo-400"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-sm text-red-500 font-medium">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                          errors.phone
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-white focus:border-indigo-400"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      placeholder="Store Name *"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                        errors.storeName
                          ? "border-red-300 bg-red-50 focus:border-red-500"
                          : "border-slate-200 bg-white focus:border-indigo-400"
                      }`}
                    />
                    {errors.storeName && (
                      <p className="text-sm text-red-500 font-medium">
                        {errors.storeName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Business Address *"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none ${
                        errors.address
                          ? "border-red-300 bg-red-50 focus:border-red-500"
                          : "border-slate-200 bg-white focus:border-indigo-400"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500 font-medium">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        placeholder="GST Number *"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                          errors.gstNumber
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-white focus:border-indigo-400"
                        }`}
                      />
                      {errors.gstNumber && (
                        <p className="text-sm text-red-500 font-medium">
                          {errors.gstNumber}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        placeholder="PAN Number *"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                          errors.panNumber
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-white focus:border-indigo-400"
                        }`}
                      />
                      {errors.panNumber && (
                        <p className="text-sm text-red-500 font-medium">
                          {errors.panNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                        errors.businessType
                          ? "border-red-300 bg-red-50 focus:border-red-500"
                          : "border-slate-200 bg-white focus:border-indigo-400"
                      }`}
                    >
                      <option value="" className="text-slate-400">
                        Select Business Type *
                      </option>
                      {businessTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="text-slate-700"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <p className="text-sm text-red-500 font-medium">
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                    <div>
                      <div className="flex items-start">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          checked={formData.terms}
                          onChange={handleChange}
                          className="mt-1 h-5 w-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                        />
                        <div className="ml-3">
                          <label
                            htmlFor="terms"
                            className="text-sm text-slate-600"
                          >
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                            >
                              Privacy Policy
                            </a>
                          </label>
                          {errors.terms && (
                            <p className="text-sm text-red-500 font-medium mt-1">
                              {errors.terms}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating...</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
