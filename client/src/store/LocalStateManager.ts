import type { Room } from "@/types/room";
import type { UserSettingsType } from "@/types/settingsType";
import type { LocalSnapshot } from "@/types/storeSnapshot";
import { produce } from "immer";
import {
  io,
  Socket,
  type ManagerOptions,
  type SocketOptions,
} from "socket.io-client";
import { ExternalStore } from "./externalStore";

export class LocalStateManager extends ExternalStore<LocalSnapshot> {
  private socketRef: Socket | null = null;

  constructor() {
    super({
      localStream: null,
      userSettings: {
        muted: true,
      },
      room: null,
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

  /* ---------------- Room ---------------- */

  setRoom(room: Room) {
    this.updateState((draft) => {
      draft.room = room;
    });
  }

  /* ---------------- Update ---------------- */

  updateUserSettings(recipe: (draft: UserSettingsType) => void) {
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

    const next = {
      localStream: null,
      userSettings: {
        muted: true,
      },
      room: null,
    };

    this.setSnapshot(next);
  }
}

export const localStateManager = new LocalStateManager();
