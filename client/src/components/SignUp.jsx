import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthImg from "../assets/auth.jpg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      setIsLoading(true); // Start loading

      const data = { email, username, password };

      localStorage.setItem("tempemail",email);
      localStorage.setItem("myusername",username);

      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.status === 201) {
          const result = await response.json();
          console.log("Signed up successfully:", result);

          // Pass username to OTP page
          navigate("/otp", { state: { username } });
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Signup failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
        console.error("Error during signup:", err);
      } finally {
        setIsLoading(false); // Stop loading after request is complete
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl flex rounded-lg shadow-lg">
        {/* Left Side: Form */}
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-700">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-600">Username</label>
              <input
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading} // Disable button while loading
              className={`w-full py-3 rounded-md font-medium transition duration-200 ${isLoading ? 'bg-gray-500' : 'bg-blue-700'} text-white ${isLoading ? 'cursor-not-allowed' : 'hover:bg-blue-800'}`}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-500 font-semibold hover:text-blue-700">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="hidden lg:flex w-1/2 rounded-r-lg items-center justify-center">
          <img
            src={AuthImg} // Replace with your own illustration image
            alt="Sign Up Illustration"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
