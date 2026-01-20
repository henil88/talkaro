import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const otpModel = mongoose.model("otp", otpSchema);

export default otpModel;
