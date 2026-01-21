import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

const otpModel = mongoose.model("otp", otpSchema);

export default otpModel;
