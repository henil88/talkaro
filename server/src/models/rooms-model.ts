import mongoose, { Schema, Types } from "mongoose";

export interface IRoomInput {
  _id: Types.ObjectId | string;
  topic: string;
  roomType: string;
  ownerId: Types.ObjectId | string;
  speakers?: (Types.ObjectId | string)[] | null;
  createdAt: Date;
}

const roomSchema = new mongoose.Schema<IRoomInput>(
  {
    topic: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    speakers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
      required: false,
    },
  },
  { timestamps: true },
);

const roomModel = mongoose.model("roomModel", roomSchema);
export default roomModel;
