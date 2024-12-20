import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPWInput = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
            try {
                // Prepare the data to be sent
                const data = { email };
                localStorage.setItem("myemail", email);

                // Send POST request to the backend to initiate the password reset
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.status === 200) {
                    const result = await response.json();
                    setSuccessMessage(result.message || "Password reset link sent successfully!");
                    setTimeout(() => {
                        navigate("/signin"); // Redirect to login after successful request
                    }, 2000);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Failed to send password reset link. Please try again.");
                }
            } catch (err) {
                setError("An error occurred. Please try again.");
                console.error("Error during password reset request:", err);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md flex rounded-lg shadow-lg">
                {/* Left Side: Form */}
                <div className="w-full p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-700">Forgot Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-left text-xl font-bold mb-4 text-gray-700">
                                Enter your email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-sm text-red-500">{error}</p>}

                        {/* Success Message */}
                        {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-700 font-medium text-white py-3 rounded-md hover:bg-blue-800 transition duration-200"
                        >
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPWInput;
