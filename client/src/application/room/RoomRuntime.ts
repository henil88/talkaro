import type SignalingTransport from "@/infrastructure/signaling/SignalingTransport";
import type { WebRTCOrchestrator } from "@/infrastructure/webrtc/WebRTCOrchestrator";
import {
  LocalStateManager,
} from "@/store/LocalStateManager";
import { WebRTCStateManager } from "@/store/WebRTCStateManager";
import type { SettingsType } from "@/types/settingsType";

export class RoomRuntime {
  private disposed = false;

  private readonly roomId: string;
  private readonly signaling: SignalingTransport;
  private readonly rtc: WebRTCOrchestrator;
  private readonly store: {
    localState: LocalStateManager;
    rtc: WebRTCStateManager;
  };

  constructor({
    roomId,
    signaling,
    rtc,
    store,
  }: {
    roomId: string;
    signaling: SignalingTransport;
    rtc: WebRTCOrchestrator;
    store: { localState: LocalStateManager; rtc: WebRTCStateManager };
  }) {
    this.roomId = roomId;
    this.signaling = signaling;
    this.rtc = rtc;
    this.store = store;
  }

  async start() {
    this.signaling.connect();

    const stream = await this.store.localState.requestMedia({
      audio: true,
      video: false,
    });

    this.rtc.setLocalStream(stream);

    this.wireEvents();
    this.bindRtcEvents();
    this.signaling.sendJoin(this.roomId);
  }

  private bindRtcEvents() {
    this.rtc.onIce((peerId, ice) => {
      this.signaling.sendIce(peerId, ice);
    });

    this.rtc.onOffer((peerId, sdp) => {
      this.signaling.sendOffer(peerId, sdp);
    });

    this.rtc.onAnswer((peerId, sdp) => {
      this.signaling.sendAnswer(peerId, sdp);
    });

    // New Event: Emit peer settings when WebRTC connection is established
    this.rtc.onConnected((peerId) => {
      const peerSettings = this.getPeerSettings(); // Get peer settings from local state or user settings
      this.signaling.sendPeerSettings(peerId, peerSettings); // Send settings to peer
    });
  }

  private wireEvents() {
    this.signaling.onJoined((peerId) => {
      this.rtc.createPeer(peerId, true);
    });

    this.signaling.onOffer((from, sdp) => {
      this.rtc.handleOffer(from, sdp);
    });

    this.signaling.onAnswer((from, sdp) => {
      this.rtc.handleAnswer(from, sdp);
    });

    this.signaling.onIce((from, ice) => {
      this.rtc.handleIce(from, ice);
    });

    // Receive and apply peer settings from other peers
    this.signaling.onPeerSettings((peerId, settings) => {
      this.applyPeerSettings(peerId, settings);
    });

    this.signaling.onPeerLeft((id) => {
      this.store.rtc.removePeer(id);
    });
  }

  // Add method to retrieve peer settings
  private getPeerSettings() {
    return this.store.localState.getSnapshot().userSettings;
  }

  // Method to apply received peer settings (e.g., mute/unmute, update avatar)
  private applyPeerSettings(peerId: string, settings: SettingsType) {
    this.store.rtc.setPeerSettings(peerId, settings);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;

    this.signaling.disconnect();
    this.rtc.dispose();
  }
}
