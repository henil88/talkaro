import type { Room } from "./room";
import type { PeerSettingsType, UserSettingsType } from "./settingsType";

export type WebRTCSnapshot = {
  remoteStreams: Record<string, MediaStream>;
  peerSettings: Record<string, PeerSettingsType>;
};

export type LocalSnapshot = {
  localStream: MediaStream | null;
  userSettings: UserSettingsType;
  room: Room | null;
};
