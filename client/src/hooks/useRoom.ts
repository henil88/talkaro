import { useState } from "react";

function useRoom() {
  const [rooms, setRooms] = useState(null);

  return { rooms, setRooms };
}

export default useRoom;
