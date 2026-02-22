export default interface SignalingTransport {
  connect(): void;
  disconnect(): void;
  
  sendJoin(roomId: string): void;
  sendOffer(to: string, sdp: RTCSessionDescriptionInit): void;
  sendAnswer(to: string, sdp: RTCLocalSessionDescriptionInit): void;
  sendIce(to: string, ice: RTCIceCandidateInit): void;
  
  onPeerJoined(cb: (id: string) => void): void;
  onPeerLeft(cb: (id: string) => void): void;
  onOffer(cb: (from: string, sdp: RTCSessionDescriptionInit) => void): void;
  onAnswer(cb: (from: string, sdp: RTCSessionDescriptionInit) => void): void;
  onIce(cb: (from: string, ice: RTCIceCandidateInit) => void): void;
}