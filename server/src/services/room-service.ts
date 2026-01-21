import roomModel from "../models/rooms-model";

interface roomPayload {
  topic: string;
  roomType: string;
  ownerId: string;
}

class RoomService {
  async create(payload: roomPayload) {
    const { topic, roomType, ownerId } = payload;
    const room = await roomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });
    return room;
  }
}

export default new RoomService();
