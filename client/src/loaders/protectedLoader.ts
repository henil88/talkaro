import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { checkAuthorization } from "../utils/authUtils";
import api from "../lib/axios";
import { store } from "../store";

/**
 * protectedLoader
 * Use inside route definitions:
 * loader: protectedLoader(async (args) => { ... })
 */
export const protectedLoader = (
  innerLoader?: (args: LoaderFunctionArgs) => Promise<unknown>
) => {
  return async (args: LoaderFunctionArgs) => {
    const state = store.getState();
    const { isAuthorized } = state.auth;
    const { isActivated } = state.user;
    if (!isAuthorized || !isActivated) {
      const { isActivated, isAuthorized } = await checkAuthorization(api);
      if (!isAuthorized) throw redirect("/auth");
      if (!isActivated) throw redirect("/signup");
    }
    if (innerLoader) return innerLoader(args);
    return null;
  };
};
