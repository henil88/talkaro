import { useWebRTC } from "./useWebRTC";

export function useRemoteStream(peerId: string) {
  return useWebRTC((state) => state.remoteStreams.get(peerId));
}
