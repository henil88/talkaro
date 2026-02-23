import type { LocalStateManager } from "@/store/LocalStateManager";
import type { Socket } from "socket.io-client";
import type SignalingTransport from "./SignalingTransport";
import type { AnswerSignal, IceSignal, OfferSignal } from "./types";

export class SocketSignalingService implements SignalingTransport {
  private socket: Socket | null = null;
  private readonly state: LocalStateManager;
  
  constructor(state: LocalStateManager) {
    this.state = state;
  }

  connect(): void {
    const url: string | undefined = import.meta.env.VITE_SOCKET_SERVER_URL;
    if (!url)
      throw new Error(
        "VITE_SOCKET_SERVER_URL environment variable is not defined",
      );
    const socket = this.state.connect(url, { withCredentials: true });
    this.socket = socket;
  }

  disconnect(): void {
    if (!this.socket) return;
    this.socket.emit("leave");

    this.socket.off("joined");
    this.socket.off("offer");
    this.socket.off("answer");
    this.socket.off("ice");
    this.socket.off("peer-left");
    this.socket.off("disconnect");

    // Testing Case
    this.state.dispose();
  }

  sendJoin(roomId: string): void {
    this.socket?.emit("peer-joined", roomId);
  }

  sendOffer(to: string, sdp: RTCSessionDescriptionInit): void {
    if (!this.socket?.id) return;

    const payload: OfferSignal = {
      type: "offer",
      from: this.socket.id,
      to,
      sdp,
    };

    this.socket?.emit("offer", payload);
  }

  sendAnswer(to: string, sdp: RTCSessionDescriptionInit): void {
    if (!this.socket?.id) return;

    const payload: AnswerSignal = {
      type: "answer",
      from: this.socket.id,
      to,
      sdp,
    };

    this.socket?.emit("answer", payload);
  }

  sendIce(to: string, ice: RTCIceCandidateInit): void {
    if (!this.socket?.id) return;

    const payload: IceSignal = {
      type: "ice",
      from: this.socket.id,
      to,
      canadidate: ice,
    };

    this.socket?.emit("ice", payload);
  }

  onJoined(cb: (id: string) => void): void {
    this.socket?.on("joined", (ids: string[]) => {
      ids.forEach(cb);
    });
  }

  onPeerLeft(cb: (id: string) => void): void {
    this.socket?.on("peer-left", (id: string) => cb(id));
  }

  onOffer(cb: (from: string, sdp: RTCSessionDescriptionInit) => void): void {
    this.socket?.on("offer", (msg: OfferSignal) => {
      cb(msg.from, msg.sdp);
    });
  }

  onAnswer(cb: (from: string, sdp: RTCSessionDescriptionInit) => void): void {
    this.socket?.on("answer", (msg: AnswerSignal) => {
      cb(msg.from, msg.sdp);
    });
  }

  onIce(cb: (from: string, ice: RTCIceCandidateInit) => void): void {
    this.socket?.on("ice", (msg: IceSignal) => {
      cb(msg.from, msg.canadidate);
    });
  }
}
