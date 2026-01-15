import mongoose, { HydratedDocument } from "mongoose";

 interface IUSER {
  phone: string;
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
