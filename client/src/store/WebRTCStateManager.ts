import type { PeerSettingsType } from "@/types/settingsType";
import type { WebRTCSnapshot } from "@/types/storeSnapshot";
import { produce } from "immer";
import { ExternalStore } from "./externalStore";

export class WebRTCStateManager extends ExternalStore<WebRTCSnapshot> {
  // Non-reactive runtime state
  private peers = new Map<string, RTCPeerConnection>();
  private pendingIce = new Map<string, RTCIceCandidateInit[]>();

  // Reactive state (source of truth)
  private state = {
    remoteStreams: new Map<string, MediaStream>(),
    peerSettings: new Map<string, PeerSettingsType>(),
  };

  constructor() {
    super({
      remoteStreams: new Map(),
      peerSettings: new Map(),
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
      draft.remoteStreams.delete(id);
      draft.peerSettings.delete(id);
    });
  }

  getPeer(id: string) {
    return this.peers.get(id);
  }

  /* ---------------- Streams ---------------- */

  attachRemoteStream(id: string, stream: MediaStream) {
    this.updateState((draft) => {
      draft.remoteStreams.set(id, stream);
    });
  }

  detachRemoteStream(id: string) {
    this.updateState((draft) => {
      draft.remoteStreams.delete(id);
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
    if (!pc) return;

    const queue = this.pendingIce.get(id);
    if (!queue) return;

    for (const c of queue) {
      await pc.addIceCandidate(c);
    }

    this.pendingIce.delete(id);
  }

  /* ---------------- Peer Settings ---------------- */

  setPeerSettings(id: string, settings: PeerSettingsType) {
    this.updateState((draft) => {
      draft.peerSettings.set(id, settings);
    });
  }

  /* ---------------- Internal State Update ---------------- */

  private updateState(
    recipe: (draft: WebRTCSnapshot) => void
  ) {
    const next = produce(this.state, recipe);
    this.state = next;

    // Emit new snapshot with fresh Map references
    this.setSnapshot({
      remoteStreams: new Map(next.remoteStreams),
      peerSettings: new Map(next.peerSettings),
    });
  }
}

export const webrtcManager = new WebRTCStateManager();