import { verifyRoom } from "@/apis/room/verifyRoom";
import { redirect, type LoaderFunctionArgs } from "react-router";

export const verifyRoomLoader = async ({ params }: LoaderFunctionArgs) => {
  const { roomId } = params;
  if (!roomId) return redirect("/app");
  const result = await verifyRoom(roomId);
  if (result.status === "inactive") return redirect("/app");
  // return result.room;
  return {
    id: result.room._id,
    topic: result.room.topic,
    type: result.room.roomType,
  };
};
