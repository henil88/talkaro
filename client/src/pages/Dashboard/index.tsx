import { type FC, memo, useCallback, useEffect, useState } from "react";
import RoomPreviewCard from "@/components/Dashboard/RoomPreviewCard";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import useOverlay from "@/hooks/useOverlay";
import OverlayPanel from "@/components/Dashboard/OverlayPanel";
import { fetchRooms } from "@/apis/room/fetchRooms";

/* =======================
 * Types
 * ======================= */

interface Member {
  name: string;
  avatar?: string;
}

interface Room {
  title: string;
  link: string;
  members: Member[];
  count?: number;
}

interface RoomListProps {
  rooms: readonly Room[];
}

/* =======================
 * Components
 * ======================= */

const RoomList: FC<RoomListProps> = memo(({ rooms }) => {
  return (
    <div className="h-full w-full hide-scrollbar">
      <div className="flex w-full flex-wrap gap-10">
        {rooms.length === 0 && (
          <p className="w-full text-center">
            No active rooms yet. Be the first to start a conversation!
          </p>
        )}
        {rooms.map((room, idx) => (
          <RoomPreviewCard key={idx} className="flex-1" {...room} />
        ))}
      </div>
    </div>
  );
});

/* =======================
 * Page
 * ======================= */

function Dashboard() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { panel, open, close } = useOverlay();

  const handleStartRoom = useCallback(() => open("room"), [open]);

  const handleSearchChange = useCallback((value: string): void => {
    setSearchValue(value);
  }, []);

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const loadRooms = async () => {
      const fetchedRooms = await fetchRooms();
      const roomsData = fetchedRooms.map((room) => ({
        title: room.topic,
        link: `/room/${room._id}`,
        members: room.speakers.map((speaker) => ({
          name: speaker.name,
          avatar: speaker.avatar,
        })),
        count: room.speakers.length,
      }));
      setRooms(roomsData);
    };

    loadRooms();
  }, []);

  return (
    <section className="flex h-full w-full flex-col gap-6">
      <DashboardHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onStartRoom={handleStartRoom}
      />
      <RoomList rooms={rooms} />
      {panel === "room" && <OverlayPanel onClose={close} />}
    </section>
  );
}

export default Dashboard;

export const Component = Dashboard;
