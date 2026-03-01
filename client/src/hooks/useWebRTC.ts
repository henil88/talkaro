import { useRoomSession } from "@/contexts/RoomSessionContext";
import type { WebRTCSnapshot } from "@/types/storeSnapshot";
import { useExternalStoreSelector } from "./useExternalStoreSelector";

export function useWebRTC<T>(selector: (state: WebRTCSnapshot) => T) {
  const { webrtc } = useRoomSession();
  return useExternalStoreSelector(webrtc, selector);
}
