import { SocketSignalingService } from "@/infrastructure/signaling/SocketSignalingService";
import { WebRTCOrchestrator } from "@/infrastructure/webrtc/WebRTCOrchestrator";
import { RoomRuntime } from "./RoomRuntime";
import type { LocalStateManager } from "@/store/LocalStateManager";

let runtime: RoomRuntime | null = null;

export function initRoom(roomId: string, store: { localState: LocalStateManager }) {
  if (runtime) return runtime;

  runtime = new RoomRuntime(
    roomId,
    new SocketSignalingService(store.localState),
    new WebRTCOrchestrator(),
  );

  runtime.start();
  return runtime;
}

export function disposeRoom() {
  runtime?.dispose();
  runtime = null;
}
