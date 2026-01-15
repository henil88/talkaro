import mongoose, { Schema } from "mongoose";
import userModel from "./user-model";

interface ITOKEN {
  token: string;
  userId: mongoose.ObjectId;
}

const tokenSchema = new mongoose.Schema<ITOKEN>(
  {
    token: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: userModel,
    },
  },
  {
    timestamps: true,
  }
);

const tokenModel = mongoose.model("token", tokenSchema);
export default tokenModel;
