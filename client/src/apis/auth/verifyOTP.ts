import type { AxiosError } from "axios";
import api from "@/libs/axios";
import { setToken } from "@/features/auth/slice";
import { store } from "@/store";

interface Params {
  identifier: Identifier;
  otp: string;
}

type Identifier =
  | {
      email: string;
    }
  | {
      phone: string;
    };

type RejectedResponse = { message: string };
type FulfilledResponse = { accessToken: string; isAuthorized: boolean };
type Result = { token: string; isAuthorized: boolean };

export const verifyOTP = async ({
  identifier,
  otp,
}: Params): Promise<Result> => {
  if (!identifier || !otp)
    throw new Error("Neither identifier or otp was provided.");

  try {
    const { data } = await api.post<FulfilledResponse>("/api/verify-otp", {
      ...identifier,
      otp,
    });

    const result: Result = {
      token: data.accessToken,
      isAuthorized: data.isAuthorized,
    };

    store.dispatch(setToken(result));
    return result;
  } catch (err) {
    const errMsg =
      ((err as AxiosError)?.response?.data as RejectedResponse)?.message ||
      "Error sending OTP";
    console.error("ERROR_VERIFYING_OTP", errMsg);
    throw err;
  }
};
