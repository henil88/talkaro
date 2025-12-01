import type { AxiosError } from "axios";
import api from "../../lib/axios";
import { setToken } from "../../features/auth/slice";
import { store } from "../../store";

interface Params {
  identifier: string; // we can provide email or phone
  otp: string;
}

type RejectedError = unknown & AxiosError;
type RejectedResponse = { message: string };

type FulfilledResponse = { token: string; isAuthorized: boolean };

export const verifyOTP = async ({ identifier, otp }: Params) => {
  if (!identifier || !otp)
    throw new Error("Neither identifier or otp was provided.");
  try {
    const { data } = await api.post<FulfilledResponse>("/api/verify-otp", {
      identifier,
      otp,
    });
    store.dispatch(setToken(data));
    console.log("SUCCESS_VERIFYING_OTP", data);
    return data;
  } catch (err) {
    const errMsg =
      ((err as RejectedError)?.response?.data as RejectedResponse)?.message ||
      "Error sending OTP";
    console.error("ERROR_VERIFYING_OTP", errMsg);
    throw err;
  }
};
