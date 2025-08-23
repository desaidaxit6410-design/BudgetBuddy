import AuthLayout from '../../components/layouts/AuthLayout';
import { React, useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import { axiosInstance } from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 page loader
  const [loggingIn, setLoggingIn] = useState(false); // 👈 button loader

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Show loader when page first loads
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // fake delay for smooth effect
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

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

    setError("");
    setLoggingIn(true); // button loader

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);

        toast.success("You have logged in successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoggingIn(false);
    }
  };

  // 🔹 Show loader before rendering the page
  if (loading) {
    return <Loader />;
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-black">Welcome Back</h2>
        <p className="text-ls text-slate-700 mt-[5px] mb-6">
          Please Enter Your Details to Log In
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address:"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password:"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs pb-2.5">{error}</p>
          )}

          {/* Login Button with Loader */}
          <button
            type="submit"
            disabled={loggingIn}
            className={`btn-primary cursor-pointer flex items-center justify-center gap-2 ${
              loggingIn ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loggingIn ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              "LOGIN"
            )}
          </button>

          <p className="text-[15px] text-slate-900 mt-3">
            Don't have an account?{" "}
            <Link className="text-[15px] text-blue-600 underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
