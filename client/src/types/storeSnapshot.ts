import type { Room } from "./room";
import type { SettingsType } from "./settingsType";

export type WebRTCSnapshot = {
  remoteStreams: Record<string, MediaStream>;
  peerSettings: Record<string, SettingsType>;
};

export type LocalSnapshot = {
  localStream: MediaStream | null;
  userSettings: SettingsType;
  room: Room | null;
};
