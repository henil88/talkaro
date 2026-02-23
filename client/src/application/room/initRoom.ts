import { SocketSignalingService } from "@/infrastructure/signaling/SocketSignalingService";
import { WebRTCOrchestrator } from "@/infrastructure/webrtc/WebRTCOrchestrator";
import { localStateManager } from "@/store/LocalStateManager";
import { RoomRuntime } from "./RoomRuntime";

let runtime: RoomRuntime | null = null;

export function initRoom(roomId: string) {
  if (runtime) return runtime;

  runtime = new RoomRuntime(
    roomId,
    new SocketSignalingService(localStateManager),
    new WebRTCOrchestrator(),
  );

  runtime.start();
  return runtime;
}

export function disposeRoom() {
  runtime?.dispose();
  runtime = null;
}
