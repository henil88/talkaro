import mongoose, { HydratedDocument } from "mongoose";

interface IUSER {
  phone: string;
  name: string;
  avatar: string;
  otp: string;
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
    avatar: {
      type: String,
      require: false,
      get: (avatar: string) => {
        if (avatar) {
          return `${process.env.BASE_URL}${avatar}`;
        }
        return avatar;
      },
    },
    activated: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  },
);

const userModel = mongoose.model<UserDocument>("user", userSchema);

export default userModel;
