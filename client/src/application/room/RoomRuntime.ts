import type SignalingTransport from "@/infrastructure/signaling/SignalingTransport";
import type { WebRTCOrchestrator } from "@/infrastructure/webrtc/WebRTCOrchestrator";
import { localStateManager } from "@/store/LocalStateManager";
import { webrtcManager } from "@/store/WebRTCStateManager";

export class RoomRuntime {
  private disposed = false;

  private readonly roomId: string;
  private readonly signaling: SignalingTransport;
  private readonly rtc: WebRTCOrchestrator;

  constructor(
    roomId: string,
    signaling: SignalingTransport,
    rtc: WebRTCOrchestrator,
  ) {
    this.roomId = roomId;
    this.signaling = signaling;
    this.rtc = rtc;
  }

  async start() {
    this.signaling.connect();

    const stream = await localStateManager.requestMedia({
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
  }

  private wireEvents() {
    this.signaling.onPeerJoined((peerId) => {
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

    this.signaling.onPeerLeft((id) => {
      webrtcManager.removePeer(id);
    });
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;

    this.signaling.disconnect();
    this.rtc.dispose();
  }
}
