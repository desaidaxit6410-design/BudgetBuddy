import AuthLayoutForProfile from "../components/layouts/AuthLayoutForProfile";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Inputs/Input";
import ProfilePhotoSelector from "../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/apiPaths";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import { useUserAuth } from '../hooks/useUserAuth';

const Profile = () => {
  useUserAuth();
  const { user, updateUser } = useContext(UserContext);

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const navigate = useNavigate();

  // page loader
  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setError(null);
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);

      if (profilePic) formData.append("profile", profilePic);
      if (currentPassword && newPassword) {
        formData.append("oldPassword", currentPassword);
        formData.append("newPassword", newPassword);
      }

      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { user: updatedUser } = response.data;
      updateUser(updatedUser);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Update failed. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setUpdating(false);
    }
  };

  if (pageLoading) return <Loader />;

  return (
    <AuthLayoutForProfile>
      <div className="w-full max-w-lg mx-auto px-4 py-6 flex flex-col justify-center">
        <h2 className=" -mt-10 text-xl font-semibold text-black">Edit Profile</h2>
        <p className="text-sm text-slate-700 mt-1 mb-4">
          Update your personal details below
        </p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
          {/* Profile Photo Selector */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          {/* Input fields */}
          <div className="grid grid-cols-1 gap-3">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name:"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address:"
              placeholder="john@example.com"
              type="text"
            />

            {/* Password Update */}
            <Input
              value={currentPassword}
              onChange={({ target }) => setCurrentPassword(target.value)}
              label="Current Password:"
              placeholder="Enter current password"
              type="password"
            />

            <Input
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
              label="New Password:"
              placeholder="Enter new password"
              type="password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-4">
            {/* Update Button */}
            <button
              type="submit"
              className={`flex-1 text-sm px-4 py-2 rounded-lg flex items-center cursor-pointer justify-center gap-2 ${
                updating ? "opacity-70 cursor-not-allowed" : ""
              } bg-violet-600 text-white hover:bg-blue-700`}
              disabled={updating}
            >
              {updating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                "UPDATE"
              )}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 bg-violet-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </AuthLayoutForProfile>
  );
};

export default Profile;


