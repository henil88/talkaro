import { webrtcManager } from "@/store/WebRTCStateManager";
import type { WebRTCSnapshot } from "@/types/storeSnapshot";
import { useSyncExternalStore } from "react";

const subscribe = webrtcManager.subscribe;
const getSnapshot = webrtcManager.getSnapshot;

export function useWebRTC<T>(selector: (state: WebRTCSnapshot) => T) {
  return useSyncExternalStore(subscribe, () => selector(getSnapshot()));
}
