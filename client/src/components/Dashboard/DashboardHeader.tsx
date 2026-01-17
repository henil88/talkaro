import streamIcon from "@/assets/streaming-icon.png";
import {
  memo,
  useCallback,
  type ChangeEvent,
  type FC,
} from "react";

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
  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange],
  );

  const handleStartRoomClick = useCallback(() => {
    onStartRoom();
  }, [onStartRoom]);

  return (
    <header
      className="
        grid gap-4 py-4
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-[auto_1fr_auto]
        items-center
      "
    >
      {/* Title */}
      <div className="relative w-fit text-xl font-semibold">
        <span>All voice rooms</span>
        <div className="absolute left-0 top-full mt-2 h-1 w-1/2 bg-blue-500" />
      </div>

      {/* Search */}
      <div
        className="
          mt-4 flex h-10 w-full items-center overflow-hidden rounded-full bg-neutral-800
          md:m-0
          md:col-span-2
          lg:col-span-1 lg:w-80 lg:justify-self-start
        "
      >
        <label
          htmlFor="dashboard-search"
          className="pl-3 opacity-70"
          aria-label="Search rooms"
        >
          🔍
        </label>
        <input
          id="dashboard-search"
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          className="h-full w-full bg-transparent pl-2 outline-none"
        />
      </div>

      {/* Start Room Button */}
      <button
        type="button"
        onClick={handleStartRoomClick}
        className="
          flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5
          justify-self-start cursor-pointer
          md:col-start-2 md:row-start-1 md:justify-self-end
          lg:col-start-3 lg:justify-self-end
        "
      >
        <img
          src={streamIcon}
          alt="Streaming Icon"
          className="w-5"
          loading="lazy"
        />
        <span>Start a room</span>
      </button>
    </header>
  );
};

export default memo(DashboardHeader);
