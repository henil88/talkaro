import type { AxiosError } from "axios";
import api from "../lib/axios";

type Identifier =
  | {
      email: string;
      phone?: never;
    }
  | {
      email?: never;
      phone: string;
    };

type RejectedError = unknown & AxiosError;
type ResponseType = { success: boolean; message: string };

// sends the email or phone number to backend to perform operations and send success results
export const sendOTP = async ({ email, phone }: Identifier) => {
  const identifier = email || phone;
  if (!identifier) throw new Error("Neither email nor phone was provided.");
  try {
    const response = await api.post<ResponseType>("/api/send-otp", {
      email,
      phone,
    });
    console.log(response.data.message);
    return response.data;
  } catch (err) {
    const errMsg =
      ((err as RejectedError)?.response?.data as ResponseType)?.message ||
      "Error sending OTP";
    console.error("ERROR_SENDING_CREDENTIALS", errMsg);
    throw err;
  }
};
