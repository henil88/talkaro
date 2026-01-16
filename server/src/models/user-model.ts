import mongoose, { HydratedDocument } from "mongoose";

interface IUSER {
  phone: string;
  name: string;
  avtar: string;
  activated: boolean;
  createdAt: Date;
}

export type UserDocument = HydratedDocument<IUSER>;

const userSchema = new mongoose.Schema<UserDocument>(
  {
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: false,
    },
    avtar: {
      type: String,
      require: false,
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

const userModel = mongoose.model<UserDocument>("user", userSchema);

export default userModel;
