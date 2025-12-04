import type { Store } from "@reduxjs/toolkit";
import { setAuthToken, registerLogoutHandler } from "./axios";
import { logout } from "@/features/auth/slice";

export function setupAxiosWithStore(store: Store) {
  store.subscribe(() => setAuthToken(store.getState().auth.token));
  registerLogoutHandler(() => store.dispatch(logout()));
}
