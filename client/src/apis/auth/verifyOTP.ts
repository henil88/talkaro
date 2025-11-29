import type { AxiosError } from "axios";
import api from "../../lib/axios";

interface Params {
  identifier: string; // we can provide email or phone
  otp: string;
}

type RejectedError = unknown & AxiosError;
type RejectedResponse = { message: string };

export const verifyOTP = async ({ identifier, otp }: Params) => {
  if (!identifier || !otp)
    throw new Error("Neither identifier or otp was provided.");
  try {
    const response = await api.post("/api/verify-otp", { identifier, otp });
    console.log(response.data);
    return response.data;
  } catch (err) {
    const errMsg =
      ((err as RejectedError)?.response?.data as RejectedResponse)?.message ||
      "Error sending OTP";
    console.error(errMsg);
  }
};
