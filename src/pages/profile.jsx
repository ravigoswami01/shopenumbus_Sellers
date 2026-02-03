import React, { useContext, useEffect, useState } from "react";
import { SellerContext } from "../Context/SellerContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Store,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  FileText,
  CreditCard,
  Shield,
  CheckCircle,
  Clock,
  Edit,
  Save,
  X,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  Award,
  Globe,
  Building,
  FileCheck,
  BadgeCheck,
  Settings,
  ArrowRight,
  Upload,
  Camera,
} from "lucide-react";

const SellerProfile = () => {
  const { SellerProfile, profile, SetProfile, updateSellerProfile } =
    useContext(SellerContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    SellerProfile();
  }, []);

  useEffect(() => {
    setEditableData(profile);
  }, [profile]);

  const handleChange = (field, value) => {
    setEditableData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSellerProfile(editableData);
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    // Simulate image upload
    setIsUploading(true);
    setTimeout(() => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setEditableData((prev) => ({
            ...prev,
            profileImage: [e.target.result],
          }));
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }
    }, 1000);
  };

  // Mock stats for the dashboard
  const stats = [
    { label: "Total Revenue", value: "$45,230", icon: DollarSign, trend: "+12.5%", trendUp: true },
    { label: "Active Products", value: "342", icon: Package, trend: "+8.2%", trendUp: true },
    { label: "Total Customers", value: "2,589", icon: Users, trend: "+15.7%", trendUp: true },
    { label: "Store Rating", value: "4.8/5", icon: Award, trend: "+0.2", trendUp: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Seller Profile</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Manage your account and business information</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                      {editableData?.profileImage?.[0] ? (
                        <img
                          src={editableData.profileImage[0]}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Upload Overlay */}
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                        {isUploading ? (
                          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <Camera className="w-6 h-6 text-white" />
                        )}
                      </label>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                      editableData?.isApproved ? "bg-emerald-500" : "bg-amber-500"
                    }`}>
                      {editableData?.isApproved ? (
                        <CheckCircle className="w-3 h-3 text-white" />
                      ) : (
                        <Clock className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{editableData.name}</h2>
                    <div className="flex items-center justify-center mt-2 space-x-2">
                      <Store className="w-4 h-4 text-blue-200" />
                      <p className="text-blue-100">{editableData.storeName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Account Status</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      editableData?.isApproved
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {editableData?.isApproved ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified Seller
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Pending Review
                        </>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Member Since</span>
                    <span className="text-sm text-gray-900">
                      {editableData.createdAt ? new Date(editableData.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Seller ID</span>
                    <span className="text-sm font-mono text-gray-900">
                      {editableData._id?.slice(-8).toUpperCase() || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                      >
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                      >
                        <X className="w-5 h-5" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                    >
                      <Edit className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium"
                  >
                    <ArrowRight className="w-5 h-5" />
                    <span>Go to Dashboard</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${
                        index === 0 ? "from-blue-500 to-cyan-500" :
                        index === 1 ? "from-emerald-500 to-green-500" :
                        index === 2 ? "from-violet-500 to-purple-500" : "from-amber-500 to-orange-500"
                      }`}>
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                    <div className={`flex items-center text-xs font-semibold ${
                      stat.trendUp ? "text-emerald-600" : "text-red-600"
                    }`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-200 p-2 mb-6 shadow-sm">
              <div className="flex items-center space-x-1">
                {["profile", "business", "documents", "settings"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
                      activeTab === tab
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600 mt-1">Update your personal details and contact information</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Secure & encrypted</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField
                    label="Full Name"
                    value={editableData.name}
                    editing={isEditing}
                    onChange={(val) => handleChange("name", val)}
                    icon={User}
                    required
                  />
                  <InfoField
                    label="Email Address"
                    value={editableData.email}
                    editing={isEditing}
                    onChange={(val) => handleChange("email", val)}
                    icon={Mail}
                    type="email"
                    required
                  />
                  <InfoField
                    label="Phone Number"
                    value={editableData.phone}
                    editing={isEditing}
                    onChange={(val) => handleChange("phone", val)}
                    icon={Phone}
                    type="tel"
                  />
                  <InfoField
                    label="Address"
                    value={editableData.address}
                    editing={isEditing}
                    onChange={(val) => handleChange("address", val)}
                    icon={MapPin}
                    multiline
                  />
                  <InfoField
                    label="Role / Position"
                    value={editableData.role}
                    editing={isEditing}
                    onChange={(val) => handleChange("role", val)}
                    icon={Briefcase}
                  />
                  <div className="md:col-span-2">
                    <InfoField
                      label="Joined Date"
                      value={editableData.createdAt ? new Date(editableData.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                      editing={false}
                      icon={Calendar}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "business" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Business Information</h2>
                    <p className="text-gray-600 mt-1">Manage your business details and verification documents</p>
                  </div>
                  <BadgeCheck className="w-6 h-6 text-emerald-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField
                    label="Store Name"
                    value={editableData.storeName}
                    editing={isEditing}
                    onChange={(val) => handleChange("storeName", val)}
                    icon={Store}
                    required
                  />
                  <InfoField
                    label="Business Type"
                    value={editableData.businessType}
                    editing={isEditing}
                    onChange={(val) => handleChange("businessType", val)}
                    icon={Building}
                  />
                  <InfoField
                    label="GST Number"
                    value={editableData.gstNumber}
                    editing={isEditing}
                    onChange={(val) => handleChange("gstNumber", val)}
                    icon={FileText}
                    placeholder="Enter 15-digit GST number"
                  />
                  <InfoField
                    label="PAN Number"
                    value={editableData.panNumber}
                    editing={isEditing}
                    onChange={(val) => handleChange("panNumber", val)}
                    icon={CreditCard}
                    placeholder="Enter 10-digit PAN"
                  />
                  <div className="md:col-span-2">
                    <InfoField
                      label="Store ID"
                      value={editableData._id}
                      editing={false}
                      icon={Shield}
                      isCode
                    />
                  </div>
                </div>

                {/* Verification Status */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileCheck className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-900">GST Verification</p>
                            <p className="text-sm text-blue-700">{editableData.gstNumber ? "Document Uploaded" : "Pending"}</p>
                          </div>
                        </div>
                        {editableData.gstNumber ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <BadgeCheck className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="font-medium text-emerald-900">Account Status</p>
                            <p className="text-sm text-emerald-700">{editableData?.isApproved ? "Verified Seller" : "Under Review"}</p>
                          </div>
                        </div>
                        {editableData?.isApproved ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900">Business Documents</h2>
                  <p className="text-gray-600 mt-1">Upload and manage your verification documents</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-gray-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">GST Certificate</h3>
                          <p className="text-sm text-gray-600">Required for tax purposes</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        {editableData.gstNumber ? "Reupload" : "Upload"}
                      </button>
                    </div>
                    {editableData.gstNumber && (
                      <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">GST_{editableData.gstNumber}.pdf</p>
                              <p className="text-sm text-gray-500">Uploaded on Jan 15, 2024</p>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-6 h-6 text-gray-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">PAN Card</h3>
                          <p className="text-sm text-gray-600">Required for business registration</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        {editableData.panNumber ? "Reupload" : "Upload"}
                      </button>
                    </div>
                    {editableData.panNumber && (
                      <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">PAN_{editableData.panNumber}.pdf</p>
                              <p className="text-sm text-gray-500">Uploaded on Jan 15, 2024</p>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
                  <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                        <span className="font-medium text-gray-900">Change Password</span>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                        <span className="font-medium text-gray-900">Two-Factor Authentication</span>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                        <span className="font-medium text-gray-900">Login Activity</span>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                        <span className="font-medium text-gray-900">Email Notifications</span>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                        <span className="font-medium text-gray-900">SMS Alerts</span>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, editing, onChange, icon: Icon, type = "text", multiline = false, required = false, placeholder = "", isCode = false }) => {
  const Component = Icon || "div";
  
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        {editing ? (
          multiline ? (
            <textarea
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-700 placeholder-gray-400`}
              placeholder={placeholder}
              rows={3}
            />
          ) : (
            <input
              type={type}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-700 placeholder-gray-400`}
              placeholder={placeholder}
            />
          )
        ) : (
          <div className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-gray-50 rounded-xl`}>
            <p className={`${isCode ? 'font-mono' : 'font-medium'} text-gray-900 break-words ${!value && 'text-gray-400'}`}>
              {value || "Not provided"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfile;