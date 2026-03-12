import api from "@/libs/axios";

type User = {
  _id: string;
  avatar: string;
  name: string;
};

type Room = {
  _id: string;
  topic: string;
  roomType: "public" | "private"; // Add more types if needed
  ownerId: User;
  speakers: User[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface Response {
  success: boolean;
  rooms: Room[];
  message: string;
}

export const fetchRooms = async () => {
  const { data } = await api.get<Response>("/api/rooms");
  return data.rooms;
};
