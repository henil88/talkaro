import { LocalStateManager } from "@/store/LocalStateManager";
import { WebRTCStateManager } from "@/store/WebRTCStateManager";

export class RoomSession {
  readonly localState: LocalStateManager;
  readonly webrtc: WebRTCStateManager;
  constructor() {
    this.localState = new LocalStateManager();
    this.webrtc = new WebRTCStateManager();
  }

  dispose() {
    this.localState.dispose();
  }
}
