import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relational reference to the User model
    OTP: { type: String, required: true }, // OTP value
    expiresAt: { type: Date, required: true }, // Expiry time for the OTP
    isUsed: { type: Boolean, default: false }, // Flag to check if OTP has been used
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Index to automatically delete expired tokens
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Token = mongoose.model('Token', tokenSchema);

export default Token;
