import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { store } from "@/store";

export const signupProtectedLoader = (
  innerLoader?: (args: LoaderFunctionArgs) => Promise<unknown>
) => {
  return async (args: LoaderFunctionArgs) => {
    const { auth, user } = store.getState();

    if (!auth.isAuthorized) throw redirect("/auth");
    if (!user.isActivated) return null;

    return innerLoader ? innerLoader(args) : redirect("/app");
  };
};
