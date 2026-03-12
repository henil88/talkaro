import type { Room } from "@/types/room";
import type { SettingsType } from "@/types/settingsType";
import type { LocalSnapshot } from "@/types/storeSnapshot";
import { produce } from "immer";
import {
  type Socket,
  type ManagerOptions,
  type SocketOptions,
} from "socket.io-client";
import { ExternalStore } from "./externalStore";
import { store } from "./";

export class LocalStateManager extends ExternalStore<LocalSnapshot> {
  private socketRef: Socket | null = null;

  constructor() {
    super(getDefaultSettings());
  }

  /* ---------------- Socket ---------------- */

  async connect(
    url: string,
    opts?: Partial<ManagerOptions & SocketOptions>,
  ): Promise<Socket> {
    if (this.socketRef) return this.socketRef;
    return new Promise((resolve, reject) => {
      import("socket.io-client").then(({ io }) => {
        const s = io(url, opts);
        s.on("connect", () => resolve(s));
        s.on("connect_error", (e) => reject(e));
        this.socketRef = s;
      });
    });
  }

  get socket() {
    return this.socketRef;
  }

  /* ---------------- Media ---------------- */

  async requestMedia(constraints: MediaStreamConstraints) {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    this.updateState((draft) => {
      draft.localStream = stream;
    });

    return stream;
  }

  /* ---------------- Room ---------------- */

  setRoom(room: Room) {
    this.updateState((draft) => {
      draft.room = room;
    });
  }

  /* ---------------- Update ---------------- */

  updateUserSettings(recipe: (draft: SettingsType) => void) {
    this.updateState((draft) => {
      recipe(draft.userSettings);
    });
  }

  private updateState(recipe: (draft: LocalSnapshot) => void) {
    const next = produce(this.getSnapshot(), recipe);
    this.setSnapshot(next);
  }

  /* ---------------- Cleanup ---------------- */

  dispose() {
    if (this.getSnapshot().localStream) {
      this.getSnapshot()
        .localStream?.getTracks()
        .forEach((t) => t.stop());
    }

    if (this.socketRef) {
      this.socketRef.disconnect();
      this.socketRef = null;
    }

    const next = getDefaultSettings();

    this.setSnapshot(next);
  }
}

function getDefaultSettings(): LocalSnapshot {
  const user = store.getState().user.user;
  if (!user) throw new Error("User doesn't exist");
  return {
    localStream: null,
    userSettings: {
      avatar: user.avatar,
      username: user.name,
      muted: true,
    },
    room: null,
  };
}
