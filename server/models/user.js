import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'], // Regex for validating email format
    },
    isForgotPassword: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String, // URL of the profile picture
      default: '',
    },
    resetPasswordToken: {
      type: String, // Token for password reset
    },
    resetPasswordExpires: {
      type: Date, // Expiration time for reset token
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export default mongoose.model('User', userSchema);
