import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SetNewPassword = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const {otp} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError("Password should be at least 8 characters.");
        }else {
            setError("");
            try {
                // Prepare the data to be sent
                const email = localStorage.getItem("myemail");
                const data = { email, newPassword: password };

                // Send POST request to the backend to update the password
                const response = await fetch(`/update-password/${otp}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.status === 200) {
                    const result = await response.json();
                    setSuccessMessage(result.message || "Password updated successfully!");
                    setTimeout(() => {
                        navigate("/signin"); // Redirect to login after successful password change
                    }, 2000);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Failed to update password. Please try again.");
                }
            } catch (err) {
                setError("An error occurred. Please try again.");
                console.error("Error during password update:", err);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md flex rounded-lg shadow-lg">
                {/* Left Side: Form */}
                <div className="w-full p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-left text-xl font-bold mb-4 text-gray-700">
                                Change Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter new password"
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
                            Change
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetNewPassword;
