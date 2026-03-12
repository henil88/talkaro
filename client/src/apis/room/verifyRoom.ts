import api from "@/libs/axios";

type Room = {
  _id: string,
  roomType: string;
  topic: string;
}

type ReturnValue =
  | {
      room: Room;
      status: "active";
    }
  | {
      status: "inactive";
    };

type ResponseType =
  | {
      success: true;
      room: Room;
    }
  | {
      success: false;
    };

export const verifyRoom = async (roomId: string): Promise<ReturnValue> => {
  try { 
    const { data: result } = await api.get<ResponseType>(
      `/api/verify/${roomId}`,
    );
    if (!result.success) return { status: "inactive" };
    return { room: result.room, status: "active" };
  } catch (error) {
    console.error("Error verifying room:", error);
    return { status: "inactive" };
  }
};
