import type { SettingsType } from "@/types/settingsType";

export default interface SignalingTransport {
  connect(): void;
  disconnect(): void;

  sendJoin(roomId: string): void;
  sendOffer(to: string, sdp: RTCSessionDescriptionInit): void;
  sendAnswer(to: string, sdp: RTCSessionDescriptionInit): void;
  sendPeerSettings(to: string, settings: SettingsType): void;
  sendIce(to: string, ice: RTCIceCandidateInit): void;

  onJoined(cb: (id: string) => void): void;
  onPeerLeft(cb: (id: string) => void): void;
  onPeerSettings(cb: (id: string, settings: SettingsType) => void): void;
  onOffer(cb: (from: string, sdp: RTCSessionDescriptionInit) => void): void;
  onAnswer(cb: (from: string, sdp: RTCSessionDescriptionInit) => void): void;
  onIce(cb: (from: string, ice: RTCIceCandidateInit) => void): void;
}
