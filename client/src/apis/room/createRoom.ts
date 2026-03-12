import api from "@/libs/axios";

interface Response {
  _id: string;
  topic: string;
  roomType: string;
  ownerId: string;
  speakers: string[];
  createdAt: string;
}

export const createRoom = async (topic: string, type: string) => {
  const { data: room } = await api.post<Response>("/api/rooms", {
    topic,
    roomType: type,
  });
  if (!room) throw new Error("Room can't be created");
  return room;
};
