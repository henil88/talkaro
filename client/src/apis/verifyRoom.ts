import api from "@/libs/axios";

type ReturnValue = { room: { id: string } | null; active?: boolean };

export const verifyRoom = async (
  roomId: string | undefined,
): Promise<ReturnValue> => {
  if (!roomId) return { room: null };

  try {
    const { success }: { success: boolean } = await api.get(
      `/api/verify/${roomId}`,
    );

    if (!success) return { active: false, room: null };

    return { room: { id: roomId }, active: true };
  } catch {
    return { active: false, room: null };
  }
};
