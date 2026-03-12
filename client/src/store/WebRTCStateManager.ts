import type { SettingsType } from "@/types/settingsType";
import type { WebRTCSnapshot } from "@/types/storeSnapshot";
import { produce } from "immer";
import { ExternalStore } from "./externalStore";

export class WebRTCStateManager extends ExternalStore<WebRTCSnapshot> {
  // Non-reactive runtime state
  private peers = new Map<string, RTCPeerConnection>();
  private pendingIce = new Map<string, RTCIceCandidateInit[]>();

  constructor() {
    super({
      remoteStreams: {},
      peerSettings: {},
    });
  }

  /* ---------------- Peer Management ---------------- */

  addPeer(id: string, pc: RTCPeerConnection) {
    this.peers.set(id, pc);
  }

  removePeer(id: string) {
    this.peers.get(id)?.close();
    this.peers.delete(id);
    this.pendingIce.delete(id);

    this.updateState((draft) => {
      delete draft.remoteStreams[id];
      delete draft.peerSettings[id];
    });
  }

  getPeer(id: string) {
    return this.peers.get(id);
  }

  /* ---------------- Streams ---------------- */

  attachRemoteStream(id: string, stream: MediaStream) {
    this.updateState((draft) => {
      draft.remoteStreams[id] = stream;
    });
  }

  detachRemoteStream(id: string) {
    this.updateState((draft) => {
      delete draft.remoteStreams[id];
    });
  }

  /* ---------------- ICE Queue (non-reactive) ---------------- */

  queueIce(id: string, candidate: RTCIceCandidateInit) {
    if (!this.pendingIce.has(id)) {
      this.pendingIce.set(id, []);
    }
    this.pendingIce.get(id)!.push(candidate);
  }

  async flushIce(id: string) {
    const pc = this.peers.get(id);
    if (!pc || pc.signalingState === "closed") return;
    if (!pc.remoteDescription) return;

    const queue = this.pendingIce.get(id);
    if (!queue) return;

    for (const c of queue) {
      try {
        await pc.addIceCandidate(c);
      } catch (err) {
        console.error("ICE add Failed", err);
      }
    }

    this.pendingIce.delete(id);
  }

  /* ---------------- Peer Settings ---------------- */

  setPeerSettings(id: string, settings: SettingsType) {
    this.updateState((draft) => {
      draft.peerSettings[id] = settings;
    });
  }

  /* ---------------- Internal State Update ---------------- */

  private updateState(recipe: (draft: WebRTCSnapshot) => void) {
    const next = produce(this.getSnapshot(), recipe);
    this.setSnapshot(next);
  }
}
