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
        // attach ice candidates to webrtc manager
        this.onIceCandidate(peerId, e.candidate);
      }
    };

    if (isInitiator) {
      // create offer based on isInitiator
      this.createOffer(peerId, pc);
    }

    return pc;
  }
  
  async createOffer(to: string, pc: RTCPeerConnection) {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    this.offerHandler?.(to, offer);
  }
  
  async createAnswer(to: string, pc: RTCPeerConnection) {
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    this.answerHandler?.(to, answer);
  }

  // Doubt - need to re-check
  async handleOffer(from: string, sdp: RTCSessionDescriptionInit) {
    const pc = this.ensurePeer(from);
    await pc.setRemoteDescription(sdp);
    await webrtcManager.flushIce(from);

    this.createAnswer(from, pc);
  }

  async handleAnswer(from: string, sdp: RTCSessionDescriptionInit) {
    const pc = webrtcManager.getPeer(from);
    if (!pc) return;

    await pc.setRemoteDescription(sdp);
    await webrtcManager.flushIce(from);
  }

  handleIce(from: string, ice: RTCIceCandidateInit) {
    const pc = webrtcManager.getPeer(from);
    if (!pc || !pc.remoteDescription) {
      webrtcManager.queueIce(from, ice);
      return;
    }
    pc.addIceCandidate(ice);
  }

  onIceCandidate(to: string, ice: RTCIceCandidateInit) {
    this.iceHandler?.(to, ice);
  }

  ensurePeer(id: string) {
    let pc = webrtcManager.getPeer(id);
    if (!pc) pc = this.createPeer(id);
    return pc;
  }
  
  dispose() {
    
  }
}
