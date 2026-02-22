import type { PeerSettingsType, UserSettingsType } from "./settingsType";

export type WebRTCSnapshot = {
  remoteStreams: Map<string, MediaStream>;
  peerSettings: Map<string, PeerSettingsType>;
};

export type LocalSnapshot = {
  localStream: MediaStream | null;
  userSettings: UserSettingsType;
};
