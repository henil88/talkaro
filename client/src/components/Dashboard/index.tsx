import image01 from "@/assets/image01.jpg";
import image02 from "@/assets/image02.jpg";
import { type FC, memo, useCallback, useMemo, useState } from "react";
import RoomPreviewCard from "./RoomPreviewCard";
import DashboardHeader from "./DashboardHeader";

/* =======================
 * Types
 * ======================= */

interface Member {
  name: string;
  avatar?: string;
}

interface Room {
  title: string;
  members: Member[];
  count?: number;
}

interface RoomListProps {
  rooms: readonly Room[];
}

/* =======================
 * Utilities
 * ======================= */

const createDummyRooms = (count: number): Room[] =>
  Array.from({ length: count }, (_, index) => ({
    title: 'Who is known as the "father of the computer"?',
    members: [
      { name: "Maren Chan", avatar: image01 },
      { name: "Wyatt Callahan", avatar: image02 },
    ],
    count: Math.floor(Math.random() * (index + 1) + 2),
  }));

/* =======================
 * Hooks
 * ======================= */

const useRooms = (count: number): readonly Room[] => {
  return useMemo(() => createDummyRooms(count), [count]);
};

/* =======================
 * Components
 * ======================= */

const RoomList: FC<RoomListProps> = memo(({ rooms }) => {
  return (
    <div className="h-full w-full hide-scrollbar">
      <div className="flex w-full flex-wrap gap-10">
        {rooms.map((room, idx) => (
          <RoomPreviewCard key={idx} className="flex-1" {...room} />
        ))}
      </div>
    </div>
  );
});

RoomList.displayName = "RoomList";

/* =======================
 * Page
 * ======================= */

function Dashboard() {
  const [searchValue, setSearchValue] = useState<string>("");

  // Dummy data preserved intentionally
  const rooms = useRooms(100);

  const handleStartRoom = useCallback((): void => {
    // Intentionally left empty to preserve existing behavior
  }, []);

  const handleSearchChange = useCallback((value: string): void => {
    setSearchValue(value);
  }, []);

  return (
    <section className="flex h-full w-full flex-col gap-6">
      <DashboardHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onStartRoom={handleStartRoom}
      />
      <RoomList rooms={rooms} />
    </section>
  );
}

export default Dashboard;
