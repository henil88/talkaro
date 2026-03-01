import type { RoomSession } from "@/application/room/RoomSession";
import { createContext, useContext } from "react";

export const RoomSessionContext = createContext<RoomSession | null>(null);

export const useRoomSession = () => {
  const ctx = useContext(RoomSessionContext);
  if (!ctx) throw new Error("Missing RoomSessionProvider");
  return ctx;
};
