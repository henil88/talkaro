import { Types } from "mongoose";
import { IRoom } from "../models/rooms-model";

class RoomDto {
  _id: string;
  topic: string;
  roomType: string;
  ownerId: string;
  speakers: string[];
  createdAt: Date;

  constructor(room:IRoom) {
    ((this._id = room._id.toString()),
      (this.topic = room.topic),
      (this.roomType = room.roomType),
      (this.ownerId = room.ownerId.toString()),
      (this.speakers = (room.speakers ?? []).map((id) => id.toString())),
      (this.createdAt = room.createdAt));
  }
}

export default RoomDto;
