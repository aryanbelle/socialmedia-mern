import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Token from "../models/token.js";

const router = express.Router();

// Verify OTP and Update Password Route
router.post("/:otp", async (req, res) => {
  try {
    const { otp } = req.params; // Get OTP from the URL
    const { email, newPassword } = req.body; // Get email and new password from request body

    // Validate input
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required.",
      });
    }

    // Find the token by OTP
    const token = await Token.findOne({ OTP: otp });
    console.log(token, otp, "OTPPPPP");
    // Check if the OTP exists and is valid
    if (!token || token.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    // Verify the user associated with the OTP
    const user = await User.findOne({ _id: token.user, email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the OTP token after successful password update
    await Token.deleteOne({ _id: token._id });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Error during update-password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

export default router;
