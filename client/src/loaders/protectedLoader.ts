import api from "@/libs/axios";
import { store } from "@/store";
import { checkAuthorization } from "@/utils/authUtils";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";

export const protectedLoader = (
  innerLoader?: (args: LoaderFunctionArgs) => Promise<unknown>,
) => {
  return async (args: LoaderFunctionArgs) => {
    const { auth, user } = store.getState();
    if (!auth.isAuthorized || !user.isActivated) {
      const status = await checkAuthorization(api, { toast: true });
      if (!status.isAuthorized) throw redirect("/auth");
      if (!status.isActivated) throw redirect("/signup");
    }
    return innerLoader ? innerLoader(args) : null;
  };
};
