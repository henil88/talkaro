import { initRoom } from "@/application/room/initRoom";
import { RoomSession } from "@/application/room/RoomSession";
import { RoomSessionContext } from "@/contexts/RoomSessionContext";
import type { Room } from "@/types/room";
import { useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router";

export const RoomLayout = () => {
  const room = useLoaderData<Room>();

  const [session, setSession] = useState<RoomSession | null>(null);

  useEffect(() => {
    const sessionInstance = new RoomSession();
    setSession(sessionInstance);
    initRoom(room.id, { localState: sessionInstance.localState });

    return () => {
      sessionInstance.dispose();
    };
  }, [room.id]);

  useEffect(() => {
    if (session) {
      session.localState.setRoom(room);
    }
  }, [room, session]);

  return (
    <RoomSessionContext value={session}>
      <Outlet />
    </RoomSessionContext>
  );
};
