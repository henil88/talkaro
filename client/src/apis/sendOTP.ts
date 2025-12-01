import type { AxiosError } from "axios";
import api from "../lib/axios";
import { store } from "../store";
import { setCredentials } from "../features/auth/slice";
import type { Identifier } from "../types/credentials";

type RejectedError = unknown & AxiosError;
type ResponseType = { success: boolean; message: string };

// sends the email or phone number to backend to perform operations and send success results
export const sendOTP = async ({ email, phone }: Identifier) => {
  const identifier = email || phone;
  if (!identifier) throw new Error("Neither email nor phone was provided.");
  try {
    const { data } = await api.post<ResponseType>("/api/send-otp", {
      email,
      phone,
    });
    if (data.success) console.log("SUCCESS_SENDING_CREDENTIALS", data);
    store.dispatch(setCredentials({ email, phone }));
    return data;
  } catch (err) {
    const errMsg =
      ((err as RejectedError)?.response?.data as ResponseType)?.message ||
      "Error sending OTP";
    console.error("ERROR_SENDING_CREDENTIALS", errMsg);
    throw err;
  }
};
