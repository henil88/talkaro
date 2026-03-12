import { disposeRoom, initRoom } from "@/application/room/initRoom";
import { RoomSession } from "@/application/room/RoomSession";
import { RoomSessionContext } from "@/contexts/RoomSessionContext";
import { useAppSelector } from "@/store/hooks";
import type { Room } from "@/types/room";
import { useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router";

export const RoomLayout = () => {
  const room = useLoaderData<Room>();
  const user = useAppSelector((state) => state.user.user);

  const [session, setSession] = useState<RoomSession | null>(null);

  useEffect(() => {
    if (!user) return;
    const sessionInstance = new RoomSession();
    setSession(sessionInstance);

    initRoom(room.id, {
      localState: sessionInstance.localState,
      rtc: sessionInstance.webrtc,
    });

    return () => {
      disposeRoom();
    };
  }, [room.id, user]);

  useEffect(() => {
    if (session) {
      session.localState.setRoom(room);
      console.log("Room READY");
    }
  }, [room, session]);

  if (!session) return null;

  return (
    <RoomSessionContext.Provider value={session}>
      <Outlet />
    </RoomSessionContext.Provider>
  );
};
