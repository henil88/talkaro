import mongoose, { Schema } from "mongoose";
import { ref } from "process";

const roomSchema = new mongoose.Schema(
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
