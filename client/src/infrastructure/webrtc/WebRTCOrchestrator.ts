import { webrtcManager } from "@/store/WebRTCStateManager";
import freeice from "freeice";
import WebRTCOutboundEvents from "./WebRTCOutboundEvents";

export class WebRTCOrchestrator extends WebRTCOutboundEvents {
  private localStream: MediaStream | null = null;

  setLocalStream(stream: MediaStream) {
    this.localStream = stream;
  }

  createPeer(peerId: string, isInitiator?: boolean) {
    const iceServers = freeice();
    const pcConfig: RTCConfiguration = {
      iceServers: iceServers,
    };

    const pc = new RTCPeerConnection(pcConfig);

    webrtcManager.addPeer(peerId, pc);

    this.localStream
      ?.getTracks()
      .forEach((t) => pc.addTrack(t, this.localStream!));

    pc.ontrack = (e) => {
      webrtcManager.attachRemoteStream(peerId, e.streams[0]);
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        this.sendIceCandidate(peerId, e.candidate);
      }
    };

    if (isInitiator) {
      this.sendOffer(peerId, pc);
    }

    return pc;
  }

  async sendOffer(to: string, pc: RTCPeerConnection) {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    this.offerHandler?.(to, offer);
  }

  async sendAnswer(to: string, pc: RTCPeerConnection) {
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    this.answerHandler?.(to, answer);
  }

  sendIceCandidate(to: string, ice: RTCIceCandidateInit) {
    this.iceHandler?.(to, ice);
  }

  async handleOffer(from: string, sdp: RTCSessionDescriptionInit) {
    const pc = this.ensurePeer(from);
    await pc.setRemoteDescription(sdp);
    await webrtcManager.flushIce(from);

    this.sendAnswer(from, pc);
  }

  async handleAnswer(from: string, sdp: RTCSessionDescriptionInit) {
    const pc = webrtcManager.getPeer(from);
    if (!pc) return;

    await pc.setRemoteDescription(sdp);
    await webrtcManager.flushIce(from);
  }

  async handleIce(from: string, ice: RTCIceCandidateInit) {
    const pc = webrtcManager.getPeer(from);
    if (!pc || !pc.remoteDescription) {
      webrtcManager.queueIce(from, ice);
      return;
    }
    await pc.addIceCandidate(ice);
  }

  ensurePeer(id: string) {
    let pc = webrtcManager.getPeer(id);
    if (!pc) pc = this.createPeer(id);
    return pc;
  }

  dispose() {
    // WebRTC Orchestrator dispose method don't have anything to dispose
  }
}
