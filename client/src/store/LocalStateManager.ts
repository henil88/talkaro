import type { LocalSnapshot } from "@/types/storeSnapshot";
import { ExternalStore } from "./externalStore";
import {
  io,
  Socket,
  type ManagerOptions,
  type SocketOptions,
} from "socket.io-client";
import type { UserSettingsType } from "@/types/settingsType";
import { produce } from "immer";

class LocalStateManager extends ExternalStore<LocalSnapshot> {
  private socketRef: Socket | null = null;

  private state: LocalSnapshot = {
    localStream: null,
    userSettings: {
      muted: true,
      username: "",
    },
  };

  constructor() {
    super({
      localStream: null,
      userSettings: {
        muted: true,
        username: "",
      },
    });
  }

  /* ---------------- Socket ---------------- */

  connect(url: string, opts?: Partial<ManagerOptions & SocketOptions>) {
    if (this.socketRef) return this.socketRef;
    this.socketRef = io(url, opts);
    return this.socketRef;
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

  /* ---------------- User Settings ---------------- */

  updateUserSettings(recipe: (draft: UserSettingsType) => void) {
    this.updateState((draft) => {
      recipe(draft.userSettings);
    });
  }

  private updateState(recipe: (draft: LocalSnapshot) => void) {
    const next = produce(this.state, recipe);
    this.state = next;
    this.setSnapshot(next);
  }
}

export const localStateManager = new LocalStateManager();
