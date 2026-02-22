import { localStateManager } from "@/store/LocalStateManager";
import type { LocalSnapshot } from "@/types/storeSnapshot";
import { useSyncExternalStore } from "react";

const subscribe = localStateManager.subscribe;
const getSnapshot = localStateManager.getSnapshot;

export function useLocalState<T>(selector: (state: LocalSnapshot) => T) {
  return useSyncExternalStore(subscribe, () => selector(getSnapshot()));
}
