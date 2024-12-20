import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const location = useLocation();
    const { username } = location.state || {}; // Retrieve username from state

    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length <= 1 && !isNaN(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Automatically move to the next input
            if (value.length === 1 && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join(""); // Combine OTP digits into a single string
        if (otpCode.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
        } else {
            setError("");
            // Prepare the OTP data to be sent
            const data = { otp: otpCode };

            try {
                // Send POST request to the backend for OTP verification
                const response = await fetch(`/verify/${username}/${otpCode}`, {
                    method: "POST",
                });

                // Check if OTP verification was successful
                if (response.status === 200) {
                    const result = await response.json();
                    console.log("OTP verified successfully:", result);
                    navigate("/");
                    // Redirect or show a success message
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "OTP verification failed. Please try again.");
                }
            } catch (err) {
                setError("An error occurred. Please try again.");
                console.error("Error during OTP verification:", err);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md flex rounded-lg shadow-lg">
                {/* Left Side: Form */}
                <div className="w-full p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-700">Verify OTP</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* OTP Input Fields */}
                        <div className="flex justify-center space-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    maxLength="1"
                                    className="w-14 h-14 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="•"
                                />
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-sm text-red-500">{error}</p>}

                        {/* Continue Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 transition duration-200"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
