import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import AuthPage from "./AuthPage"; // Import the AuthPage wrapper
import Header from "../components/Header";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Signup failed. Try again.");
        return;
      }

      // ✅ Save user email or full user object
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      } else {
        localStorage.setItem("user", JSON.stringify({ email: data.email }));
      }

      // ✅ Debug log
      console.log("User saved to localStorage:", localStorage.getItem("user"));

      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
    <Header />
<AuthPage >
  <div className="w-full  bg-gray-800  rounded-2xl p-2 mx-auto font-[Sen] ">
    {/* Signup/Login Tabs */}
    <div className="flex mb-6">
      <Link to="/signup" className="w-1/2 py-3 text-white border-b-2 border-[#FACC15] font-semibold text-center">
        Signup
      </Link>
      <Link to="/login" className="w-1/2 py-3 text-gray-500 hover:text-white transition text-center">
        Login
      </Link>
    </div>

    {/* Title */}
    <h1 className="text-center text-3xl font-bold mb-2 text-[#FACC15]">Sign Up</h1>
    <p className="text-center text-gray-400 mb-6 text-sm">
      Create an account to continue. Already have one? Log in!
    </p>

    {/* Error Message */}
    {error && <p className="text-[#FACC15] text-center mb-4">{error}</p>}

    {/* Signup Form */}
    <form onSubmit={handleSubmit}>
      {/* Name Input */}
      <div className="mb-5">
        <label className="text-gray-300 text-sm font-medium">Full Name</label>
        <div className="relative mt-2">
          <FaUser  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Name"
            className="w-full h-12 p-3 pl-10 bg-gray-700 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            required
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="mb-5">
        <label className="text-gray-300 text-sm font-medium">Email</label>
        <div className="relative mt-2">
          <CiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="user@example.com"
            className="w-full h-12 p-3 pl-10 bg-gray-700 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="mb-6 flex flex-col">
        <label className="text-gray-300 text-sm font-medium">Password</label>
        <div className="relative mt-2">
          <TbLockPassword className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleOnChange}
            className="w-full h-12 p-3 pl-10 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            required
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <label className="text-gray-300 text-sm font-medium mt-5">Confirm Password</label>
        <div className="relative mt-2">
          <TbLockPassword className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleOnChange}
            className="w-full h-12 p-3 pl-10 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            required
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>
      </div>

      {/* Signup Button */}
      <button className="w-full bg-[#4F46E5] text-white py-3 rounded-lg hover:bg-[#3B37C9] transition" type="submit">
        Sign Up
      </button>
    </form>

    {/* Login Link */}
    <p className="text-center text-sm text-gray-400 mt-5">
      Already have an account?{" "}
      <Link to={"/login"} className="text-[#FACC15] font-semibold hover:underline">
        Login
      </Link>
    </p>
  </div>
</AuthPage>
    </>
  );
}

export default Signup;
