import mongoose from "mongoose";

interface IUSER {
  phone: string;
  activated: boolean;
}

const userSchema = new mongoose.Schema<IUSER>(
  {
    phone: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
