import streamIcon from "@/assets/streaming-icon.png";
import image01 from "@/assets/image01.jpg";
import image02 from "@/assets/image02.jpg";
import {
  type ChangeEvent,
  type FC,
  useCallback,
  useMemo,
  useState,
} from "react";
import RoomPreviewCard from "./RoomPreviewCard";

interface DashboardHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onStartRoom: () => void;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  searchValue,
  onSearchChange,
  onStartRoom,
}) => {
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange]
  );

  return (
    <header className="flex h-30 items-center justify-between py-4">
      <div className="flex items-center gap-6">
        <div className="relative text-xl font-semibold">
          <span>All voice rooms</span>
          <div className="absolute left-0 top-full mt-2 h-1 w-1/2 bg-blue-500" />
        </div>
        <div className="flex h-10 w-80 items-center overflow-hidden rounded-full bg-neutral-800">
          <label
            htmlFor="search"
            className="select-none pl-3 text-lg opacity-70"
          >
            🔍
          </label>
          <input
            id="search"
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            className="h-full w-full bg-transparent pl-2 outline-none"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onStartRoom}
        className="flex cursor-pointer items-center gap-2 rounded-full bg-green-500 px-5 py-2.5"
      >
        <img src={streamIcon} alt="Streaming Icon" className="w-5" />
        <span>Start a room</span>
      </button>
    </header>
  );
};

interface Member {
  name: string;
  avatar?: string;
}

interface Rooms {
  title: string;
  members: Member[];
  count?: number;
}

interface RoomListProps {
  rooms: Rooms[];
}

const RoomList: FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="h-full w-full hide-scrollbar">
      <div className="flex w-full flex-wrap gap-10">
        {rooms.map((value) => (
          <RoomPreviewCard {...value} />
        ))}
      </div>
    </div>
  );
};

const generateRoomIndices = (count: number): Rooms[] => {
  return Array.from({ length: count }, () => {
    return {
      title: "Who is known as the \"father of the computer\"?",
      members: [
        { name: "Maren Chan", avatar: image01 },
        { name: "Wyatt Callahan", avatar: image02 },
      ],
    };
  });
};

function Dashboard() {
  const [searchValue, setSearchValue] = useState("");

  /** dummy  */
  const rooms = useMemo(() => generateRoomIndices(100), []);

  const handleStartRoom = useCallback(() => {
    // Intentionally left empty to preserve existing behavior
  }, []);

  return (
    <section className="flex h-full w-full flex-col gap-6">
      <DashboardHeader
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onStartRoom={handleStartRoom}
      />
      <RoomList rooms={rooms} />
    </section>
  );
}

export default Dashboard;
