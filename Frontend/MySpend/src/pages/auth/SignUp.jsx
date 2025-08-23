import AuthLayout from '../../components/layouts/AuthLayout';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../Utils/uploadImage';
import Loader from '../../components/Loader'; // ✅ full-page loader

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  // page loader (like login)
  const [pageLoading, setPageLoading] = useState(true);
  // button loader during submit
  const [signingUp, setSigningUp] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // show a brief page loader on route load (same pattern as login)
  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Handle signup function
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    // Validation checks
    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError(null);
    setSigningUp(true); // start button loader

    try {
      // Upload profile image if provided
      if (profilePic) {
        const imageUploads = await uploadImage(profilePic);
        profileImageUrl = imageUploads.imageUrl || "";
      }

      // Call register API
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        // Ensure profileImageUrl is always included in context
        const updatedUser = { ...user, profileImageUrl };

        updateUser(updatedUser);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      // auto-clear after a few seconds (optional)
      setTimeout(() => setError(null), 5000);
    } finally {
      setSigningUp(false); // stop button loader
    }
  };

  // 🔹 Full-page loader while route mounts
  if (pageLoading) return <Loader />;

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-black">Create An Account</h2>
        <p className="text-ls text-slate-700 mt-[5px] mb-6">
          Please Enter Your Details to Sign Up
        </p>

        <form onSubmit={handleSignUp}>
          {/* Profile Photo Selector */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name:"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address:"
              placeholder="john@example.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password:"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          {/* Submit Button with loader (like login) */}
          <button
            type="submit"
            className={`btn-primary cursor-pointer flex items-center justify-center gap-2 ${
              signingUp ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={signingUp}
          >
            {signingUp ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing up...
              </>
            ) : (
              "SIGN UP"
            )}
          </button>

          <p className="text-[15px] text-slate-900 mt-3">
            Already have an account?{" "}
            <Link className="text-[15px] text-blue-600 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
