import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { store } from "@/store";

/**
 * signupProtectedLoader
 * Use inside route definitions for the signup route:
 * loader: signupProtectedLoader(async (args) => { ... })
 */
export const signupProtectedLoader = (
  innerLoader?: (args: LoaderFunctionArgs) => Promise<unknown>
) => {
  return async (args: LoaderFunctionArgs) => {
    const state = store.getState();
    const { isAuthorized } = state.auth;
    const { isActivated } = state.user;
    if (!isAuthorized) throw redirect("/auth");
    if (isAuthorized && !isActivated) return null;
    if (innerLoader) return innerLoader(args);
    return null;
  };
};
