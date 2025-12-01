import type { Store } from "@reduxjs/toolkit";
import { setAuthToken, registerLogoutHandler } from "./axios";
import { logout } from "../features/auth/slice";

export function setupAxiosWithStore(store: Store) {
  // Sync token from Redux to axios
  store.subscribe(() => {
    const token = store.getState().auth.token;
    setAuthToken(token);
  });

  // Let axios trigger logout
  registerLogoutHandler(() => {
    store.dispatch(logout());
  });
}
