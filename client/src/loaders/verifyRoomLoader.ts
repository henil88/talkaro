import { verifyRoom } from "@/apis/verifyRoom";
import { redirect, type LoaderFunctionArgs } from "react-router";

export const verifyRoomLoader = async ({ params }: LoaderFunctionArgs) => {
  const { roomId } = params;
  if (!roomId) return redirect("/app");
  const result = await verifyRoom(roomId);
  if (result.status === "inactive") return redirect("/app");
  return result.room;
};
