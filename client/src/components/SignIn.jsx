import React, { useState } from "react";
import AuthImg from "../assets/auth.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");  // Accept either email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      setError("Please fill in both fields");
      return;
    } else {
      setError("");
      setIsLoading(true); // Set loading to true when request starts
      try {
        // Send POST request to backend /signin route
        const response = await fetch("/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier,
            password,
          }),
        });

        // Handle response
        if (response.ok) {
          const result = await response.json();
          console.log("Logged in successfully:", result);
          const token = result.token;
          const username = result.user.username;
          const email = result.user.email;

          localStorage.setItem("mytoken", token);
          localStorage.setItem("username", username);
          localStorage.setItem("myemail", email);
          navigate("/");  // Redirect to home after successful login
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Login failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
        console.error("Error during login:", err);
      } finally {
        setIsLoading(false);  // Set loading to false after request is complete
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl flex rounded-lg shadow-lg">
        {/* Left Side: Form */}
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-700">Welcome back!!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-left font-medium text-gray-600">
                Email or Username
              </label>
              <input
                type="text"
                value={identifier}
                required
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email or username"
              />
            </div>
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

            {/* Forgot Password Link */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-blue-500 font-medium hover:text-blue-700">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={isLoading} // Disable button while loading
              className={`w-full py-3 font-medium rounded-md transition duration-200 ${isLoading ? 'bg-gray-500' : 'bg-blue-700'} text-white ${isLoading ? 'cursor-not-allowed' : 'hover:bg-blue-800'}`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 font-semibold hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="hidden lg:flex w-1/2 rounded-r-lg items-center justify-center">
          <img
            src={AuthImg} // Replace with your own illustration image
            alt="Login Illustration"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
