import { SocketSignalingService } from "@/infrastructure/signaling/SocketSignalingService";
import { WebRTCOrchestrator } from "@/infrastructure/webrtc/WebRTCOrchestrator";
import { RoomRuntime } from "./RoomRuntime";
import type { LocalStateManager } from "@/store/LocalStateManager";
import type { WebRTCStateManager } from "@/store/WebRTCStateManager";

let runtime: RoomRuntime | null = null;

export function initRoom(
  roomId: string,
  store: { localState: LocalStateManager; rtc: WebRTCStateManager },
) {
  if (runtime) return runtime;

  runtime = new RoomRuntime({
    roomId,
    signaling: new SocketSignalingService(store.localState),
    rtc: new WebRTCOrchestrator(store.rtc),
    store
  });

  runtime.start();

  return runtime;
}

export function disposeRoom() {
  runtime?.dispose();
  runtime = null;
}
