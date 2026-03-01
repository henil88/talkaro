type SettingsType = {
  username: string;
  avatar: string;
  muted: boolean;
};

export type PeerSettingsType = SettingsType;

export type UserSettingsType = Pick<SettingsType, "muted">;
