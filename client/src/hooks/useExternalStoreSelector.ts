import { useSyncExternalStore } from "react";

export function useExternalStoreSelector<S, T>(
  store: {
    subscribe: (listeners: () => void) => () => void;
    getSnapshot: () => S;
  },
  selector: (state: S) => T,
) {
  return useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => selector(store.getSnapshot()),
  );
}
