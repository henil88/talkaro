import type { LocalStateManager } from "@/store/LocalStateManager";
import type { Socket } from "socket.io-client";
import type SignalingTransport from "./SignalingTransport";
import type { AnswerSignal, IceSignal, OfferSignal } from "./types";
import { store } from "@/store";
import type { SettingsType } from "@/types/settingsType";

export class SocketSignalingService implements SignalingTransport {
  private socket: Socket | null = null;
  private readonly state: LocalStateManager;

  constructor(state: LocalStateManager) {
    this.state = state;
  }

  async connect() {
    const url: string | undefined = import.meta.env.VITE_BACKEND_URL;
    const state = store.getState();
    const token = state.auth?.token;
    if (!url)
      throw new Error(
        "VITE_SOCKET_SERVER_URL environment variable is not defined",
      );
    const socket = await this.state.connect("http://localhost:3000", {
      withCredentials: true,
      auth: { token },
      transports: ["websocket"],
    });
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
    this.socket?.emit("join", roomId);
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

  // New method: Send peer settings to the server and broadcast
  sendPeerSettings(to: string, settings: SettingsType): void {
    if (!this.socket?.id) return;

    const payload = {
      to,
      settings,
    };

    this.socket?.emit("peer-settings", payload);
  }

  onJoined(cb: (id: string) => void): void {
    this.socket?.on("joined", (ids: string[]) => {
      ids.forEach(cb);
    });
  }

  onPeerSettings(cb: (peerId: string, settings: SettingsType) => void): void {
    this.socket?.on(
      "peer-settings",
      (data: { from: string; settings: SettingsType }) => {
        cb(data.from, data.settings);
      },
    );
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
