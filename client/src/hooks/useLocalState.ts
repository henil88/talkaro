import { useRoomSession } from "@/contexts/RoomSessionContext";
import type { LocalSnapshot } from "@/types/storeSnapshot";
import { useExternalStoreSelector } from "./useExternalStoreSelector";

export function useLocalState<T>(selector: (state: LocalSnapshot) => T) {
  const { localState } = useRoomSession();
  return useExternalStoreSelector(localState, selector);
}
